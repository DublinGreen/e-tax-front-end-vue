import { Bar, mixins } from 'vue-chartjs';

export default {
	extends: Bar,
	components: {
		barchart: Bar
	},
	mixins: [ mixins.reactiveProp ],
	props: [ 'chartData', 'options' ],
	mounted() {
		this.renderChart(this.chartData, this.options);
	}
};
