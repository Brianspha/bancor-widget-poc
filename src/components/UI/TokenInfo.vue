<template>
<v-row justify="center">
    <v-dialog v-model="$store.state.conversionDialog">
        <v-card>
            <v-card-title class="headline">Conversion Steps</v-card-title>
            <v-card-text>
                <v-list>
                    <v-list-item v-for="token in $store.state.tokens" :key="token.tokenName" v-on:click.native="selectToken(token)">
                        <v-list-item-avatar>
                            <v-img :src="token.tokenImage" ripple></v-img>
                        </v-list-item-avatar>
                        <v-card flat ripple>
                            <v-list-item-content ripple>
                                <v-list-item-title v-text="token.tokenName +' '+ (token.tokenCode)"></v-list-item-title>
                            </v-list-item-content>
                        </v-card>
                    </v-list-item>
                </v-list>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="$store.state.conversionDialog= false">
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>

<script>
export default {
    date: () => {
        return {

        }
    },
    methods: {
        selectToken(token) {
            console.warn('selectedToken: ', token)
            //this.selectToken = token
            if (this.$store.state.clickedSend) {
                this.$store.state.sendToken = token.tokenCode
            } else {
                this.$store.state.receiveToken = token.tokenCode
            }
            this.$store.state.conversionDialog = false
        }
    }
}
</script>
