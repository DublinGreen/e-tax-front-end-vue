<template>
    <v-flex style="margin: 0 !important; padding:5px;" :class="cardType == 'full' ? 'md12': 'md6'">
        <v-sheet class="pa-3 curved-cards" >
            <h4 class="igr-year text-primary" style="color: #0eb074">{{ yearFormat(year) }} Revenue Collection</h4>
            <h2 class="igr-year-revenue font-weight-medium" :class="cardType == 'full' ? 'display-2': 'headline'"><v-icon :class="cardType == 'full' ? 'display-2': 'headline'" class="currency">mdi-currency-ngn</v-icon>{{ revenue | formatNumber }}
              <!-- <v-icon v-if="arrowType == 'up'" size="24" color="green" right>arrow_drop_up</v-icon>
              <v-icon v-if="arrowType == 'down'" size="24" color="orange" right>arrow_drop_down</v-icon> -->
              <v-icon color="green lighten-2" size="48" class="revenue-arrow">arrow_drop_up</v-icon>
            </h2>
        </v-sheet>
    </v-flex>
</template>

<script>
export default {
    name: 'YearlyIGR',
    props: {
        arrowType: '',
        cardType: {
            type: String,
            default: 'full'
        },
        year: {
            type: Number,
            required: true
        },
        revenue: {
            required: true,
            type: Number
        },
    },
    methods: {
      yearFormat(year) {
        if(year == this.$moment(new Date()).format('YYYY')) {
          return 'Current Year'
        }

        return year
      }
    }
}
</script>



<style scoped>
  .igr-year {
      color: rgb(163, 163, 163);
  }

  .half-card .igr-year-revenue {

  }

  /* .revenue-arrow:nth-of-type(2) {
    color: black;
  }
   */
  
  .revenue-arrow {
    z-index:9;
    position: absolute;
    bottom: 3px;
    left: 78%;
  }

  .left-even {
    left: 70% !important;
  }

  /* .revenue-arrow:nth-child(1) {
    /* left: 60%; 
  } */

  .igr-year-revenue {
      /* font-size: 3rem; */
      color: rgba(100, 100, 100, 0.911);
      margin: 0.3em 0.2em 0 0;
      /* padding: 1em; */
  }

  .theme--dark .igr-year-revenue {
    color: #fff;
  }

  /* .igr-year-revenue::before {
      content: '\20A6';
      color: rgba(182, 182, 182, 0.26);
      position: absolute;
      z-index: 444;
      font-size: 2em;
      margin-left: -0.10em;
  } */
</style>
