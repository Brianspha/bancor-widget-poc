<template>
<!-- App.vue -->
<v-app>
    <!-- Sizes your content based upon application components -->
    <v-content>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
            <v-btn absolute dark fab bottom right :color="$root.buttoncolor?$root.buttoncolor:$store.state.defualtColor" @click="showMenu=!showMenu">
                <v-icon :v-model="$root.buttonicon?$root.buttonicon:$store.state.defualtIcon">{{$root.buttonicon?$root.buttonicon:$store.state.defualtIcon}}</v-icon>
            </v-btn>
            <!-- If using vue-router -->
            <v-dialog v-model="showMenu" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor">
                        <v-btn icon dark @click="showMenu = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        {{appTitle}}
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="showMenu = false">Close</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                        <v-tabs v-model="selectedTab" background-color="white" :color="$root.widgetcolor?$root.widgetcolor:$store.state.defualtColor" right>
                            <v-tab v-for="(tab,i) in tabs" :key="i" :to="tab.to">{{tab.title}}</v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="selectedTab">
                            <v-tab-item v-for="(tab_,i) in tabs" :key="i" :value="tab_  .to">
                            </v-tab-item>
                        </v-tabs-items>
                        <router-view></router-view>
                    </v-card-text>
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
export default {
    props: ['widgetcolor', 'buttoncolor', 'buttonicon'],
    data() {
        return {
            activeTab: '',
            selectedTab: '',
            appTitle: "Bancor",
            tabs: [{
                    "title": "Pools",
                    "to": "/addremove"
                }, {
                    "title": "Conversions",
                    "to": "/conversions"
                },
                {
                    "title": "Create Liquidity Pool",
                    "to": "/create"
                }
            ],
            collapseOnScroll: true,
            showMenu: false
        }
    },
    mounted() {
        console.log('$root.buttoncolor: ', this.$root.buttoncolor)
        this.selectedTab = this.$route.name
        console.log('mounted: ', this.activeTab)
        var tokensNames = require('./json/tokens.json').data.page
        tokensNames.map((token) => {
            const [name, ext] = token.primaryCommunityImageName.split(".");
            this.$store.state.tokens.push({
                "tokenName": token.name,
                "tokenCode": token.code,
                "tokenID": token.id,
                "tokenCommunityID": token.primaryCommunityId,
                "tokenImage": `https://storage.googleapis.com/bancor-prod-file-store/images/communities/cache/${name}_200w.${ext}`
            })
        })
        console.log(this.$store.state.tokens)
    },
    methods: {
        showWarning() {
            this.warning(`Attention: this application uses local storage for storing parameters. Please do not delete your browser history before completing all steps. Please do not proceed to the next step until your current transaction is confirmed in your wallet. Please do not speed up transactions after confirming them in your wallet.`)
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
