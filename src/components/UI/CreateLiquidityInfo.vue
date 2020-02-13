<template>
<div class="text-center">
    <v-dialog v-model="modal" width="700">
        <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
                Liquidity Pool Creation
            </v-card-title>
            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <v-col>
                            <v-card flat>
                                <v-alert type="info">
                                    Stake BNT: {{$store.state.liquidity.stakedBNT}}, {{$store.state.liquidity.stakedTokenCode}}:{{$store.state.liquidity.stakedToken}}
                                </v-alert>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card flat>
                                <v-alert type="success">
                                    Get {{$store.state.liquidity.noOfTokens}} <a :href="$store.state.liquidity.etherscanContractRelay"> {{$store.state.liquidity.relayContractCode}} </a>, which is the relay token for the <a :href="$store.state.liquidity.relayTokenEtherScan">{{$store.state.liquidity.token}}</a> token
                                </v-alert>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card flat>
                                <v-alert type="success">
                                    Pool earns trade fee {{$store.state.liquidity.fee}} % (<v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-btn icon v-on="on">
                                                <v-icon color="grey lighten-1">mdi-information-variant</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>The pool relay token holders of {{$store.state.liquidity.stakedTokenCode}}/BNT earn the x% converter fee of every trade of {{$store.state.liquidity.stakedTokenCode}}</span>
                                    </v-tooltip>)from converter: <a :href="$store.state.liquidity.converterEtherScan"> {{$store.state.liquidity.converterAddress}}</a>
                                </v-alert>

                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card flat>
                                <v-alert type="success">
                                    Pool liquidity depth: (
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on }">
                                            <v-btn icon v-on="on">
                                                <v-icon color="grey lighten-1">mdi-information-variant</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>ROI per Trade per Liquidity Depth (LD): The higher your share (holding %) of the pool’s relay tokens, the larger your earnings-per-trade of the token. This explains what the ROI per Trade *would be* for the given LD now</span>
                                    </v-tooltip>
                                    )<br />
                                    {{$store.state.liquidity.stakedTokenCode}}: {{$store.state.liquidity.stakedTokenTotalDepthSupply}} <br />
                                    BNT: {{$store.state.liquidity.bntDepthTotalSupply}}
                                </v-alert>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card flat>
                                <v-alert type="info">
                                    Current supply of {{$store.state.liquidity.relayContractCode}} is {{$store.state.liquidity.stakedTokenTotalSupply}} your share is {{$store.state.liquidity.currentShare}} %
                                </v-alert>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card flat>
                                <v-alert type="info">
                                    Your share will be {{$store.state.liquidity.futureShare}} % from new supply {{$store.state.liquidity.stakedTokenTotalSupply}}
                                </v-alert>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card flat>
                                <v-alert type="error">
                                    Get the {{$store.state.liquidity.stakedTokenCode}} you need ({{$store.state.liquidity.requiredStake}})
                                </v-alert>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-card flat>
                                <v-alert type="error">
                                    Get the {{$store.state.liquidity.relayContractCode}} you need ({{$store.state.liquidity.requiredRelayStake}})
                                </v-alert>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col v-if="$store.state.isBlackListed">
                            <v-card flat>
                                <v-alert type="warn">
                                    {{$store.state.liquidity.relayContractCode}} converter needs an upgrade to enable pool
                                </v-alert>
                            </v-card>
                        </v-col>
                        <v-col v-else>
                            <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="fund">FUND</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" text @click="hideModal">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data: () => ({
        modal: false,

        show: false
    }),
    watch: {
        "$store.state.liquidityInfo": function (val) {
            console.log('liquidityInfo show modal: ', val)
            this.modal = val
        }
    },
    methods: {
        hideModal() {
            this.$store.state.liquidityInfo = false
        },
        fund() {

        }
    }
}
</script>
