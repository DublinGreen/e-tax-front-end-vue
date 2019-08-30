<template>
<div class="chart">
  <apexcharts height="300" type=radialBar :options="chartOptions" :series="series" />
</div>
</template>

<style lang="scss" scoped>
.chart {
  max-width: 370px;
  margin: auto;
  opacity: 0.9;
}
</style>

<script>
import VueApexCharts from "vue-apexcharts";
import ApexCharts from "apexcharts";

export default {
  components: {
    apexcharts: VueApexCharts
  },
  data: function () {
    return {}
  },

  computed: {
    series: function () {
      return [55, 99]
    },

    chartOptions: function () {
      return {
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '18px',
              },
              value: {
                fontSize: '16px',
              },
              total: {
                show: true,
                label: 'Increase',
                formatter: function (w) {
                  return "1.2%"
                }
              }
            }
          }
        },
        labels: ['Users', 'Visitors'],
        title: {
          text: "Daily Traffic",
          align: 'center',
        },
      }
    }
  },
}
</script>
