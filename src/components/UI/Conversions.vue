<template>
<v-container>
    <v-card class="mx-auto" max-width="600" flat>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-row no-gutters>
                    <v-col>
                        <v-text-field label="Send" v-model="send" :loading="loading" :value="send" type="number" required></v-text-field>
                    </v-col>
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-icon large ripple @click="$store.state.clickedSend=true;$store.state.conversionDialog=true;" v-on="on">arrow_drop_down</v-icon>
                        </template>
                        <span>Select Token</span>
                    </v-tooltip>
                </v-row>
                <v-card-text align="center" justify="center">
                    <v-row align="center" justify="center" style="padding:0; margin:0;">
                        <v-col class="display-1 text--primary"><span>{{$store.state.sendToken}}</span></v-col>
                    </v-row>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn fab large @click="swap" :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" v-on="on">
                                <v-icon>swap_vert</v-icon>
                            </v-btn>
                        </template>
                        <span>Swap Conversions</span>
                    </v-tooltip>
                    <v-row align="center" justify="center" style="padding:0; margin:0;">
                        <v-col class="display-1 text--primary"><span>{{$store.state.receiveToken}}</span></v-col>
                    </v-row>
                </v-card-text>
                <v-row no-gutters>
                    <v-col>
                        <v-text-field label="Receive" v-model="receive" :loading="loading" type="number" :value="receive" required></v-text-field>
                    </v-col>
                    <v-tooltip top>
                        <template v-slot:activator="{ on }">
                            <v-icon large ripple @click="$store.state.clickedSend=false;$store.state.conversionDialog=true;" v-on="on">arrow_drop_down</v-icon>
                        </template>
                        <span>Select Token</span>
                    </v-tooltip>
                </v-row>
                <v-card flat>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-card class="mx-auto" flat>
                                    <v-card-text>
                                        <p class="display-2 text--primary">
                                            Summary
                                        </p>
                                        <v-row>
                                            <v-col>
                                                <div class="display-1 text--primary">
                                                    Amount
                                                </div>
                                            </v-col>
                                            <v-col>
                                                <div class="display-1 text--primary">
                                                    {{ convertedAmount}} {{$store.state.sendToken}}
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <div class="display-1 text--primary">
                                                    Fee
                                                </div>
                                            </v-col>
                                            <v-col>
                                                <div class="display-1 text--primary">
                                                    {{conversionFee}} {{$store.state.receiveToken}}
                                                </div>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <div class="display-1 text--primary">
                                                    Total Cost
                                                </div>
                                            </v-col>
                                            <v-col>
                                                <div class="display-1 text--primary">
                                                    {{totalConversionCost}} {{$store.state.sendToken}}
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-row>
                    <v-col>
                        <v-btn :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor" block @click="convert">Convert</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-card>
    <tokenInfo></tokenInfo>
</v-container>
</template>

<script>
import request from 'request'
import tokenInfo from './TokenInfo'
import bancor from 'bancor-sdk'
export default {
    components: {
        tokenInfo
    },
    data: () => {
        return {
            send: 0,
            receive: 0,
            loading: false,
            totalConversionCost: 0,
            conversionFee: 0,
            convertedAmount: 0,
            valid: true,
        }
    },
    methods: {
        swap() {

        },
        convert() {

        },
        getTokenImage() {

        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style><style>
.v-label {
    font-size: 15px;
}
</style>
