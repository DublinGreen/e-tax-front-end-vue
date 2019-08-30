<template>
<v-container grid-list-lg class="dashboard-wrapper">
  <div class="headline mb-5 font-weight-medium">Tax Payers</div>

  <v-tabs v-model="tabs" show-arrows fixed-tabs active-class="tab-background" color="grey lighten-2" slider-color="primary">
    <v-tab href="#individual">INDIVIDUAL</v-tab>
    <v-tab href="#corporate">CORPORATE</v-tab>

    <v-tab-item value="individual">
      <Individual />
    </v-tab-item>

    <v-tab-item value="corporate">
      <Corporate />
    </v-tab-item>

  </v-tabs>
</v-container>
</template>

<script>
import Individual from '~/components/tabs/individual'
import Corporate from '~/components/tabs/corporate'
export default {
  layout: 'user',
  components: {
    Individual,
    Corporate,
  },
  data() {
    return {
      tabs: 'individual'
    }
  },
  mounted() {
    this.$store.dispatch('auth/checkPermission', ['VIEW_TAX_PAYER'])
  }
}
</script>
