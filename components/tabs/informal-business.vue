<template>
<section>
  <v-sheet class="px-4 py-5 my-shadow-2" style="opacity: 0.9">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Organization Name</div>
        <v-text-field outline>
          <div class="" slot="label">Organization Name</div>
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
        <div class="caption font-weight-bold mb-1">Regisration Numbert</div>
        <v-text-field outline>
          <div class="" slot="label">Regisration Numbert</div>
        </v-text-field>
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

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">LGA</div>
        <v-select :items="lga" outline>
          <div slot="label">Choose</div>
        </v-select>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">ANSSID Issue Date (From)</div>

        <v-menu ref="dateMenu" v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">

          <template v-slot:activator="{ on }">
            <v-text-field outline v-model="startDate" label="Choose Date" append-icon="mdi-calendar-clock" @blur="date = parseDate(startDate)" v-on="on"></v-text-field>
          </template>

          <v-date-picker color="secondary" v-model="date" no-title @input="dateMenu = false"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">ANSSID Issue Date (To)</div>

        <v-menu ref="dateMenu2" v-model="dateMenu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">

          <template v-slot:activator="{ on }">
            <v-text-field outline v-model="endDate" label="Choose Date" append-icon="mdi-calendar-clock" @blur="date = parseDate(endDate)" v-on="on"></v-text-field>
          </template>

          <v-date-picker color="secondary" v-model="date2" no-title @input="dateMenu2 = false"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs12 sm6 md4 mx-auto>
        <v-btn small flat block round class="secondary caption mt-4">Search</v-btn>
      </v-flex>
    </v-layout>

    <section class="mt-5">
      <v-data-table hide-actions :headers="headers" :items="bills">
        <template v-slot:items="props">
          <td>{{ props.item.anssid }}</td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.phone }}</td>
          <td>{{ props.item.locality }}</td>
          <td class="text-xs-center">
            <v-icon small class="primary--text">mdi-pencil-outline</v-icon>
            <v-icon small class="red--text">mdi-trash-can-outline</v-icon>
          </td>
        </template>
      </v-data-table>
    </section>
  </v-sheet>
</section>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      startDate: '',
      endDate: '',
      dateMenu: false,
      dateMenu2: false,
      offices: ["ANGD", "ATDJ", "APPU"],
      fiscalYear: ['2015', '2016', '2017', '2018', '2019'],
      lga: ['Approved', 'Under Review', 'Pending', 'Cancelled'],
      headers: [{
          text: 'ANSSID',
          value: 'anssid'
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Phone Number',
          value: 'phone'
        },
        {
          text: 'Locality, Area',
          value: 'locality'
        },
        {
          text: "Actions",
          sortable: false,
          align: 'center'
        }
      ],
      bills: [{
          anssid: 1234567,
          name: 'Vincent Grace',
          email: 'ismail@abbey.com',
          phone: '07012345678',
          locality: 'Onitsha North'
        },
        {
          anssid: 1234567,
          name: 'Vincent Grace',
          email: 'ismail@abbey.com',
          phone: '07012345678',
          locality: 'Onitsha North'
        },
        {
          anssid: 1234567,
          name: 'Vincent Grace',
          email: 'ismail@abbey.com',
          phone: '07012345678',
          locality: 'Onitsha North'
        },
        {
          anssid: 1234567,
          name: 'Vincent Grace',
          email: 'ismail@abbey.com',
          phone: '07012345678',
          locality: 'Onitsha North'
        },
        {
          anssid: 1234567,
          name: 'Vincent Grace',
          email: 'ismail@abbey.com',
          phone: '07012345678',
          locality: 'Onitsha North'
        }
      ]
    }
  },

  computed: {
    computedstartDate() {
      return this.formatDate(this.date)
    }
  },

  watch: {
    date(val) {
      this.startDate = this.formatDate(this.date)
    },
    date2(val) {
      this.endDate = this.formatDate(this.date2)
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
    }
  }
}
</script>
