<template>
  <v-container grid-list-lg class="dashboard-wrapper">
    <div class="headline mb-5 font-weight-medium">USER PROFILE</div>

        <v-card flat>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs2 md2 lg2>
                <v-sheet style class="font-weight-bold">
                  <div v-if="userProfile.first_name" class="user-item">Firstname:</div>
                  <div v-if="userProfile.last_name" class="user-item">Lastname:</div>
                  <div v-if="userProfile.email" class="user-item">Email:</div>
                  <div v-if="userProfile.address" class="user-item">Address:</div>
                  <div v-if="userProfile.mda_name" class="user-item">MDA:</div>
                  <div v-if="userProfile.user_role" class="user-item">Role:</div>
                  <div v-if="userProfile.zipcode" class="user-item">Zip:</div>
                </v-sheet>
              </v-flex>

              <v-flex xs7 md7 lg7 v-if="!loadinguserinfo">
                <v-sheet style class="lighten-2">
                  <div v-if="userProfile.first_name" class="user-item-text">{{ userProfile.first_name }}</div>
                  <div v-if="userProfile.last_name" class="user-item-text">{{ userProfile.last_name }}</div>
                  <div v-if="userProfile.email" class="user-item-text">{{ userProfile.email }}</div>
                  <div v-if="userProfile.address" class="user-item-text">{{ userProfile.address }}</div>
                  <div v-if="userProfile.mda_name" class="user-item-text">{{ userProfile.mda_name }}</div>
                  <div v-if="userProfile.user_role" class="user-item-text">{{ userProfile.user_role }}</div>
                  <div v-if="userProfile.zipcode" class="user-item-text">{{ userProfile.zipcode }}</div>
                </v-sheet>
              </v-flex>
              <v-flex xs7 md7 lg7 v-if="loadinguserinfo">
                <v-progress-linear color="blue" :indeterminate="true"></v-progress-linear>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.user-item {
  font-size: 1em;
  padding: 6px 0 6px 27px;
  border-bottom: #dcdcdc solid 1px;
}
.user-item-text {
  font-size: 1em;
  padding: 6px 0 6px 27px;
  border-bottom: #eeeeee solid 1px;
}
</style>

<script>
export default {
  layout: 'user',
  data() {
    return {
      valid: false,
      loading: false,
      loadinguserinfo: false,
      errors: null,
      active: 2,
      userProfile: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        user_role: '',
        zipcode: '',
        mda_name: ''
      },
      resetModel: {
        oldpassword: '',
        newpassword: '',
        confirmpassword: ''
      },
      oldpasswordRules: [v => !!v || 'Old password is required'],
      newpasswordRules: [v => !!v || 'New password is required'],
      confirmpasswordRules: [v => !!v || 'Confirm password is required']
    }
  },

  computed: {
  },

  watch: {},

  created() {
    this.getUserProfile()
  },

  mounted() {
    this.getUserProfile();
  },

  methods: {
    getUserProfile() {
      let userid = this.$route.params.userid;
      console.log(this.$route.params.userid);
      this.loadinguserinfo = true
      this.loadinguserinfo = true
      this.$axios.$get('/users/profile/' + userid).then(
        res => {
          this.userProfile = res.data;
          this.loadinguserinfo = false
        },
        error => {
          this.loadinguserinfo = false
          this.$toast.error(error.response.data.error)
        }
      )
    },
  }
}
</script>
