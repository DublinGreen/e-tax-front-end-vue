import {Pie} from 'vue-chartjs'

export default {
  extends: Pie,
  components: {
    piechart: Pie
  },
  props: ["data", "options"],
  mounted() {
    this.renderChart(this.data, this.options);
  }
}
