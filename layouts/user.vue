<template>
  <v-app>
    <v-navigation-drawer
    style="background: rgba(255,255,255,0.7);"
      :clipped="clipped"
      fixed
      app
      flat
      class="nav-bg"
      width="250"
      v-model="drawer"
    >
      <v-list class="nav-content">
        <v-img src="/anscims-logo.svg" width="160" class="mx-auto mb-4 mt-3"></v-img>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children && (item.permission.some(r => userPermissions.includes(r)) || item.permission.includes('ALL'))"
            :key="item.text"
            v-model="item.model"
            :append-icon="item.model ? item['icon-child'] : item['icon-alt']"
            :prepend-icon="item.icon"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
              <v-list-tile class="ml-3"
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.to"
              :class="(child.permission.some(r => userPermissions.includes(r)) || child.permission.includes('ALL')) ? 'isShown' : 'isHidden'"
              >
                <v-list-tile-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ child.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
          </v-list-group>
          <v-list-tile
            v-if="!item.children && (item.permission.some(r => userPermissions.includes(r)) || item.permission.includes('ALL'))"
            :key="item.text"
            :to="item.to"
            :style="item.style"
            @click="item.click"
          >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content class="bg">
      <transition name="slide-fade">
        <div class="dashboard-container">
          <v-toolbar flat :clipped-left="clipped" class="my-toolbar mt-4" light app>
            <v-toolbar-title class="ml-0">
              <v-toolbar-side-icon class="hidden-lg-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu left offset-y>
              <v-chip slot="activator">
                <v-avatar>
                  <v-icon dark>account_circle</v-icon>
                </v-avatar>
                <span class="caption font-weight-bold secondary--text">{{ greetings }}, {{ fullName }}</span>
                <v-icon color="secondary" size="25">mdi-chevron-down</v-icon>
              </v-chip>
              <v-card class="py-3">
                <v-btn block flat class to="/user-profile" color="secondary">
                  <v-icon size="18" class="mr-3">mdi-account-card-details</v-icon>
                  <span class="caption">Profile</span>
                </v-btn>

                <v-divider class="my-2"></v-divider>

                <v-btn block flat class color="secondary" @click="logout">
                  <v-icon size="22" class="mr-3">mdi-power</v-icon>
                  <span class="caption">Log Out</span>
                </v-btn>
              </v-card>
            </v-menu>
          </v-toolbar>

          <transition name="slide-fade">
            <nuxt></nuxt>
          </transition>
        </div>
      </transition>
    </v-content>


    <v-dialog
      width="350"
      v-model="openModal"
      persistent
      text-xs-center
    >
      <v-card text-xs-center style="padding-top:20px; text-align: center;">
        <v-icon x-large>lock</v-icon>
        <v-card-text>

            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <div class="caption font-weight-bold mb-1">You have been inactive for a while</div>
                You would be logged out in {{ timer }} seconds.
              </v-flex>

              <v-flex xs12 sm12 md12 mx-auto>
                <v-btn mt-1 small flat block round @click="closeModal" class="secondary caption">Click to cancel</v-btn>
              </v-flex>
            </v-layout>

        </v-card-text>

      </v-card>
    </v-dialog>


  </v-app>
</template>

<style lang="scss" scoped>
.v-btn {
  text-transform: unset;
}

.v-navigation-drawer .v-list {
    height: 100vh !important;
}

.isShown {
  display: block;
}

.isHidden { display: none}
.content-bg {
  background-color: rgb(244, 248, 248);
}


.bg {
  background: rgb(240, 240, 240) url('/bgdesign2.png');
  // background-color: white;
  background-position: -10% -4%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: unset !important;
}

.nav-content {
  // background-image: url("/flag.png");
  background-color: transparent;
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  // opacity: 0.9;

  // .v-list {
  //   background: none !important;
  // }
}
</style>

<script>
import { mapGetters } from 'vuex'
import { LOGOUT } from '@/utils/mutation-types'


