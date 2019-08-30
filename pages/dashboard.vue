<template>
<v-container class="dashboard-wrapper" grid-list-xl>
<template v-if="(userPermissions.includes('VIEW_DASHBOARD'))">
  <template>
    <v-layout row wrap>
      <v-flex xs12 sm6 lg3>

        <v-sheet height="115" dark class="py-3 cardbg-2 orange curved-cards">
          <div class="caption mx-3">
            <v-icon small class="mr-1">call_received</v-icon>Revenue Generated <v-chip style="height: 18px;">MTD</v-chip>
          </div>
          <v-divider class="mt-2 mb-4"></v-divider>
          <div class="headline mx-3 naira" v-if="!loading1">{{ count_card.igr_mtd | formatNumber }}</div>
          <div class="text-xs-center"><v-progress-circular indeterminate color="#fff" size="25" v-if="loading1"></v-progress-circular></div>
        </v-sheet>
      </v-flex>

      <v-flex xs12 sm6 lg3>
        <v-sheet height="115" dark class="py-3 cardbg-3 green lighten-1 curved-cards">
          <div class="caption mx-3">
            <v-icon small class="mr-1">mdi-finance</v-icon>Revenue Generated <v-chip style="height: 18px;">YTD</v-chip>
          </div>
          <v-divider class="mt-2 mb-4"></v-divider>
          <div class="headline mx-3 naira" v-if="!loading1">{{ count_card.igr_ytd | formatNumber }}</div>
          <div class="text-xs-center"><v-progress-circular indeterminate color="#fff" size="25" v-if="loading1"></v-progress-circular></div>
        </v-sheet>
      </v-flex>

      <v-flex xs12 sm6 lg3>
        <v-sheet height="115" dark class="py-3 primary cardbg-1 curved-cards">
          <div class="caption mx-3">
            <v-icon small class="mr-1">call_made</v-icon>Total Expenses <v-chip style="height: 18px;">YTD</v-chip>
          </div>
          <v-divider class="mt-2 mb-4"></v-divider>
          <div class="headline mx-3 naira" v-if="!loading1">{{ count_card.expenses_ytd | formatNumber }}</div>
          <div class="text-xs-center"><v-progress-circular indeterminate color="#fff" size="25" v-if="loading1"></v-progress-circular></div>
        </v-sheet>
      </v-flex>

      <v-flex xs12 sm6 lg3>
        <v-sheet height="115" dark class="pt-3 cardbg-4 secondary curved-cards">
          <div class="caption mx-3">
            <v-icon small class="mr-1">mdi-chart-timeline</v-icon>New ANSSID Registrations
          </div>
          <v-divider class="mt-2"></v-divider>
          <v-layout row wrap>
            <v-flex class="headline pt-4 pl-4 text-xs-center" md6>
              <span v-if="!loading1">{{ count_card.total_reg_today }}</span>
              <div class="text-xs-center"><v-progress-circular indeterminate color="#fff" size="25" v-if="loading1"></v-progress-circular></div>
              </v-flex>
            <v-flex md1>
              <v-divider class="ma-0" vertical></v-divider>
            </v-flex>
            <v-flex class="pt-4" md4>Today</v-flex>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>

    <v-layout row wrap style="margin-top:-10px;">

      <v-flex v-if="(userPermissions.includes('VIEW_RECEIPT'))" xs6 md3>
        <nuxt-link to="/receipt-log">
          <v-btn block class="secondary caption">View Receipts <v-icon right>mdi-receipt</v-icon>
          </v-btn>
        </nuxt-link>
      </v-flex>

      <v-flex v-if="(userPermissions.includes('VIEW_TAX_PAYER'))" xs6 md3>
        <nuxt-link to="/taxpayers">
          <v-btn block class="secondary caption">Search Taxpayers<v-icon right>search</v-icon>
          </v-btn>
        </nuxt-link>
      </v-flex>

      <v-flex v-if="(userPermissions.includes('VIEW_BILL'))" xs6 md3>
        <nuxt-link to="/bills/view-bills">
          <v-btn block class="secondary caption">Search Bills<v-icon right>search</v-icon>
          </v-btn>
        </nuxt-link>
      </v-flex>

      <v-flex v-if="(userPermissions.includes('VIEW_COLLECTION'))" xs6 md3>
        <nuxt-link to="/collection">
          <v-btn block class="secondary caption">View Collections<v-icon right>mdi-rhombus-split</v-icon>
          </v-btn>
        </nuxt-link>
      </v-flex>
    </v-layout>

    <section class="mt-3">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <!-- <div class="headline pre-card-title mb-3 text--primary grey--text" style="color: #212121">IGR Collection Analytics</div> -->
          <v-card text-xs-left style="color: #555555; height: 445px;">
            <v-card-title primary-title style="border-bottom: 1px solid #dbdbdb; padding-top:20px;">
              <div class="headline pre-card-title">IGR Collection Analytics</div>
            </v-card-title>
            <v-card-media>
              <v-layout row wrap>
                <v-flex style="margin: 0 !important; padding:5px;" :class="'md12'">
                    <v-sheet class="pa-3 curved-cards" style="color:#888888;">
                        <h4 class="igr-year">Current Year IGR</h4>
                        <h3 class="igr-year-revenue font-weight-medium" v-if="!loading3" :class="'display-3'">
                        <v-icon :class="'display-3'" class="currency">mdi-currency-ngn</v-icon>
                        {{ igr_collections.current.total | formatNumber }}
                        </h3>
                        <div class="text-xs-center"><v-progress-circular indeterminate color="#dbdbdb" size="25" v-if="loading3"></v-progress-circular></div>
                    </v-sheet>
                </v-flex>
                <v-flex style="margin: 0 !important; padding:5px;" :class="'md6'">
                    <v-sheet class="pa-3 curved-cards" style="color:#888888;">
                        <h4 class="igr-year text-primary">Current Month IGR Collection</h4>
                        <h6 class="igr-year-revenue font-weight-medium" v-if="!loading3" :class="'display-2'">
                        <v-icon :class="'display-2'" class="currency">mdi-currency-ngn</v-icon>
                        {{ igr_collections.current_month | formatNumber }} <i style="color:#d62c2c; font-size: 26px;" class="fa fa-star"></i>
                        </h6>
                        <div class="text-xs-center"><v-progress-circular indeterminate color="#dbdbdb" size="25" v-if="loading3"></v-progress-circular></div>
                    </v-sheet>
                </v-flex>
                <v-flex style="margin: 0 !important; padding:5px;" :class="'md6'">
                    <v-sheet class="pa-3 curved-cards" style="color:#888888;">
                        <h4 class="igr-year text-primary" style="">Previous Month IGR Collection</h4>
                        <h6 class="igr-year-revenue font-weight-medium" v-if="!loading3" :class="'display-2'">
                        <v-icon :class="'display-2'" class="currency">mdi-currency-ngn</v-icon>
                        {{ igr_collections.previous_month | formatNumber }} <i style="color:#f9a300; font-size: 26px;" class="fa fa-caret-up"></i>
                        </h6>
                        <div class="text-xs-center"><v-progress-circular indeterminate color="#dbdbdb" size="25" v-if="loading3"></v-progress-circular></div>
                    </v-sheet>
                </v-flex>
                <v-flex style="margin: 0 !important; padding:5px;" :class="'md6'">
                    <v-sheet class="pa-3 curved-cards" style="color:#888888;">
                        <h4 class="igr-year text-primary">{{ igr_collections.current_1.year }} IGR Collection</h4>
                        <h6 class="igr-year-revenue font-weight-medium" v-if="!loading3" :class="'display-2'">
                        <v-icon :class="'display-2'" class="currency">mdi-currency-ngn</v-icon>
                        {{ igr_collections.current_1.total | formatNumber }} <i style="color:#d62c2c; font-size: 26px;" class="fa fa-star"></i>
                        </h6>
                        <div class="text-xs-center"><v-progress-circular indeterminate color="#dbdbdb" size="25" v-if="loading3"></v-progress-circular></div>
                    </v-sheet>
                </v-flex>
                <v-flex style="margin: 0 !important; padding:5px;" :class="'md6'">
                    <v-sheet class="pa-3 curved-cards" style="color:#888888;">
                        <h4 class="igr-year text-primary">{{ igr_collections.current_2.year }} IGR Collection</h4>
                        <h6 class="igr-year-revenue font-weight-medium" v-if="!loading3" :class="'display-2'">
                        <v-icon :class="'display-2'" class="currency">mdi-currency-ngn</v-icon>
                        {{ igr_collections.current_2.total | formatNumber }} <i style="color:#d62c2c; font-size: 26px;" class="fa fa-star"></i>
                        </h6>
                        <div class="text-xs-center"><v-progress-circular indeterminate color="#dbdbdb" size="25" v-if="loading3"></v-progress-circular></div>
                    </v-sheet>
                </v-flex>
                <v-flex style="margin: 0 !important; padding:5px;" :class="'md6'">
                    <v-sheet class="pa-3 curved-cards curved-cards-custom" style="color:#888888;">
                        <h4 class="igr-year text-black">Tax Registration Figure</h4>
                        <h6 class="igr-year-revenue font-weight-medium" v-if="!loading7" :class="'display-2'">
                        {{ tax_payer.individual | formatNumber_NoDecimal}}
                        <i style="color:#f9a300; font-size: 26px;" class="fa fa-caret-up"></i>
                        </h6>
                        <div class="text-xs-center"><v-progress-circular indeterminate color="#dbdbdb" size="25" v-if="loading7"></v-progress-circular></div>
                        <h5 class="text-primary">Individual tax Payers</h5>
                    </v-sheet>
                </v-flex>
                <v-flex style="margin: 0 !important; padding:5px;" :class="'md6'">
                    <v-sheet class="pa-3 curved-cards curved-cards-custom" style="color:#888888;">
                        <h4 class="igr-year text-primary">&nbsp;</h4>
                        <h6 class="igr-year-revenue font-weight-medium" v-if="!loading7" :class="'display-2'">
                        {{ tax_payer.corporate | formatNumber_NoDecimal}}
                        <i style="color:#f9a300; font-size: 26px;" class="fa fa-caret-up"></i>
                        </h6>
                        <div class="text-xs-center"><v-progress-circular indeterminate color="#dbdbdb" size="25" v-if="loading7"></v-progress-circular></div>
                        <h5 class="text-primary">Organisation tax Payers</h5>
                    </v-sheet>
                </v-flex>
              </v-layout>
            </v-card-media>
          </v-card>
        </v-flex>

        <v-flex xs12 md6>
          <v-card text-xs-left>
            <v-card-title primary-title style="border-bottom: 1px solid #dbdbdb; padding-top:20px;">
              <div class="headline pre-card-title">Current month revenue heads collection</div>
            </v-card-title>


            <v-card-text style="padding-top:0; height: 376px; overflow-y: scroll;">
              <table v-if="!loading6" class="progress" border="0" style="text-transform: capitalize;">
                

                <tr v-for="(item ,i) in heads_collection" :key="i">
                  
                  <th><img :src="item.icon" style="width:35px; height:35px"/></th>
                  <th>
                    <h6 class="body-2 text-dark">{{ item.name }}</h6>
                  </th>
                  <td>
                    <p class="pull-right">{{ item.amount | formatNumber }}</p>
                    <customProgressBar :height="'10px'" :width="computePercent(item.amount)" />
                  </td>
                </tr>

              </table>
              <div class="text-xs-center mt-5"><v-progress-circular indeterminate color="#dbdbdb" size="25" v-if="loading6"></v-progress-circular></div>

            </v-card-text>

          <!-- <pie-chart :data="piechartData" :options="piechartoptions" style="width: 330px; margin: 0 auto;"></pie-chart> -->
          </v-card>
        </v-flex>
      </v-layout>
    </section>

    <section class="mt-3">
      <v-layout row wrap>
        <v-flex  xs12 md12>
              <v-card text-xs-left>
                <v-card-title primary-title style="border-bottom: 1px solid #dbdbdb; padding-top:20px;">
                  <div class="headline pre-card-title">Monthly Revenues Collected
                    <v-progress-circular
                      v-show="loading5"
                      indeterminate
                      color="#888888"
                    ></v-progress-circular>
                  </div>
                </v-card-title>
                <v-card-text style="padding-top:0;">
                  <v-layout>
                    <v-flex xs12 md6>
                      <bar-chart v-if="monthlyRevenueLoaded" :chartData="monthlybarchartData" :options="barchartoptions" style="width: 100%; height: 300px; color: #222;"></bar-chart>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-flex  xs12 md12>
                        <v-layout row wrap style="margin: 39px 0 0 10px;">
                            <v-flex md12 style="padding-left: 0px; padding-bottom:0px; background: #343a4c; color: #fff;">
                              <div class="headline" style=" padding: 0px 0 5px 15px;">Data Current Month Collection</div>
                            </v-flex>
                            <v-flex md4 style="background: #2da280; color: #fff;">
                              <table class="monthcollection">
                                  <tr>
                                    <th style="vertical-align:top;"><v-icon color="orange">label</v-icon></th>
                                    <th>PAYE <br>
                                    {{ data_collection.paye | formatNumber }}
                                    </th>
                                  </tr>
                                  <tr>
                                    <th style="vertical-align:top;"><v-icon color="orange">label</v-icon></th>
                                    <th> WASTE-MGT <br>
                                    {{ data_collection.waste_mgt | formatNumber }}
                                    </th>
                                  </tr>
                              </table>
                            </v-flex>
                            <v-flex md4 style="background: #21c393; color: #fff;">
                              <table class="monthcollection">
                                <tr>
                                  <th style="vertical-align:top;"><v-icon color="orange">label</v-icon></th>
                                  <th> DTA <br>
                                  {{ data_collection.dta | formatNumber }}
                                  </th>
                                </tr>
                                <tr>
                                  <th style="vertical-align:top;"><v-icon color="orange">label</v-icon></th>
                                  <th>ROADTAX <br>
                                  {{ data_collection.road_tax | formatNumber }}
                                  </th>
                                </tr>
                              </table>
                            </v-flex>
                            <v-flex md4 style="background: #55d5af; color: #fff;">
                              <table class="monthcollection">
                                <tr>
                                  <th style="vertical-align:top;"><v-icon color="orange">label</v-icon></th>
                                  <th>WHT <br>
                                  {{ data_collection.wht | formatNumber }}
                                  </th>
                                </tr>
                                <tr>
                                  <th style="vertical-align:top;"><v-icon color="orange">label</v-icon></th>
                                  <th>PARK-FEES <br>
                                  {{ data_collection.park_fee | formatNumber }}
                                  </th>
                                </tr>
                              </table>
                            </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
        </v-flex>
      </v-layout>
    </section>

    <section class="mt-3">
      <v-layout row wrap>
        <v-flex  xs12 md12>
          <v-card text-xs-left>
            <v-card-title primary-title style="border-bottom: 1px solid #dbdbdb; padding-top:20px;">
              <div class="headline pre-card-title">YTD IGR Collection By Ministries Analytics
                <v-progress-circular
                  v-show="loading4"
                  indeterminate
                  color="#888888"
                ></v-progress-circular>
              </div>
            </v-card-title>
            <v-card-text style="padding-top:0;">
            <bar-chart v-if="mdaIgrLoaded" :chartData="barchartData" :options="barchartoptions" style="width: 100%; height: 300px;"></bar-chart>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </section>
  </template>
