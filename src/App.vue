<template>
  <!-- App.vue -->
  <v-app>
    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-btn
          absolute
          dark
          fab
          bottom
          right
          :color="$root.buttoncolor?$root.buttoncolor:$store.state.defualtColor"
          @click="showWarning()"
        >
          <v-icon :v-model="$root.buttonicon?$root.buttonicon:$store.state.defualtIcon">
            {{ $root.buttonicon?$root.buttonicon:$store.state.defualtIcon }}
          </v-icon>
        </v-btn>
        <!-- If using vue-router -->
        <v-dialog
          v-model="showMenu"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar
              dark
              :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor"
            >
              <v-btn
                icon
                dark
                @click="showMenu = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              {{ appTitle }}
              <v-spacer />
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="showMenu = false"
                >
                  Close
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <v-tabs
                v-model="selectedTab"
                background-color="white"
                :color="$root.widgetcolor?$root.widgetcolor:$store.state.defualtColor"
                right
              >
                <v-tab>Pools</v-tab>
                <v-tab>Create Liquidity Pool</v-tab>
              </v-tabs>
              <v-tabs-items v-model="selectedTab">
                <v-tab-item>
                  <pools />
                </v-tab-item>
                <v-tab-item>
                  <create />
                </v-tab-item>
              </v-tabs-items>
              <router-view />
            </v-card-text>
            <v-card
              align="center"
              justify="center"
            >
              <v-card-text>
                Please select <a href="https://etherscan.io//gasTracker">gas price</a>
              </v-card-text>
              <v-btn-toggle
                :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor"
                v-model="toggle_exclusive"
                mandatory
              >
                <v-btn @click="setGasPrice(8000000000)">
                  High
                </v-btn>
                <v-btn @click="setGasPrice(4000000000)">
                  Average
                </v-btn>
                <v-btn @click="setGasPrice(2000000000)">
                  Low
                </v-btn>
              </v-btn-toggle>
              <v-card-text>
                For faster completion, increase the gas price in your waller after clicking our action
                buttons, but before confirming transactions in your wallet <a href="https://metamask.zendesk.com/hc/en-us/articles/360015488771-How-to-Adjust-Gas-Price-and-Gas-Limit-">See
                  how</a>
              </v-card-text>
            </v-card>
          </v-card>
        </v-dialog>
      </v-container>
    </v-content>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import swal from 'sweetalert2'
import Pools from "./components/UI/AddRemoveLiquidity";
import Create from "./components/UI/CreatePool";

export default {
    props: ['widgetcolor', 'buttoncolor', 'buttonicon'],
    components: {
        Pools,
        Create
    },
    data() {
        return {
            activeTab: '',
            selectedTab: '',
            appTitle: "Bancor",
            tabs: [{
                    "title": "Pools",
                    "to": "/addremove"
                },
                {
                    "title": "Create Liquidity Pool",
                    "to": "/create"
                }
            ],
            collapseOnScroll: true,
            showMenu: false,
            tokens: [],
            toggle_exclusive: true
        }
    },
    mounted() {
        this.init()
        this.watchForAccountChanges()
    },
    methods: {
        watchForAccountChanges() {
            let tempThis = this
            window.ethereum.on('accountsChanged', function (accounts) {
                location.reload()
            })
            window.ethereum.on('networkChanged', function (netId) {
                location.reload()
            })
            window.ethereum.on('networkChanged', function (netId) {
                location.reload()
            })
        },
        setGasPrice(price) {
            this.$store.state.gasPrice = price;
            console.log('changed Gas Price: ', price)
        },
        init: async function () {
            if (!this.web3) {
                this.errorWithFooter(
                    "<a href='https://metamask.io/;';>Please visit their website for instructions of how to download it</a>",
                    'MetaMask is not installed!'
                )
            } else {
                console.log('$root.buttoncolor: ', this.$root.buttoncolor)
                this.selectedTab = this.$route.name
                console.log('mounted: ', this.activeTab)
                this.$store.state.tokens = require('./json/tokens.json').tokens
                //console.log('tokens: ', this.$store.state.tokens)
            }

        },
        errorWithFooter(footerMessage, text) {
            swal.fire({
                type: 'error',
                title: 'Metamask not detected',
                text: text,
                footer: footerMessage
            })
        },
        getTokenData: async function (address) {
            return new Promise(async (resolve, reject) => {
                var token = new this.$store.state.web3.eth.Contract(this.$store.state.erc20.abi,
                    address)
                var [name, symbol, decimals] = await Promise.all([token.methods.name().call(),
                    token.methods.symbol().call(),
                    token.methods.decimals().call()
                ])
                resolve({
                    "name": name,
                    "symbol": symbol,
                    "decimals": decimals
                })
            })
        },
        getConvertibleTokens: async function () {
            return new Promise((resolve, reject) => {
                this.$store.state.bancorRegistry.methods.getConvertibleTokens().call({
                    from: this.$store.state.web3.eth.defaultAccount,
                    gas: this.$store.state.currentGas
                }).then((tokens, error) => {
                    console.log('tokens: ', tokens)
                    if (tokens) {
                        resolve(tokens)
                    }
                }).catch((error) => {
                    resolve([])
                    console.error('error: ', error)
                })
            })
        },
        showWarning() {
            this.warning(`Attention: Do not referesh page whilst waiting for a transaction to complete.`)
            this.showMenu = !this.showMenu
        },
        warning(message) {
            swal.fire({
                icon: 'warning',
                title: 'Caution',
                text: message
            })
        }
    },
    watch: {
        '$route.name'() {
            console.log('this.$route.name: ', this.$route.name)
            this.selectedTab = this.$route.name
        }
    }
}
</script>