export default {
  middleware: 'auth',
  data() {
    return {
      fetching: false,
      loading: false,
      drawer: null,
      openModal: false,
      clipped: false,
      greetings: '',
      timer: 30,
      idleTimer: '',
      items: [
        {
          permission: ['ALL'],
          icon: 'mdi-speedometer',
          text: 'Dashboard',
          to: '/dashboard',
          click: () => {
            return
          }
        },
        {
          permission: ['VIEW_COLLECTION'],
          icon: 'mdi-rhombus-split',
          text: 'Collection',
          to: '/collection',
          click: () => {
            return
          }
        },
        {
          permission: ['GENERATE_BILL','VIEW_BILL'],
          icon: 'mdi-onenote',
          'icon-child': 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Bills',
          // to: '/bills/view-bills',
          click: () => {
            return
          },
          model: false,
          children: [
            {
              permission: ['GENERATE_BILL'],
              icon: 'mdi-file-plus',
              text: 'Create Bill',
              to: '/bills/create'
              // to: '/bills/new-bill'
            },
            {
              permission: ['VIEW_BILL'],
              icon: 'mdi-feature-search',
              text: 'View Bills',
              to: '/bills/list'
            },
            {
              permission: ['VIEW_BILL'],
              icon: 'mdi-feature-search',
              text: 'Bills Repo',
              to: '/bills/view-bills'
            }
          ]
        },
        {
          permission: ['VIEW_TAX_PAYER'],
          icon: 'mdi-account-group',
          'icon-child': 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Taxpayers',
          to: '/taxpayers',
          click: () => {
            return
          },
          model: false,
          // children: [
          //   {
          //     icon: 'mdi-account-switch',
          //     text: 'Search Taxpayers',
          //     to: '/taxpayers'
          //   }
          // ]
        },
        {
          permission: ['VIEW_RECEIPT','ISSUE_RECEIPT'],
          icon: 'mdi-receipt',
          text: 'Receipt',
          'icon-child': 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          click: () => {
            return
          },
          model: false,
          children: [
            {
              permission: ['ISSUE_RECEIPT'],
              icon: 'mdi-file-plus',
              text: 'Issue Receipt',
              to: '/receipt'
            },
            {
              permission: ['VIEW_RECEIPT','ISSUE_RECEIPT'],
              icon: 'mdi-feature-search',
              text: 'View Receipts',
              to: '/receipt-log'
            }
          ]
        },
        // {
        //   icon: 'mdi-file-chart',
        //   text: 'Reports',
        //   click: () => {
        //     return
        //   }
        // },
        {
          permission: ['CREATE_MDA_USER','CREATE_ADMIN_USER','CREATE_TMS_USER','CREATE_STATE_GOVERNMENT_USER','CREATE_REVENUE_BOARD_USER'],
          icon: 'account_box',
          text: 'User Management',
          children: [
            // {
            //   text: 'User Management',
            //   icon: 'mdi-account-settings'
            // },
            {
              permission: ['ALL'],
              text: 'Create A New User',
              icon: 'person_add',
              to: '/users/create'
            },
            {
              permission: ['ALL'],
              text: 'All Users',
              icon: 'mdi-account-group',
              to: '/users'
            }
          ],
          click: () => {
            return
          }
        },
        {
          permission: ['ALL'],
          icon: 'mdi-settings',
          'icon-child': 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Settings',
          click: () => {
            return
          },
          model: false,
          children: [
            // {
            //   text: 'User Management',
            //   icon: 'mdi-account-settings'
            // },
            {
              permission: ['ALL'],
              text: 'Change Password',
              icon: 'mdi-credit-card-settings',
              to: '/change-password'
            }
          ]
        },
        // {
        //   icon: 'mdi-help-rhombus',
        //   text: 'Help',
        //   click: () => {
        //     return
        //   }
        // },
        {
          permission: ['ALL'],
          icon: 'mdi-logout',
          text: 'Logout',
          style: 'cursor:pointer;',
          click: () => {
            this.$store.commit(`auth/${LOGOUT}`)
            this.$router.push('/')
          }
        }
      ]
    }
  },
  onIdle() {
    //this.logout();
    this.startTimer();
  },
  computed: {
    ...mapGetters({
      fullName: 'auth/authUser'
    }),
    userPermissions() {
      return this.$store.state.auth.userPermissions;
    },
  },
  created() {
    this.greetUser();
  },
  mounted: function() {
    console.log(this.userPermissions)
  },
  methods: {
    startTimer() {
      this.openModal = true;
      let timeleft = 30;
      let that = this;
      this.idleTimer = setInterval(function(){
        that.timer = timeleft;
        timeleft--;
        if(timeleft == 1) {
          that.logout();
        }

      }, 1000);
    },
    closeModal() {
      clearInterval(this.idleTimer);
      this.timer = 30;
      this.openModal = false;
    },
    logout() {
      this.$store.commit(`auth/${LOGOUT}`)
      this.$router.push('/')
    },
    greetUser() {
      let myDate = new Date()
      let hrs = myDate.getHours()
      if (hrs < 12) this.greetings = 'Good Morning.'
      else if (hrs >= 12 && hrs <= 17) this.greetings = 'Good Afternoon'
      else if (hrs >= 17 && hrs <= 24) this.greetings = 'Good Evening'
    }
  }
}
</script>