</template>
<template  v-else>
  <v-layout row wrap>
    <v-flex style="margin-top: 100px;" text-xs-center xs12 sm12 lg12>
      <h1 class="headline" style="font-size: 67px !important;">WELCOME TO <v-img src="/anscims-logo.svg"></v-img></h1>
    </v-flex>
  </v-layout>
</template>
</v-container>

</template>

<style lang="scss" scoped>
  .pre-card-title {
      color: #555555 !important;
  }
  table.progress {
    width: 100%;
    color: #727272;
    border-spacing: 1em;
  }
  .text-dark {
    font-size: 12px !important;
  }
  .text-dark {
    color: #000;
  }
  table.monthcollection {
    text-align: left;
    width: 100%;
  }
  table.monthcollection {
    // border-spacing: 9px;
    border-collapse:separate;
    border-spacing:0 14px;
  }
  table.monthcollection th i{
  line-height: 65%;
  }
  table.progress th {
  text-align: left;
  padding: 0 !important;
  font-size: 14px;
  line-height: 110%;
  }
  table.progress th i{
  line-height: 55%;
  }
  table.progress td {
    width: 60%;
  }
  table.progress td p{
    font-size: 12px;
    float: right;
    margin: 0;
    font-weight: bold;
  }
  table.progress td p::before{
    content: '\20A6';
  }
  .sidebar-card {
    div:nth-child(even) {
      background: rgb(240, 240, 240) !important;
    }
  }

  .cardbg-1 {
    background-image: url('/cardbg-1.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .cardbg-2 {
    background-image: url('/cardbg-2.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .cardbg-3 {
    background-image: url('/cardbg-3.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .cardbg-4 {
    background-image: url('/cardbg-4.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .curved-cards-2 {
    border-radius: 15px 15px 24px 24px !important;
    -webkit-box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05) !important;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05) !important;
  }

  .headline {
    // color: #888;
    font-weight: 500;
  }

  .pre-card-title {
    color: #000;
    font-weight: 500;
  }

  .theme--dark h6.text-primary {
    color: #ccc !important;
  }

  .display-2 {
      font-size: 17px !important;
      font-weight: 400;
      line-height: 20px !important;
      letter-spacing: normal !important;
      font-family: 'Roboto', sans-serif !important;
  }

  .display-3 {
      font-size: 40px !important;
      font-weight: 400;
      letter-spacing: normal !important;
      line-height: 117% !important;
      font-family: 'Roboto', sans-serif !important;
      color: #000 !important;
  }

  .curved-cards-custom {
    box-shadow: none !important;
  }

  .text-primary {
    color: #009f70 !important;
  }

  h6 {
    color: #000;
  }

  .currency {
    color: #000;
  }

  .pre-card-title {
    color: #000 !important;
    font-weight: 800;
  }

</style>

<script>
import PieChart from "../assets/PieChart.js";
import BarChart from "../assets/BarChart.js";

import YearlyIGR from '@/components/charts/yearly-igr'
import customProgressBar from '@/components/customProgressBar'

export default {
  layout: 'user',
  components: {
    PieChart,
    BarChart,
    YearlyIGR,
    customProgressBar
  },
  data() {
    return {
      monthlyRevenueLoaded:false,
      mdaIgrLoaded:false,
      loading: false,
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading7: false,
      loading8: false,
      graphLoaded: false,
      piechartoptions: {
        responsive: true,
      },
      barchartoptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      piechartData: {
        labels: ["Revenue", "Expenses"],
        datasets: [
          {
            label: "Total Revenue vs Expenses YTD",
            backgroundColor: ["#2599FB", "#f26b3e"],
            data: [50000, 30000]
          }
        ]
      },
      tax_payer: {
        individual: '',
        corporate: ''
      },
      igr_collections: {
        current: {
          total: '',
          year: ''
        },
        current_1: {
          total: '',
          year: ''
        },
        current_2: {
          total: '',
          year: ''
        },
        current_3: {
          total: '',
          year: ''
        },
        current_month: '',
        previous_month: ''
      },
      barchartData: {
        labels: [], // 'ACCOUNTS', 'ACTDA', 'AIRS', 'ASUBEB', 'ASWAMA', 'CHIEFTANCY', 'COMMERCE', 'CSC', 'EDUCATION', 'ENVIRONMENT', 'FINANCE', 'LANDS'
        datasets: [{
          label: "Revenues Collected",
          backgroundColor: '#1AB6F0',
          data: [] 
        }]
      },
      monthlybarchartData: {
        labels: [], 
        datasets: [{
          label: "Monthly Revenues Collected",
          backgroundColor: '#1DAF87',
          data: [] 
        }]
      },

      heads_collection: [
        {
          amount: '',
          name: '',
          icon: ''
        }
      ],

      count_card: {
        expenses_mtd: '',
        expenses_ytd: '',
        igr_mtd: '',
        igr_ytd: '',
        total_reg_today: '',
      },

      data_collection: {
        dta: '',
        park_fee: '',
        paye: '',
        road_tax: '',
        waste_mgt: '',
        wht: '',
      },

      max_threshold: 2000000
    }
  },
  mounted() {
    this.getDashboardValues();
    this.countCards();
    this.maxThreshold();
    this.taxPayer();
    this.dataCollection();
    this.igrCollections();
    this.mdasIgrYtd();
    this.monthlyIgrCollection();
    this.monthlyRevenueHeadCollection();
    let that = this;
    setInterval(function(){ that.getDashboardValues(); }, 300000);
  },
  created() {
  },
  computed: {
    
    userPermissions() {
      return this.$store.state.auth.userPermissions;
    }
  },
  methods: {
    countCards() {
      this.loading1 = true;
      this.$axios.$get('dashboard/count_card').then(res => {
        this.loading1 = false;
        this.count_card = res.count_card;
      });
    },

    maxThreshold() {
      this.loading2 = true;
      this.$axios.$get('dashboard/max_threshold').then(res => {
        this.loading2 = false;
        this.max_threshold = res.max_threshold;
      });
    },

    igrCollections() {
      this.loading3 = true;
      this.$axios.$get('dashboard/igr_collections').then(res => {
        this.loading3 = false;
        this.igr_collections = res.igr_collections;
      });
    },

    mdasIgrYtd() {
      this.loading4 = true;
      this.$axios.$get('dashboard/mdas_igr_ytd').then(res => {
        let mda_data = res.mdas_igr_ytd;
        mda_data.forEach(element => {
          // if(this.barchartData.length > 0) {
          //    if(mda_data.length !== barchartData)  {
               this.barchartData.labels.push(element.mda_slug);
          //    }
          // }
          this.barchartData.datasets[0].data.push(element.amount);
        });
        this.loading4 = false;
        this.mdaIgrLoaded = true;
      });
    },

    monthlyIgrCollection() {
      this.loading5 = true;
      this.$axios.$get('dashboard/monthly_igr_collection').then(res => {
        // Monthly graph data
        let monthly_data = res.monthly_igr_collection;
        monthly_data.forEach(element => {
          // if(this.monthlybarchartData.length < 1) {
          //    if(monthly_data.length !== monthlybarchartData)  {
                this.monthlybarchartData.labels.push(element.month);
            //  }
          // }
          this.monthlybarchartData.datasets[0].data.push(element.amount);
        });
        this.loading5 = false;
        this.monthlyRevenueLoaded = true;
      });
    },

    monthlyRevenueHeadCollection() {
      this.loading6 = true;
      this.$axios.$get('dashboard/monthly_revenue_head_collection').then(res => {
        this.loading6 = false;
        this.heads_collection = res.monthly_revenue_head_collection;
      });
    },

    taxPayer() {
      this.loading7 = true;
      this.$axios.$get('dashboard/tax_payer').then(res => {
        this.loading7 = false;
        this.tax_payer = res.tax_payer;
      });
    },

    dataCollection() {
      this.loading8 = true;
      this.$axios.$get('dashboard/data_collection').then(res => {
        this.loading8 = false;
        this.data_collection = res;
      });
    },

    getDashboardValues() {
      this.loading = true;
      this.$axios.$get('/dashboard').then(res => {
        this.loading = false;
        this.graphLoaded = true;
        this.count_card = res.data.count_card;

        // Total Igr collections by years
        this.igr_collections = res.data.igr_collections;

        // Get count of tax payers
        this.tax_payer = res.data.tax_payer;

        // Monthly graph data
        let monthly_data = res.data.monthly_igr_collection;
        monthly_data.forEach(element => {
          this.monthlybarchartData.labels.push(element.month);
          this.monthlybarchartData.datasets[0].data.push(element.amount);
        });

        // Mdas graph data
        let mda_data = res.data.mdas_igr_ytd;
        mda_data.forEach(element => {
          this.barchartData.datasets[0].data.push(element.amount);
          this.barchartData.labels.push(element.mda_slug);
        });

        this.heads_collection = res.data.monthly_revenue_head_collection;
        this.max_threshold = res.data.max_threshold;

      }, error => {

      })
    },

    generateRandomColor() {
      // let colors = ['green', 'blue', 'orange', 'red'];
      // return colors[Math.floor(Math.random() * colors.length)];
      return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    },

    computePercent(param) {
      let percent = (param / this.max_threshold) * 100;
      if (percent > 100)
        return 100;
      return percent;
    }
  }
}
</script>
