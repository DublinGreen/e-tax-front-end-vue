<template>
<v-container grid-list-lg class="dashboard-wrapper">
  <div class="headline mb-5 font-weight-medium">Receipt: View Generated Receipt</div>

  <v-sheet class="px-4 pt-4 pb-5 my-shadow-2" style="opacity: 0.9">

    <v-alert
        :value="true"
        type="error"
        style="margin-bottom:40px;"
        v-if="errors != null"
      >
        Please fix the following errors
        <ul>
          <li v-for="(error, i) in errors" :key="i" >{{ error[0] }}</li>
        </ul>
      </v-alert>

      <v-tabs show-arrows fixed-tabs active-class="tab-background" color="grey lighten-2" slider-color="primary">
        <v-tab href="#issuedreceipts">ISSUED RECEIPTS</v-tab>
        <v-tab v-if="['ISSUE_RECEIPT'].some((r) => userPermissions.includes(r))" href="#nonissuedreceipts">NON-ISSUED RECEIPTS</v-tab>

        <v-tab-item value="issuedreceipts">
          <IssuedReceipts />
        </v-tab-item>

        <v-tab-item value="nonissuedreceipts">
          <NonIssuedReceipts :runSearch="true" />
        </v-tab-item>

      </v-tabs>
  </v-sheet>


</v-container>
</template>


<style lang="scss">
.v-btn-group {
  border-radius: 2px;
  display: inline-flex;
  .theme--dark & {
    background: #424242;
  }
  .theme--light & {
    background: #fff;
  }
  .v-btn {
    border-radius: 0;
    justify-content: center;
    margin: 0;
    min-width: auto;
    padding: 0 8px;
    width: auto;
    &:not(:last-child) {
      border-right: 1px solid transparent;
    }
    &:first-child {
      border-radius: 2px 0 0 2px;
    }
    &:last-child {
      border-radius: 0 2px 2px 0;
    }
  }
}
</style>
<script>
import IssuedReceipts from '~/components/tabs/issuedreceipts'
import NonIssuedReceipts from '~/components/tabs/nonissuedreceipts'

export default {
  layout: 'user',
  components: {
    IssuedReceipts,
    NonIssuedReceipts
  },
  data() {
    return {
      errors: null,
    }
  },

  mounted: function() {
    this.$store.dispatch('auth/checkPermission', ['VIEW_RECEIPT', 'ISSUE_RECEIPT'])
  },

  computed: {
    computedstartDate() {
      return this.formatDate(this.date)
    },

    userPermissions() {
      return this.$store.state.auth.userPermissions;
    }
  },

  watch: {
    date(val) {
      this.startDate = this.formatDate(this.date)
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },


  }
}
</script>
