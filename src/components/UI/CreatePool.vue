<template>
<v-container>
    <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">Create Relay Token (aka SmartToken)</v-stepper-step>
        <v-stepper-content step="1" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">
            <v-card flat>
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    If your token is called AAA, a relay token called AAABNT will be created.
                    Relay tokens are a bridge between your token and the Bancor BNT trade network.<br />
                    The results of creating the token will be as follows <br />
                    Name: AAA Smart Relay Token <br />
                    Symbol: AAABNT <br />
                    Decimals: Your Decimals
                </v-card-text>
            </v-card>
            <v-form ref="form" v-model="validTokenAddress" lazy-validation>
                <v-text-field v-model="tokenAddress" :counter="42" :rules="addressRules" label="Token Address" required></v-text-field>
            </v-form>
            <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="validateTokenAddress">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 2" step="2" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">Converter Deployment
        </v-stepper-step>
        <v-stepper-content step="2" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">
            <v-card class="mb-12">
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    Smart token address from previous step,<br /> Bancor registry contract address,<br /> Max Fee: 50000 (5%),<br /> Weight: 500,000 (50%)
                </v-card-text>
                <v-form ref="form">
                    <v-text-field :v-model="$store.state.deployedRelayTokenData.symbol" :value="$store.state.deployedRelayTokenData.symbol" label="Token Symbol" readonly></v-text-field>
                    <v-text-field :v-model="$store.state.deployedRelayTokenData.registry" :value="$store.state.contractRegistryAddress" label="Bancor Token Registry" readonly></v-text-field>
                    <v-text-field v-model="maxFee" :rules="maxFeeRules" type="number" label="Max Fee" hint="10000 represents 1%"></v-text-field>
                    <v-text-field :v-model="$store.state.deployedRelayTokenData.address" label="Deployed Relay Token" :value="$store.state.deployedRelayTokenData.address" readonly></v-text-field>
                    <v-text-field :v-model="$store.state.converterWeight" :value="$store.state.converterWeight" label="Converter Weight" readonly></v-text-field>
                </v-form>
            </v-card>
            <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="deployConverter">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step step="3" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">Funding & Initial Supply</v-stepper-step>
        <v-stepper-content step="3" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">
            <v-card style="color:black;font-weight: bold; white-space: pre-line;" class="mb-12" height="200px">
                <v-card-text>
                    This step invloves the following <br />
                    Transfer the ERC20 connector amount from an existing account to the deployed converter address (Adding to the reserve)<br />
                    Transfer the BNT connector amount from an existing account to the deployed converter address <br />
                    Verify that the connector balances are set and have similar USD ($) value - doesn’t have to be perfect but should be close enough - a small percentage difference is fine
                </v-card-text>
            </v-card>
            <v-form ref="form">
                <v-text-field label="Token Amount" hint="Amount to transfer to converter address from deployed token i.e. adding to the reserve" v-model="converterTransfer" :rules="numberRules" type="number"></v-text-field>
                <v-text-field label="Token Amount" hint="Amount to transfer to converter address from BNT connector i.e. adding to the reserve" v-model="bntTransfer" :rules="numberRules" type="number"></v-text-field>
                <v-text-field v-model="userAddress" label="Eth Address" :value="$store.state.defaultAccount" hint="Eth address of the token holder to transfer tokens from if different from currently selected in metamask" :v-rules="addressRules"></v-text-field>
            </v-form>
            <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="addReserve">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 4" step="4" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">Activation</v-stepper-step>
        <v-stepper-content step="4" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">
            <v-card flat>
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    Activation means transferring the token ownership to the converter.
                </v-card-text>
            </v-card>
            <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="transferOwnerShip">Activate</v-btn>
        </v-stepper-content>
    </v-stepper>
    <v-card align="center" justify="center">
        <v-card-text>
            Please select <a href="https://etherscan.io//gasTracker">gas price</a>
        </v-card-text>
        <v-btn-toggle :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" v-model="toggle_exclusive" mandatory>
            <v-btn @click="setGasPrice(3)">
                High
            </v-btn>
            <v-btn @click="setGasPrice(2)">
                Average
            </v-btn>
            <v-btn @click="setGasPrice(1)">
                Low
            </v-btn>
        </v-btn-toggle>
        <v-card-text>
            For faster completion, increase the gas price in your waller after clicking our action buttons, but before confirming transactions in your wallet <a href="https://metamask.zendesk.com/hc/en-us/articles/360015488771-How-to-Adjust-Gas-Price-and-Gas-Limit-">See how</a>
        </v-card-text>
    </v-card>
    <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
