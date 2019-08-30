<template>
<div class="chart">
  <apexcharts height="340" type="line" :options="chartOptions" :series="series"></apexcharts>
</div>
</template>

<style lang="scss" scoped>
.chart {
  max-width: 650px;
  margin: auto;
  opacity: 0.9;
}
</style>

<script>
import VueApexCharts from "vue-apexcharts";
import ApexCharts from "apexcharts";

export default {
  name: "Chart",
  components: {
    apexcharts: VueApexCharts
  },
  data: function () {
    return {};
  },

  computed: {
    series: function () {
      return [{
          name: "Data 2",
          data: [31, 40, 28, 51, 42, 109, 100, 38]
        },
        {
          name: "Data 2",
          data: [100, 20, 44, 91, 83, 10, 15, 20]
        }
      ];
    },
    chartOptions: function () {
      return {
        dataLabels: {
          enabled: false
        },
        chart: {
          id: "Total_Revenue"
        },
        stroke: {
          curve: "smooth"
        },
        title: {
          text: "Total Revenue Received",
          align: 'left',
        },
        foreColor: "#999",
        stacked: true,
        dropShadow: {
          enabled: true,
          enabledSeries: [0],
          top: -2,
          left: 2,
          blur: 5,
          opacity: 0.06
        },
        colors: ['#00E396', '#0090FF'],

        legend: {
          position: 'top',
          horizontalAlign: 'center'
        },
        markers: {
          size: 0,
          strokeColor: "#fff",
          strokeWidth: 3,
          strokeOpacity: 1,
          fillOpacity: 1,
          hover: {
            size: 6
          }
        },
        xaxis: {
          categories: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
          axisTicks: {
            show: false
          }
        }
      };
    }
  }
};
</script>
