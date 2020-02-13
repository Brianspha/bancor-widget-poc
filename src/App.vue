<template>
<!-- App.vue -->
<v-app>
    <!-- Sizes your content based upon application components -->
    <v-content>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
            <v-btn absolute dark fab bottom right :color="$root.buttonColor?$root.buttonColor:$store.state.defualtColor" @click="showWarning">
                <v-icon :v-model="$root.defualtIcon?$root.buttonIcon:$store.state.defualtIcon">{{$root.buttonColor?$root.buttonIcon:$store.state.defualtIcon}}</v-icon>
            </v-btn>
            <!-- If using vue-router -->
            <v-dialog v-model="showMenu" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-card>
                    <v-toolbar dark :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor">
                        <v-btn icon dark @click="showMenu = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title :v-model="$root.title? $root.title:appTitle" v-ripple>{{ $root.title? $root.title:appTitle }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="showMenu = false">Close</v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                        <v-tabs v-model="selectedTab" background-color="white" :color="$root.tabsColor?$root.tabsColor:$store.state.defualtColor" right>
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
    props: ['title'],
    data() {
        return {
            activeTab: '',
            selectedTab: '',
            appTitle: "Bancor",
            tabs: [{
                    "title": "Pools",
                    "to": "/addremove"
                }, {
                    "title": "Existing Pools",
                    "to": "/existing"
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
            buttonColor: "blue",
            showMenu: false
        }
    },
    mounted() {
        this.selectedTab = this.$route.name
        console.log('mounted: ', this.activeTab)
        var tokensNames = require('./json/tokens.json').data.page
        tokensNames.map((token) => {
            this.$store.state.tokens.push({
                "tokenName": token.name,
                "tokenCode": token.code,
                "tokenID": token.id,
                "tokenCommunityID": token.primaryCommunityId,
                "tokenImageName": token.primaryCommunityImageName
            })
        })
        console.log(this.$store.state.tokens)
    },
    methods: {
        switchTab(tab) {
            console.log('tab: ', tab)
            this.$router.push({
                name: tab
            })
        },
        showWarning() {
            this.warning(`Attention: this application uses local storage for storing parameters. Please do not delete your browser history before completing all steps. Please do not proceed to the next step until your current transaction is confirmed in your wallet. Please do not speed up transactions after confirming them in your wallet.`)
            this.showMenu = !this.showMenu
        },
        warning(message) {
            swal.fire({
                icon: 'warn',
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
