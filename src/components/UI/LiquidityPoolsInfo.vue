<template>
  <div class="text-center">
    <v-dialog
      v-model="$store.state.liquidityInfo "
      width="700"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          About Bancor Luquidity Pools
        </v-card-title>
        <v-card-text style="font-weight: bold; white-space: pre-line;">
          {{ about }}
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            :color="$root.widgetcolor? $root.widgetcolor:$store.state.defualtColor"
            text
            @click="hideModal"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            about: '',
            modal: false
        }
    },
    watch: {

    },
    mounted() {
        this.initInfo()
    },
    methods: {
        initInfo() {
            var info = require('../../json/liquidityAbout.json').about
            console.log(info)
            var number = 1
            info.map((text) => {
                this.about += `${number}. ${text.text} \n\n`
                number++
                console.log('text: ', text)
            })
        },
        hideModal() {
            this.$store.state.liquidityInfo = false
        }
    }
}
</script>
