<template>
<v-flex xs12 sm6 md4 mt-5 mx-auto text-xs-center>
  <v-item-group class="v-btn-group">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn flat class="secondary " @click="getPage(pages.last)" v-on="on"><v-icon right>fast_rewind</v-icon></v-btn>
      </template>
      <span>Firstpage</span>
    </v-tooltip>
    <v-btn flat class="secondary" @click="getPage(pages.previousPage)" :disabled="pages.previousPage == null"><v-icon right>mdi-arrow-left-bold</v-icon> Previous Page
    </v-btn>
    <v-btn flat class="secondary" @click="getPage(pages.nextPage)" :disabled="pages.nextPage == null">Next Page <v-icon right>mdi-arrow-right-bold</v-icon>
    </v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn flat class="secondary " @click="getPage(pages.last)" v-on="on"><v-icon right>fast_forward</v-icon></v-btn>
      </template>
      <span>Lastpage</span>
    </v-tooltip>
  </v-item-group>
    <v-progress-circular
    indeterminate
    color="blue"
    v-show="loading"
    ></v-progress-circular>
</v-flex>
</template>

<script>
export default {
  props: ['loading','url','pages'],
  data() {
    return {
      paramsModel: {},
    }
  },
  methods: {
    getPage(pageUrl = null) {
      this.loading = true;
        let url = url;
        if (pageUrl != null) {
          url = pageUrl;
        }
        this.$axios.$get(url, {params: this.paramsModel}).then(res => {
          this.receipts = res.data;
          this.pages.previousPage = res.links.prev;
          this.pages.nextPage = res.links.next;
          this.pages.first = res.links.first;
          this.pages.last = res.links.last;
          this.loading = false;
        }, error => {
            this.errors = error.response.data.error;
            this.loading = false;
        });
    }
  }
  ,
}
</script>
