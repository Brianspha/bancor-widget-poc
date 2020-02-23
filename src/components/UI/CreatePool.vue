<template>
<v-container>
    <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">Connector Selection</v-stepper-step>
        <v-stepper-content step="1" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">
            <v-card flat>
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    Do you want <a href="#">BNT</a>or <a href="#">USDB</a> as the reserve liquidity of your new token exchange?
                </v-card-text>
            </v-card>
            <v-form ref="form" v-model="validTokenAddress" lazy-validation>
                <v-select :items="tokenPrefixes" v-model="selectedPrefix" filled label="Connector Type"></v-select>
            </v-form>
            <v-btn :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="selectTokenPrefix">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">Create Relay Token (aka SmartToken)</v-stepper-step>
        <v-stepper-content step="2" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">
            <v-card flat>
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    If your token is called AAA, a relay token called AAABNT will be created.
                    Relay tokens are a bridge between your token and the Bancor BNT trade network.<br />
                    The results of creating the token will be as follows <br />
                    Name: AAA Smart Relay Token <br />
                    Symbol: AAABNT <br />
                    Decimals: Your Decimals <br />
                </v-card-text>
            </v-card>
            <v-form ref="form" v-model="validTokenAddress" lazy-validation>
                <v-text-field v-model="tokenAddress" :counter="42" :rules="addressRules" label="Token Address" required></v-text-field>
            </v-form>
            <v-btn :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="validateTokenAddress">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 3" step="3" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">Converter Deployment
        </v-stepper-step>
        <v-stepper-content step="3" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">
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
            <v-btn :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="deployConverter">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 4" step="4" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">Set Conversion Fee</v-stepper-step>
        <v-stepper-content step="4" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">
            <v-card style="color:black;font-weight: bold; white-space: pre-line;" class="mb-12">
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    This step invloves the following <br />
                    - Setting the Conversion Fee to be used
                </v-card-text>
            </v-card>
            <v-form ref="form">
                <v-text-field label="Conversion Fee" min="1000" max="100000" v-model="initialFee" hint="1000= (0.1%)" :rules="conversionFeeRules" type="number"></v-text-field>
            </v-form>
            <v-btn :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="setConversionFee">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 5" step="5" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">Initial Supply</v-stepper-step>
        <v-stepper-content step="5" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">
            <v-card style="color:black;font-weight: bold; white-space: pre-line;" class="mb-12">
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    This step invloves the following <br />
                    - Setting the Initial Suply for the liquidity Pool <br />
                    - Setting the the Initial Price for the token {{selectedPrefix}} <br />
                    - Setting the conversion between {{selectedPrefix}} amount for 1 {{$store.state.deployedRelayTokenData.symbol}} <br />
                    - For example 2000 {{$store.state.deployedRelayTokenData.symbol}} represents 1 {{selectedPrefix}}
                </v-card-text>
            </v-card>
            <v-form ref="form">
                <v-text-field label="Initial Supply" hint="Token initial supply the liquidity pool" v-model="totalTokenIssue" :rules="numberRules" type="number"></v-text-field>
                <v-text-field label="Initial Price" :placeholder="`Enter {{selectedPrefix}} amount for 1 {{$store.state.deployedRelayTokenData.symbol}}`" hint="Amount to convert between the connector token and your token" v-model="initialPrice" :rules="numberRules" type="number"></v-text-field>
            </v-form>
            <v-btn :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="calculateTotalBNT">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 6" step="6" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">Fund Reserve</v-stepper-step>
        <v-stepper-content step="6" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">
            <v-card style="color:black;font-weight: bold; white-space: pre-line;" class="mb-12">
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    This step invloves the following <br />
                    - Transfer the ERC20 connector amount from an existing account to the deployed converter address <br />
                    - This is the same token used in step 1 <br />
                    - The amount to be transfered is that indicated in step 5
                </v-card-text>
            </v-card>
            <v-form ref="form">
                <v-text-field label="Initial Supply" :v-model="totalTokenIssue" :value="totalTokenIssue" type="number" readonly></v-text-field>
                <v-text-field label="Token Address" v-model="deployedConverter._address" :value="deployedConverter._address" readonly></v-text-field>
            </v-form>
            <v-btn :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="transferTotalERC20">Continue</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 7" step="7" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">Fund Reserve</v-stepper-step>
        <v-stepper-content step="7" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">
            <v-card style="color:black;font-weight: bold; white-space: pre-line;" class="mb-12">
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    This step invloves the following <br />
                    - Transfer the BNT connector amount from an existing account to the deployed converter address <br />
                    - This is the amount of tokens required to convert to 1 {{selectedPrefix}} in other words <br />
                    Total Initial Supply * (1 {{$store.state.deployedRelayTokenData.symbol}} in {{selectedPrefix}})
                </v-card-text>
            </v-card>
            <v-form ref="form">
                <v-text-field label="Token Value" :v-model="totalBNT" :value="totalBNT" type="number" readonly></v-text-field>
                <v-text-field label="Token Address" v-model="deployedConverter._address" :vlue="deployedConverter._address" readonly></v-text-field>
            </v-form>
            <v-btn :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="transferTotalBNT">Continue</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 8" step="8" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">Activation</v-stepper-step>
        <v-stepper-content step="8" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">
            <v-card flat>
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    Activation means transferring the token ownership to the converter.
                </v-card-text>
            </v-card>
            <v-btn :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="transferOwnerShip">Activate</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="e6 > 9" step="9" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">Token Registry Registration</v-stepper-step>
        <v-stepper-content step="9" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">
            <v-card flat>
                <v-card-text style="color:black;font-weight: bold; white-space: pre-line;">
                    This Step involves <br />
                    Adding the Token to the token registry
                </v-card-text>
            </v-card>
            <v-btn :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" @click="addToTokenRegistry">Finish</v-btn>
        </v-stepper-content>
    </v-stepper>
    <v-card align="center" justify="center">
        <v-card-text>
            Please select <a href="https://etherscan.io//gasTracker">gas price</a>
        </v-card-text>
        <v-btn-toggle :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" v-model="toggle_exclusive" mandatory>
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
            toggle_exclusive: '',
            tokenPrefixes: ["USDB", "BNT"],
            selectedPrefix: "",
            initialFee: 0,
            erc20Connector: 0,
            totalTokenIssue: 0,
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
                v => v && !isNaN(v) && parseInt(v) > 0 || "Invalid number, number must be greater than 0 and less than equal to 100000"
            ],
            conversionFeeRules: [
                v => !!v || "Conversion Fee is required",
                v => v && !isNaN(v) && parseInt(v) > 0 && parseInt(v) <= 100000 || "Invalid number, number must be greater than 0"
            ],
            userAddress: "",
            erc20Token: {},
            deployedConverter: {},
            converterTransfer: '',
            bntTransfer: '',
            initialPrice: 0,
            totalBNT: 0,
            connectorAddress: ''
        }
    },
    watch: {
        selectedPrefix: function (val) {
            console.log('selection connector type: ', val)
            this.connectorAddress = val === 'USDB' ? this.$store.state.usdbAddress : this.$store.state.bntAddress
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
        selectTokenPrefix() {
            if (this.selectedPrefix === "") {
                this.error("Please select a token Prefix")
            } else {
                this.e6++
            }
        },
        calculateTotalBNT() {
            this.isLoading = true
            this.totalBNT = new bigNumber(this.totalTokenIssue).multipliedBy(this.initialPrice).toFixed()
            this.isLoading = false
            this.e6++
        },
        addToTokenRegistry() {
            this.isLoading = true
            this.$store.state.bancorRegistryToken.methods.addConverter(this.deployedConverter._address).send({
                from: this.$store.state.web3.eth.defaultAccount,
                gas: this.$store.state.currentGas
            }).then((receipt, error) => {
                if (receipt) {
                    this.success('Succesfully created liqudity Pool')
                    this.e6 = 1
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
                var config1 = await Promise.resolve(this.checkIfTokenRegistered([this.tokenAddress, this.connectorAddress], [500000, 500000]))
                var config2 = await Promise.resolve(this.checkIfTokenRegistered([this.connectorAddress, this.tokenAddress], [500000, 500000]))
                var config3 = await Promise.resolve(this.checkIfTokenRegistered([this.tokenAddress, this.connectorAddress], [300000, 300000]))
                var config4 = await Promise.resolve(this.checkIfTokenRegistered([this.connectorAddress, this.tokenAddress], [300000, 300000]))
                if ((config1 || config2 || config3 || config4)) {
                    This.error("This Token is already registered on the bancor network")
                    This.isLoading = false
                } else {
                    if (results.success) {
                        var smartToken = new this.$store.state.web3.eth.Contract(require('../../json/smartToken.json'))
                        var newToken = {
                            "name": results.name + " Smart Relay Token",
                            "symbol": results.symbol + this.selectedPrefix,
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
                                        "symbol": results.symbol,
                                        "decimals": results.decimals,
                                        "name": results.name + "Smart Relay Token",
                                        "token": contract,
                                        "address": contract._address,
                                        "relaySymbol": results.symbol + this.selectedPrefix
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
        },
        checkIfTokenRegistered(tokenAddresses, ratios) {
            this.isLoading = true
            /* console.log('config: ', tokenAddresses, ' ratios: ', ratios)
             console.warn('this.$store.state.bancorRegistryABI: ', this.$store.state.bancorRegistryABI)
             var contract = new this.$store.state.web3.eth.Contract(this.$store.state.bancorRegistryABI, this.$store.state.bancorRegistry.address)
             console.warn('warn: ', contract)*/
            return new Promise((resolve, reject) => {
                this.$store.state.bancorRegistry.methods.getLiquidityPoolByReserveConfig(tokenAddresses, ratios).call({
                    gas: 8000000
                }).then(async (address, error) => {
                    console.warn("address !== '0x0000000000000000000000000000000000000000'", address !== '0x0000000000000000000000000000000000000000')
                    resolve(address !== '0x0000000000000000000000000000000000000000')
                }).catch((error) => {
                    console.error('error: ', error)
                    resolve(false)
                })
            })

        },
        deployConverter: async function () {
            var abi = this.$store.state.converterData
            console.warn('converterABI: ', abi)
            console.warn('this.$store.state.contractRegistryAddress: ', this.$store.state.contractRegistryAddress)
            var contract = new this.$store.state.web3.eth.Contract(abi.abi)
            this.isLoading = true
            console.log([this.$store.state.deployedRelayTokenData.address, this.$store.state.contractRegistryAddress, new bigNumber(this.$store.state.maxFee).toFixed(), this.erc20Token._address, new bigNumber(this.$store.state.converterWeight).toFixed()])
            var address = this.erc20Token._address
            console.warn('address: ', address)
            console.warn('this.$store.state.converterData.byteCode: ', this.$store.state.converterData.byteCode)
            contract.deploy({
                data: this.$store.state.converterData.byteCode,
                arguments: [this.$store.state.deployedRelayTokenData.address, this.$store.state.contractRegistryAddress, new bigNumber(this.$store.state.maxFee).toFixed(), address, this.$store.state.converterWeight]
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
            this.deployedConverter.methods.setConversionFee(this.initialFee).send({
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
        transferTotalERC20: async function () {
            console.warn('this.deployedConverter: ', this.deployedConverter)
            this.isLoading = true
            this.erc20Token.methods.transfer(this.deployedConverter._address, this.totalTokenIssue).send({
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
        transferTotalBNT() {
            this.isLoading = true
            this.erc20Token.methods.transfer(this.deployedConverter._address, this.totalBNT).send({
                gas: this.$store.state.currentGas,
                from: this.$store.state.web3.eth.defaultAccount
            }).then(async (receipt, error) => {
                if (receipt) {
                    this.issueTokens()
                }
                this.isLoading = false
            }).catch((error) => {
                this.isLoading = false
                console.warn('error: ', error)
                this.error('Something went wrong please try again later')
                this.isLoading = false
            })

        },
        issueTokens: async function () {
            this.isLoading = true
            var connectorBalance = new bigNumber(this.totalBNT).multipliedBy(2)
            console.log('connectorBalance: ', connectorBalance.toFixed())
            this.$store.state.deployedRelayTokenData.token.methods.issue(this.$store.state.web3.eth.defaultAccount, connectorBalance.toFixed()).send({
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
            this.isLoading = true
            this.$store.state.deployedRelayTokenData.token.methods.transferOwnership(this.deployedConverter._address).send({
                gas: this.$store.state.currentGas,
                from: this.$store.state.web3.eth.defaultAccount
            }).then(async (results, error) => {
                if (results) {
                    await this.acceptTokenOwnership()
                }
            }).catch((error) => {
                this.isLoading = false
                console.warn('error: ', error)
                this.error('Something went wrong please try again later')
                this.e6 = 1
            })
        },
        acceptTokenOwnership: async function () {
            this.deployedConverter.methods.acceptTokenOwnership().send({
                gas: this.$store.state.currentGas,
                from: this.$store.state.web3.eth.defaultAccount
            }).then((receipt, error) => {
                if (receipt) {
                    console.log('receipt: ', receipt)
                    this.isLoading = false
                    this.e6++
                }
            }).catch((error) => {
                this.isLoading = false
                console.warn('error: ', error)
                this.error('Something went wrong please try again later')
                this.e6 = 1
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
