<template>
  <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-select
        outlined
        v-model="selectedActions"
        :items="actions"
        :item-text="selectedActions"
        :rules="selectRules"
        label="Action"
        return-object
        required
      />
      <v-select
        outlined
        v-model="selectedToken"
        :items="$store.state.tokens"
        item-text="symbol"
        item-value="symbol"
        :rules="selectRules"
        label="Token Name"
        required
      />
      <v-text-field
        :label="currentPlaceHolder"
        :placeholder="currentPlaceHolder"
        v-model="tokenAmount"
        type="number"
        :rules="numberRules"
        outlined
      />
      <v-btn
        :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor"
        @click="validate"
      >
        {{ buttonContent }}
      </v-btn>
      <v-icon
        :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor"
        @click="showInfo"
      >
        {{ $store.state.defaultInfoIcon }}
      </v-icon>
    </v-form>
    <aboutLiquidityModal />
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    />
  </v-container>
</template>

<script>
import swal from 'sweetalert2'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import bigNumber from 'bignumber.js'
import aboutLiquidityModal from './LiquidityPoolsInfo'
import createLiquidityInfoModal from './CreateLiquidityInfo.vue'
export default {

    data() {
        return {
            actions: ["Add Liquidity", "Remove Liquidity"],
            valid: true,
            selectedToken: '',
            selectedAction: '',
            selectRules: [v => !!v || 'Select Item is required'],
            numberRules: [v => !!v || 'Number is required', v => v && !isNaN(v) && v > 0 || 'Invalid number, number must be greater than 0'],
            select: null,
            checkbox: false,
            warningText: "Please connect your wallet",
            selectedActions: "",
            currentPlaceHolder: 'Token Amount',
            buttonContent: 'Calculate',
            token: {},
            isLoading: false,
            tokenAmount: 0
        }
    },
    components: {
        aboutLiquidityModal,
        Loading
    },
    watch: {
        selectedActions: function (val) {
            this.selectedAction = val
            if (val === 'Remove Liquidity') {
                this.currentPlaceHolder = 'Amount to Liquidate'
                this.buttonContent = "Liquidate"
            }
            if (val === 'Add Liquidity' || val === '') {
                this.currentPlaceHolder = 'Token Amount'
                this.buttonContent = "Calculate"
            }
        },
        selectedToken: function (val) {
            this.token = this.$store.state.tokens.filter((token) => {
                return token.symbol === val
            })
            this.token = this.token[0]
            console.log('selected token: ', this.token)
        }
    },
    methods: {
        error(message) {
            swal.fire('Error', message, 'error')
        },
        success(message) {
            swal.fire('Success', message, 'success')
        },
        validate() {
            if (this.$refs.form.validate()) {
                this.snackbar = true
                this.takeAction()
            }
        },
        takeAction() {
            if (this.selectedAction === "Add Liquidity") {
                this.addLiquidity()
            } else {
                this.removeLiquidity()
            }
        },
        showInfo() {
            this.$store.state.liquidityInfo = true

        },
        removeLiquidity: async function () {
            console.warn(`this.isLoading: ${this.isLoading}`)
            this.isLoading = true
            var balance = await Promise.resolve(this.getUserBalance())
            console.log(`userBalance: ${balance}`)
            balance = new bigNumber(balance)
            var amount = this.toWei(this.tokenAmount, this.token.decimals)
            amount = new bigNumber(amount)
            if (balance.isLessThanOrEqualTo(0) || amount.isGreaterThanOrEqualTo(balance)) {
                this.error(`Seems like you have an insuficient balance of: ${this.token.symbol}`)
                this.isLoading = false
                this.tokenAmount = 0
            } else {
                this.$store.state.removeLiquidity.balance = balance
                var contract = new this.$store.state.web3.eth.Contract(this.$store.state.converterData.abi, this.token.converterAddress)
                console.log(`amount: ${amount}`)
                contract.methods.liquidate(amount).send({
                    gas: this.$store.state.currentGas,
                    gasPrice: this.$store.state.gasPrice,
                    from: this.$store.state.web3.eth.defaultAccount
                }).then((receipt, error) => {
                    console.log('receipt: ', receipt)
                    if (receipt) {
                        this.success("Succesfully liquidated pool")
                        this.tokenAmount = 0
                    }
                    this.isLoading = false
                }).catch((error) => {
                    this.error("Something went wrong, either you are not the owner or ran out of gas")
                    this.isLoading = false
                    console.error('error: ', error)
                    this.tokenAmount = 0
                })
            }
        },
        toWei(amount, decimals) {
            var newAmount = new bigNumber(amount, decimals)
            console.log('newAmount: ', newAmount)
            newAmount = newAmount.multipliedBy(new bigNumber(10).pow(decimals)).toFixed()
            console.log('newAmount after toFixed: ', newAmount)
            return newAmount
        },
        addLiquidity: async function () {
            var balance = await Promise.resolve(this.getUserBalance())
            balance = new bigNumber(balance)
            this.tokenAmount = new bigNumber(this.tokenAmount).multipliedBy(new bigNumber(10).pow(new bigNumber(this.token.decimals))).toFixed()
            if (balance.isGreaterThanOrEqualTo(this.tokenAmount)) {
                var contract = this.getReserveTokenContract()
                console.log('this,tokenAmount: ', this.tokenAmount)
                contract.methods.approve(this.token.converterAddress, this.tokenAmount).send({
                    gas: this.$store.state.currentGas,
                    from: this.$store.state.web3.eth.defaultAccount
                }).then(async (receipt, error) => {
                    if (receipt) {
                        this.fund()
                    }
                }).catch((error) => {
                    this.error('Something went wrong whilst approving liquidity pool fund transfer')
                    console.error('Something went wrong whilst approving liquidity pool fund transfer')
                    this.isLoading = false
                    this.tokenAmount = 0
                })
            } else {
                this.error(`Seems like you have insufficient: ${this.token.symbol}`)
            }
        },
        fund: async function () {
            var contract = this.getConverterContract()
            contract.methods.fund(this.tokenAmount).send({
                gas: this.$store.state.currentGas,
                from: this.$store.state.web3.eth.defaultAccount
            }).then(async (receipt, error) => {
                if (receipt) {
                    this.success(`Succesfully funded liqudity pool `)
                }
                this.isLoading = false
            }).catch((error) => {
                this.error('Something went wrong whilst funding liquidity pool')
                console.error('Something went wrong whilst funding liquidity pool')
                this.isLoading = false
                this.tokenAmount = 0
            })
        },
        getReserveTokenContract() {
            return new this.$store.state.web3.eth.Contract(this.$store.state.smartTokenABI, this.token.tokenAddress)
        },
        getConverterContract() {
            return new this.$store.state.web3.eth.Contract(this.$store.state.converterData.abi, this.token.converterAddress)
        },
        calculateUserPercent: async function (currentshare, smartTokenSupply) {
            var percent = smartTokenSupply.dividedBy(100)
            var userShare = percent.dividedBy(currentshare)
            var totalUserpercent = new bigNumber(1).dividedBy(userShare)
            return userPercent.tofixed()
        },
        getUserBalance: async function () {
            return new Promise(async (resolve, reject) => {
                const smartToken = this.getReserveTokenContract()
                let userBalance = await smartToken.methods.balanceOf(this.$store.state.web3.eth.defaultAccount).call()
                // userBalance = this.$store.state.web3.utils.hexToNumber(userBalance._hex)
                resolve(new bigNumber(userBalance).toFixed())
            })

        }
    }
}
</script>
