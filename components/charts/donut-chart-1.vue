<script>
import {Pie} from 'vue-chartjs'

  export default {
    extends: Pie,
    components: {
      piechart: Pie
    },
    props: ["data"],
    mounted() {
      this.renderChart(this.data);
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
