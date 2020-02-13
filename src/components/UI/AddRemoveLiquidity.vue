<template>
<v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-select outlined v-model="selectedActions" :items="actions" :rules="selectRules" label="Action" required></v-select>
        <v-select outlined v-model="selectedToken" :items="$store.state.tokens" item-text="tokenCode" item-value="tokenID" :rules="selectRules" label="Token Name" required></v-select>
        <v-text-field :placeholder="currentPlaceHolder" type="number" outlined></v-text-field>
        <v-text-field v-if="!$store.state.wallectConnected" class="headline" style="font-weight: bold; color:black;" v-modal="warningText" loading="error" :placeholder="warningText" outlined disabled></v-text-field>
        <v-btn :disabled="!valid" :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" class="mr-4" @click="validate">
            Calculate
        </v-btn>
        <v-icon :color="$root.widgetColor? $root.widgetColor:$store.state.defualtColor" @click="showInfo">
            {{$store.state.defaultInfoIcon}}
        </v-icon>
    </v-form>
    <aboutLiquidityModal v-bind:modal="$store.state.infoModal"></aboutLiquidityModal>
    <createLiquidityInfoModal v-bind:modal="$store.state.liquidityInfo"></createLiquidityInfoModal>
</v-container>
</template>

<script>
import aboutLiquidityModal from './LiquidityPoolsInfo'
import createLiquidityInfoModal from './CreateLiquidityInfo.vue'
export default {
    data: () => ({
        actions: ["Add Liquidity", "Remove Liquidity"],
        valid: true,
        selectedToken: '',
        selectedAction: '',
        selectRules: [v => !!v || 'Select Item is required'],
        select: null,
        checkbox: false,
        warningText: "Please connect your wallet",
        selectedActions: "",
        currentPlacceHolder: 'Token Amount'
    }),
    components: {
        aboutLiquidityModal,
        createLiquidityInfoModal
    },
    watch: {
        selectedActions: function (val) {
            if (val === 'Remove Liquidity') {
                this.currentPlacceHolder = 'Amount to Liquidate'
            }
            if (val === 'Add Liquidity' || val === '') {
                this.currentPlacceHolder = 'Token Amount'
            }
        }
    },
    methods: {
        validate() {
            if (this.$refs.form.validate()) {
                this.snackbar = true
            }
        },
        showInfo() {
            this.$store.state.liquidityInfo = true
            console.log('infoModal: ', this.$store.state.liquidityInfo)
        },
    },
}
</script>
