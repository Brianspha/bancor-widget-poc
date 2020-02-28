<template>
<v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-select outlined v-model="selectedActions" :items="actions" :item-text="selectedActions" :rules="selectRules" label="Action" return-object required></v-select>
        <v-select outlined v-model="selectedToken" :items="$store.state.tokens" item-text="symbol" item-value="symbol" :rules="selectRules" label="Token Name" required></v-select>
        <v-text-field :label="currentPlaceHolder" :placeholder="currentPlaceHolder" v-model="tokenAmount" type="number" outlined></v-text-field>
        <v-text-field v-if="!$store.state.wallectConnected" class="headline" style="font-weight: bold; color:black;" v-modal="warningText" loading="error" :placeholder="warningText" outlined disabled></v-text-field>
        <v-btn :disabled="!valid" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="validate">
            {{buttonContent}}
        </v-btn>
        <v-icon :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="showInfo">
            {{$store.state.defaultInfoIcon}}
        </v-icon>
    </v-form>
    <aboutLiquidityModal v-bind:modal="$store.state.infoModal"></aboutLiquidityModal>
    <createLiquidityInfoModal v-bind:modal="$store.state.liquidityInfo"></createLiquidityInfoModal>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
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
        createLiquidityInfoModal,
        Loading
    },
    watch: {
        selectedActions: function (val) {
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
            var amount = this.toWei(this.tokenAmount, this.token.tokenDecimals)
            if (balance <= 0 || amount <= balance) {
                this.error(`Seems like you have an insuficient balance of: ${this.token.symbol}`)
                this.isLoading = false
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
                    }
                    this.isLoading = false
                }).catch((error) => {
                    this.error("Something went wrong, either you are not the owner or ran out of gas")
                    this.isLoading = false
                    console.error('error: ', error)
                })
                this.isLoading = false
            }
        },
        toWei(amount, decimals) {
            amount = new bigNumber(amount, decimals)
            amount = amount.multipliedBy(new bigNumber(10).pow(decimals))
            return amount.tofixed()
        },
        addLiquidity() {

        },
        calculateUserPercent: async function (share, smartTokenSupply) {
            var percent = smartTokenSupply.dividedBy(100)
            var userShare = percent.dividedBy(share)
            var totalUserpercent = new bigNumber(1).dividedBy(userShare)
            return userPercent.tofixed()
        },
        getBntConnector: async function () {
            const converterAddress = this.getTokenBySymbol('BNT')
            var converter = new this.$store.state.web3.eth.Contract(this.$store.state.converterData.abi, converterAddress)
            const connectorAddress = await converter.methods.connectorTokens(0).call()
            const contract = new this.$store.state.web3.eth.Contract(this.$store.state.smartTokenABI, connectorAddress)
            const symbol = await contract.methods.symbol().call()
            return symbol;
        },
        getTokenBySymbol(symbol) {
            var tokens = this.$store.state.tokens.filter((token) => {
                return token.symbol === symbol
            })
            return tokens[0]
        },
        getUserBalance: async function () {
            return new Promise(async (resolve, reject) => {
                const smartToken = new this.$store.state.web3.eth.Contract(this.$store.state.smartTokenABI, this.token.smartTokenAddress)
                let userBalance = await smartToken.methods.balanceOf(this.$store.state.web3.eth.defaultAccount).call()
                userBalance = this.$store.state.web3.utils.hexToNumber(userBalance._hex)
                resolve(userBalance)
            })

        }
    }
}
</script>
