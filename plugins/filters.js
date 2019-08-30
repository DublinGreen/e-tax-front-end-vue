import Vue from 'vue';
import IdleVue from 'idle-vue';
import converter from 'number-to-words';
import moment from 'vue-moment';
import numeral from 'numeral';

Vue.filter('toWords', function(value) {
	if (!value) return '';
	return converter.toWords(value);
});

Vue.filter('formatNumber', function(value) {
	return numeral(value).format('0,0.00');
});

Vue.filter('formatNumber_NoDecimal', function(value) {
	return numeral(value).format('0,0');
});

const eventsHub = new Vue();

Vue.use(moment);
Vue.use(IdleVue, {
	eventEmitter: eventsHub,
	idleTime: 300000
});