</v-container>
</template>

<script>
import swal from 'sweetalert2'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    components: {
        Loading
    },
    data() {
        return {
            e6: 1,
            isLoading: false,
            addressRules: [
                v => !v || "Address Required",
                v => v && v.length === 42 || "Invalid address"
            ],
            tokenAddress: '',
            validTokenAddress: false,
            maxFee: 0,
            maxFeeRules: [v => !!v || "Max Fee required",
                v => v && !isNaN(v) && parseInt(v) <= 30000 || "Invalid Max fee number number must be between 0 and 3000"
            ],
            converterTokenAmount: 0,
            numberRules: [
                v => !!v || "Number is required",
                v => v && !isNaN(v) && parseInt(v) > 0 || "Invalid number, number must be greater than 0"
            ],
            userAddress: "",
            erc20Token: {},
            deployedConverter: {},
            converterTransfer: '',
            bntTransfer: ''
        }
    },
    methods: {
        setGasPrice(price) {
            this.$store.state.gasPrice = price;
            console.log('changed Gas Price: ', price)
        },
        fund() {

        },
        activate() {

        },
        error(message) {
            swal.fire('Error', message, 'error')
        },
        success(message) {
            swal.fire('Success', message, 'success')
        },
        validateTokenAddress: async function () {
            var valid = web3.utils.isAddress(this.tokenAddress)
            console.warn('default Address: ', web3.eth.defaultAccount)
            this.isLoading = true
            if (!valid) {
                this.error('Invalid Token Address')
                this.isLoading = false
            } else {
                var results = await Promise.resolve(this.deployERC20Token())
                var tokenName = web3.utils.toHex(results.name)
                let This = this
                this.$store.state.tokenRegistry.methods.addressOf(tokenName).call({
                    gas: 8000000
                }).then(async (address, error) => {
                    if (error) {
                        this.error("Something went wrong please try again")
                        this.isLoading = false
                    } else {
                        if (address !== '0x0000000000000000000000000000000000000000') {
                            This.error("This Token is already registered on the bancor network")
                            This.isLoading = false
                        } else {
                            if (results.success) {
                                var smartToken = new web3.eth.Contract(require('../../json/smartToken.json'))
                                var newToken = {
                                    "name": results.name + " Smart Relay Token",
                                    "symbol": results.symbol + "BNT",
                                    "decimals": results.decimals
                                }
                                console.log('newToken: ', newToken)
                                console.log('smartToken: ', smartToken)
                                smartToken.deploy({
                                        data: this.$store.state.smartTokenByteCode,
                                        arguments: [newToken.name, newToken.symbol, newToken.decimals]
                                    })
                                    .send({
                                        from: web3.eth.defaultAccount,
                                        gas: this.$store.state.currentGas
                                    }).then((contract, error) => {
                                        console.log('error: ', error)
                                        console.log('receipt: ', contract)
                                        if (contract) {
                                            This.$store.state.deployedRelayTokenData = {
                                                "symbol": results.symbol + "BNT",
                                                "decimals": results.decimals,
                                                "name": results.name + "Smart Relay Token",
                                                "token": contract,
                                                "address": contract._address
                                            }
                                            this.e6++
                                        }
                                        This.isLoading = false
                                    }).catch((error) => {
                                        This.isLoading = false
                                        console.error('errror: ', error)
                                    })
                            }
                        }
                    }
                }).catch((error) => {
                    this.isLoading = false
                    console.error("Something went wrong: ", error)
                    this.error('Something went wrong')
                })
            }
        },
        deployConverter: async function () {
            var abi = require('../../json/bancorConverterABI.json')
            var contract = new web3.eth.Contract(abi)
            this.isLoading = true
            console.log([this.$store.state.deployedRelayTokenData.address, this.$store.state.contractRegistryAddress, this.maxFee, this.erc20Token._address, this.$store.state.converterWeight])
            contract.deploy({
                data: this.$store.state.converterData.byteCode,
                arguments: [this.$store.state.deployedRelayTokenData.address, this.$store.state.contractRegistryAddress, this.maxFee, this.erc20Token._address, this.$store.state.converterWeight]
            }).send({
                gas: this.$store.state.currentGas,
                from: web3.eth.defaultAccount
            }).then((receipt, error) => {
                if (receipt) {
                    this.isLoading = false
                    this.success('Deployed converter contract succesfully')
                    console.log('receipt: ', receipt)
                }
                this.addReserve(contract)
            }).catch((error) => {
                console.error('error: ', error)
                this.error('Something went wrong whilst deploying coverter contract please set a higher gas price')
                this.isLoading = false
            })
        },
        addReserve: async function () {
            this.deployedConverter.methods.addReserve(this.tokenAddress, this.$store.state.converterWeight).send({
                gas: this.$state.store.currentGas,
                from: web3.eth.defaultAccount
            }).then(async (receipt, error) => {
                if (receipt) {
                    this.issueTokens()
                }
            }).catch((error) => {
                this.isLoading = false
                consle.warn('error: ', error)
                this.error('Something went wrong please try again later')
                this.isLoading = false
            })
        },
        transferToConverterContract: async function () {
            var results = await this.erc20Token.methods.transfer(this.deployedConverter.address, this.converterTransfer).send({
                gas: this.$store.state.currentGas,
                from: web3.eth.defaultAccount
            }).then((results, error) => {
                if (results) {
                    this.e6++
                }
                this.isLoading = false
            }).catch((error) => {
                this.isLoading = false
                consle.warn('error: ', error)
                this.error('Something went wrong please try again later')
            })
        },
        issueTokens: async function () {
            this.$store.state.deployedRelayTokenData.token.methods.issue(web3.eth.defaultAccount, this.bntTransfer).send({
                gas: this.$store.state.currentGas,
                from: web3.eth.defaultAccount
            }).then((results, error) => {
                if (results) {
                    this.transferToConverterContract()
                }
            }).catch((error) => {
                this.isLoading = false
                consle.warn('error: ', error)
                this.error('Something went wrong please try again later')
            })
        },
        transferOwnerShip() {
            this.erc20Token.methods.transferOwnership(this.deployedConverter.address).send({
                gas: this.$store.state.currentGas,
                from: web3.eth.defaultAccount
            }).then((results, error) => {
                if (results) {
                    this.deployedConverter.methods.acceptTokenOwnership().send({
                        gas: this.$store.state.currentGas,
                        from: web3.eth.defaultAccount
                    }).then((receipt, error) => {
                        if (receipt) {
                            console.log('receipt: ', receipt)
                            this.isLoading = false
                            this.success('Succesfully transfered token ownership')
                            this.$router.go()
                        }
                    }).catch((error) => {
                        console.error('error: ', error)
                        this.error('Something went wrong whilst transfering token ownership')
                        this.isLoading = false
                    })
                }
            }).catch((error) => {
                this.isLoading = false
                consle.warn('error: ', error)
                this.error('Something went wrong please try again later')
                this.$router.go()
            })
        },
        deployERC20Token: async function () {
            return new Promise((resolve, reject) => {
                var abi = require('../../json/erc20ABI.json')
                var token = new web3.eth.Contract(abi, this.tokenAddress, {
                    from: web3.eth.defaultAccount,
                    gas: 8000000
                })
                token.methods.symbol().call({
                    gas: 8000000
                }).then(async (symbol, error) => {
                    if (symbol) {
                        var decimals = await token.methods.decimals().call({
                            gas: 8000000
                        })
                        var name = await token.methods.name().call({
                            gas: 8000000
                        })
                        this.erc20Token = token
                        resolve({
                            "symbol": symbol,
                            "decimals": decimals,
                            "name": name,
                            "success": true
                        })
                    }
                }).catch((error => {
                    console.error('error in getting token symbol: ', error)
                    resolve({
                        "symbol": '',
                        "decimals": -1,
                        "name": "",
                        "success": false
                    })
                }))
            })

        }
    }
}
</script>
