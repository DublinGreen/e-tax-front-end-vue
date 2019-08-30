<template>
<section>
  <v-sheet class="px-4 py-5 my-shadow-2" style="opacity: 0.9">
    <v-layout row wrap>
      
      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Email</div>
        <v-text-field v-model="searchModel.params.email" type="email" outline>
          <div class="" slot="label">Email</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">ANSSID</div>
        <v-text-field v-model="searchModel.params.anssid" outline>
          <div class="" slot="label">ANSSID</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Phone Number</div>
        <v-text-field v-model="searchModel.params.phone" type="tel" outline>
          <div class="" slot="label">Phone Number</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4 mx-auto>
        <v-btn small flat block round @click="searchTaxpayers" :loading="searching" :disabled="searching" class="secondary caption mt-4">Search</v-btn>
      </v-flex>
    </v-layout>

    <section class="mt-5">
      <v-data-table hide-actions :headers="headers" :items="taxpayers">
        <template v-slot:items="props">
          <td>{{ props.item.anssid }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.phone }}</td>
          <td>{{ props.item.state }}</td>
          <td>{{ props.item.lga }}</td>
          <!-- <td class="text-xs-center">
            <v-icon small class="primary--text">mdi-pencil-outline</v-icon>
            <v-icon small class="red--text">mdi-trash-can-outline</v-icon>
          </td> -->
        </template>
      </v-data-table>

      <v-flex xs12 sm7 md7 mt-5 mx-auto text-xs-center>
        <v-item-group class="v-btn-group" v-show="!loading">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat class="secondary " @click="getTaxpayers(pages.first)" v-on="on"><v-icon right>fast_rewind</v-icon></v-btn>
            </template>
            <span>Firstpage</span>
          </v-tooltip>
          <v-btn flat class="secondary" @click="getTaxpayers(pages.previousPage)" :disabled="pages.previousPage == null"><v-icon right>mdi-arrow-left-bold</v-icon> Previous Page
          </v-btn>
          <v-btn flat class="secondary" @click="getTaxpayers(pages.nextPage)" :disabled="pages.nextPage == null">Next Page <v-icon right>mdi-arrow-right-bold</v-icon>
          </v-btn>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat class="secondary " @click="getTaxpayers(pages.last)" v-on="on"><v-icon right>fast_forward</v-icon></v-btn>
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

    </section>
  </v-sheet>
</section>
</template>

<script>
export default {
  props: ['offices'],
  data() {
    return {
      searching: false,
      loading: false,
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      startDate: '',
      endDate: '',
      dateMenu: false,
      dateMenu2: false,
      headers: [{
          text: 'ANSSID',
          value: 'anssid',
          sortable: false,
        },
        {
          text: 'Name',
          value: 'name',
          sortable: false,
        },
        {
          text: 'Email',
          value: 'email',
          sortable: false,
        },
        {
          text: 'Phone Number',
          value: 'phone',
          sortable: false,
        },
        {
          text: 'State',
          value: 'state',
          sortable: false,
        },
        {
          text: 'LGA',
          value: 'lga',
          sortable: false,
        },
        // {
        //   text: "Actions",
        //   sortable: false,
        //   align: 'center'
        // }
      ],
      taxpayers: [],
      paramsModel: {},
      searchModel: {
        params: {
          tax_payer_type: 'corporate',
          email: null,
          anssid: null,
          phone: null,
        }
      },
      pages: {
        first: '',
        last: '',
        previousPage: '',
        nextPage: ''
      },
    }
  },

  computed: {
    computedstartDate() {
      return this.formatDate(this.date)
    }
  },

  created() {
    this.getTaxpayers();
  },

  watch: {
    date(val) {
      this.startDate = this.formatDate(this.date)
    },
    date2(val) {
      this.endDate = this.formatDate(this.date2)
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    searchTaxpayers(pageUrl = null) {
        this.searching = true;

        for (const property in this.searchModel.params) {
          if (this.searchModel.params.hasOwnProperty(property)) {
            if (this.searchModel.params[property] != null ) {
              this.paramsModel[property] = this.searchModel.params[property]
            }
          }
        }

        // this.paramsModel.revenue_name = this.searchModel.params.revenue_name;
        // this.paramsModel.revenue_system = this.searchModel.params.revenue_system;

        this.$axios.$get('/TaxPayers/search', {params: this.paramsModel}).then(res => {
          this.taxpayers = res.data;
          this.searching = false;
          this.pages.previousPage = res.links.prev;
          this.pages.nextPage = res.links.next;
          this.pages.first = res.links.first;
          this.pages.last = res.links.last;
        }, error => {
            this.errors = error.response.data.error;
            this.searching = false;
        });
    },
    getTaxpayers(pageUrl = null) {
        this.loading = true;
        let url = "/TaxPayers/corporate";
        if (pageUrl != null) {
          url = pageUrl;
        }
        this.$axios.$get(url, {params: this.paramsModel}).then(res => {
          this.taxpayers = res.data;
          this.loading = false;
          this.pages.previousPage = res.links.prev;
          this.pages.nextPage = res.links.next;
          this.pages.first = res.links.first;
          this.pages.last = res.links.last;
        }, error => {
            this.errors = error.response.data.error;
            this.loading = false;
        });
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
