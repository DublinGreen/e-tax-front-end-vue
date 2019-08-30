<template>
<section>
  <v-sheet class="px-4 py-5 my-shadow-2" style="opacity: 0.9">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Name</div>
        <v-text-field outline>
          <div class="" slot="label">Name</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Email</div>
        <v-text-field type="email" outline>
          <div class="" slot="label">Email</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">AREA</div>
        <v-select :items="offices" outline>
          <div slot="label">Choose</div>
        </v-select>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">ANSSID</div>
        <v-text-field outline>
          <div class="" slot="label">ANSSID</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Phone Number</div>
        <v-text-field type="tel" outline>
          <div class="" slot="label">Phone Number</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4 mx-auto>
        <v-btn small flat block round class="secondary caption mt-4">Search</v-btn>
      </v-flex>
    </v-layout>

    <section class="mt-5">
      <v-data-table hide-actions :headers="headers" :items="users">
        <template v-slot:items="props">
          <td>{{ props.item.PayerName }}</td>
          <td>{{ props.item.Amount | formatNumber }}</td>
          <td>{{ props.item.RevenueName }}</td>
          <td>{{ props.item.revenueSystem }}</td>
          <td>{{ props.item.PaymentDate }}</td>
          <td class="text-xs-center">
            <v-btn flat small class="info action-btn">View</v-btn>
          </td>
        </template>
      </v-data-table>
    </section>
  </v-sheet>
</section>
</template>

<script>
export default {
  props: ['offices'],
  data() {
    return {
      headers: [
        {
          text: 'Firstname',
          value: 'name'
        },
        {
          text: 'Lastname',
          value: 'lastname'
        },
        {
          text: 'Phone',
          value: 'phone'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Address',
          value: 'revenueSystem'
        },
        {
          text: "Actions",
          sortable: false,
          align: 'center'
        }
      ],
      users: [],
    }
  },


  created() {
    // this.users = this.$state.getUsers('super_admin');
  },


  methods: {
  }
}
</script>
