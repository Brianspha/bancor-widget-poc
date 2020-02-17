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
                    Smart token address from previous step,<br /> Bancor registry contract address,<br /> Max Fee: 30000 (3%),<br /> Weight: 500,000 (50%)
                </v-card-text>
                <v-form ref="form">
                    <v-text-field :v-model="$store.state.deployedRelayTokenData.symbol" :value="$store.state.deployedRelayTokenData.symbol" label="Token Symbol" readonly></v-text-field>
                    <v-text-field :v-model="$store.state.deployedRelayTokenData.registry" :value="$store.state.contractRegistryAddress" label="Bancor Token Registry" readonly></v-text-field>
                    <v-text-field v-model="$store.state.maxFee" :value="$store.state.maxFee" :rules="maxFeeRules" readonly></v-text-field>
                    <v-text-field :v-model="$store.state.deployedRelayTokenData.address" label="Deployed Relay Token" :value="$store.state.deployedRelayTokenData.address" readonly></v-text-field>
                    <v-text-field :v-model="$store.state.converterWeight" :value="$store.state.converterWeight" label="Converter Weight" readonly></v-text-field>
                </v-form>
            </v-card>
            <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="deployConverter">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 3" step="3" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">Set Conversion Fee</v-stepper-step>
        <v-stepper-content step="3" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">
            <v-card style="color:black;font-weight: bold; white-space: pre-line;" class="mb-12">
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    This step invloves the following <br />
                    - Setting the Conversion Fee to be used
                </v-card-text>
            </v-card>
            <v-form ref="form">
                <v-text-field label="Conversion Fee" v-model="initialFee" :rules="numberRules" type="number"></v-text-field>
            </v-form>
            <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="setConversionFee">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 4" step="4" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">Funding & Initial Supply</v-stepper-step>
        <v-stepper-content step="4" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">
            <v-card style="color:black;font-weight: bold; white-space: pre-line;" class="mb-12">
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    This step invloves the following <br />
                    - Setting the Initial Suply for the liquidity Pool <br />
                </v-card-text>
            </v-card>
            <v-form ref="form">
                <v-text-field label="Token Amount" hint="Token initial supply the liquidity pool" v-model="tokenIssueAmount" :rules="numberRules" type="number"></v-text-field>
            </v-form>
            <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="issueTokens">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 5" step="5" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">Activation</v-stepper-step>
        <v-stepper-content step="5" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">
            <v-card flat>
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    Activation means transferring the token ownership to the converter.
                </v-card-text>
            </v-card>
            <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="transferOwnerShip">Activate</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 6" step="6" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">Token Registry Registration</v-stepper-step>
        <v-stepper-content step="6" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">
            <v-card flat>
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    This Step involves <br />
                    Adding the Token to the token registry
                </v-card-text>
            </v-card>
            <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="addToTokenRegistry">Finish</v-btn>
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
import bigNumber from 'bignumber.js'
import utils from 'web3-utils'
export default {
    components: {
        Loading
    },
    data() {
        return {
            initialFee: 0,
            tokenIssueAmount: 0,
            e6: 1,
            tokenReserveAddress: '',
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
    mounted() {
        console.warn('$store.state.defaultAccount: ', this.$store.state.defaultAccount)
    },
    methods: {
        setGasPrice(price) {
            this.$store.state.gasPrice = price;
            console.log('changed Gas Price: ', price)
        },
        error(message) {
            swal.fire('Error', message, 'error')
        },
        success(message) {
            swal.fire('Success', message, 'success')
        },
        addToTokenRegistry() {
            this.isLoading = true
            this.$store.state.bancorTokenRegistry, methods.addConverter(this.deployConverter._address).send({
                from: this.$store.state.web3.eth.defaultAccount,
                gas: this.$store.state.currentGas
            }).then((receipt, error) => {
                if (receipt) {
                    this.success('Succesfully created liqudity Pool')
                }
                this.isLoading = false
            }).catch((error) => {
                this.isLoading = false
                console.warn('error: ', error)
                this.error('Something went wrong whilst adding liqudity pool')
            })
        },
        validateTokenAddress: async function () {
            console.log('web3: ', this.$store.state.web3)
            var valid = utils.isAddress(this.tokenAddress)
            console.warn('default Address: ', this.$store.state.web3.eth.defaultAccount)
            console.warn(' web3.eth: ', this.$store.state.web3.eth)
            this.isLoading = true
            if (!valid) {
                this.error('Invalid Token Address')
                this.isLoading = false
            } else {
                var results = await Promise.resolve(this.deployERC20Token())
                var tokenName = utils.toHex(results.name)
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
                                var smartToken = new this.$store.state.web3.eth.Contract(require('../../json/smartToken.json'))
                                var newToken = {
                                    "name": results.name + " Smart Relay Token",
                                    "symbol": results.symbol + "BNT",
                                    "decimals": results.decimals
                                }
                                console.log('newToken: ', newToken)
                                console.log('smartToken: ', smartToken)
                                console.log('this.$store.state.smartTokenByteCode: ', this.$store.state.smartTokenByteCode)
                                smartToken.deploy({
                                        data: this.$store.state.smartTokenByteCode,
                                        arguments: [newToken.name, newToken.symbol, newToken.decimals]
                                    })
                                    .send({
                                        from: this.$store.state.web3.eth.defaultAccount,
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
            var abi = this.$store.state.converterData
            console.warn('converterABI: ', abi)
            console.warn('this.$store.state.contractRegistryAddress: ', this.$store.state.contractRegistryAddress)
            var contract = new this.$store.state.web3.eth.Contract(abi.abi)
            this.isLoading = true
            console.log([this.$store.state.deployedRelayTokenData.address, this.$store.state.contractRegistryAddress, new bigNumber(this.maxFee).toFixed(), this.erc20Token._address, new bigNumber(this.$store.state.converterWeight).toFixed()])
            var address = this.erc20Token._address
            console.warn('address: ', address)
            console.warn('this.$store.state.converterData.byteCode: ', this.$store.state.converterData.byteCode)
            contract.deploy({
                data: this.$store.state.converterData.byteCode,
                arguments: [this.$store.state.deployedRelayTokenData.address, this.$store.state.contractRegistryAddress, new bigNumber(this.maxFee).toFixed(), address, this.$store.state.converterWeight]
            }).send({
                gas: this.$store.state.currentGas,
                from: web3.eth.defaultAccount
            }).then((receipt, error) => {
                if (receipt) {
                    console.log('deployedConverter: ', receipt)
                    this.deployedConverter = receipt
                    this.e6++
                }
                this.isLoading = false
            }).catch((error) => {
                console.error('error: ', error)
                this.error('Something went wrong whilst deploying coverter contract please set a higher gas price')
                this.isLoading = false
            })
        },
        setConversionFee() {
            this.isLoading = true
            this.deployedConverter.methods.setConversionFee(maxFee).send({
                gas: this.$store.state.currentGas,
                from: this.$store.state.web3.eth.defaultAccount
            }).then((receipt, error) => {
                if (receipt) {
                    this.e6++
                }
                this.isLoading = false
            }).catch((error) => {
                console.error('error: ', error)
                this.isLoading = false
            })
        },
        transferToConverterContract: async function () {
            console.warn('this.deployedConverter: ', this.deployedConverter)
            this.erc20Token.methods.transfer(this.deployedConverter._address, this.converterTransfer).send({
                gas: this.$store.state.currentGas,
                from: this.$store.state.web3.eth.defaultAccount
            }).then((results, error) => {
                if (results) {
                    this.e6++
                }
                this.isLoading = false
            }).catch((error) => {
                this.isLoading = false
                console.warn('error: ', error)
                this.error('Something went wrong please try again later')
            })
        },
        transferTokenReserveToConverter() {
            if (utils.isAddress(this.tokenReserveAddress)) {
                var contract = new this.$store.state.web3.eth.Contract(this.$store.state.erc20.abi, this.tokenReserveAddress)
                contract.methods.transfer(this.deployedConverter._address, this.bntTransfer).send({
                    gas: this.$store.state.currentGas,
                    from: this.$store.state.web3.eth.defaultAccount
                }).then(async (receipt, error) => {
                    if (receipt) {
                        this.e6++
                    }
                    this.isLoading = false
                }).catch((error) => {
                    this.isLoading = false
                    console.warn('error: ', error)
                    this.error('Something went wrong please try again later')
                    this.isLoading = false
                })
            } else {
                this.error('Invalid token reserve address')
            }
        },
        issueTokens: async function () {
            if (this.bntTransfer > this.converterTransfer)
                this.$store.state.deployedRelayTokenData.token.methods.issue(this.$store.state.web3.eth.defaultAccount, this.bntTransfer).send({
                    gas: this.$store.state.currentGas,
                    from: this.$store.state.web3.eth.defaultAccount
                }).then((results, error) => {
                    if (results) {
                        this.isLoading = false
                        this.e6++
                    }
                }).catch((error) => {
                    this.isLoading = false
                    console.warn('error: ', error)
                    this.error('Something went wrong please try again later')
                })
        },
        transferOwnerShip() {
            console.warn('this.deployedConverter: ', this.deployedConverter)
            this.$store.state.deployedRelayTokenData.token.methods.transferOwnership(this.deployedConverter._address).send({
                gas: this.$store.state.currentGas,
                from: this.$store.state.web3.eth.defaultAccount
            }).then((results, error) => {
                if (results) {
                    this.deployedConverter.methods.acceptTokenOwnership().send({
                        gas: this.$store.state.currentGas,
                        from: this.$store.state.web3.eth.defaultAccount
                    }).then((receipt, error) => {
                        if (receipt) {
                            console.log('receipt: ', receipt)
                            this.isLoading = false
                            this.success('Succesfully created liquidity pool')
                            this.$router.go()
                        }
                    })
                }
            }).catch((error) => {
                this.isLoading = false
                console.warn('error: ', error)
                this.error('Something went wrong please try again later')
                this.$router.go()
            })
        },
        deployERC20Token: async function () {
            return new Promise((resolve, reject) => {
                var abi = this.$store.state.erc20.abi
                var token = new this.$store.state.web3.eth.Contract(abi, this.tokenAddress, {
                    from: this.$store.state.web3.eth.defaultAccount,
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
