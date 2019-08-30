<template>
<v-container fluid fill-height class="d-block">
  <v-layout align-center justify-center>
    <v-flex xs12 md6 offset-md3 offset-sm3>
      <nuxt-link to="/">
        <v-img src="/anscims-logo.svg" class="mx-auto mb-2" width="300"></v-img>
      </nuxt-link>
      
      <v-layout justify-space-between align-center>
        <v-flex md5 align-center align-content-center>
          <nuxt-link to='/register/mdas' class="text-center">
            <center>
            <v-sheet class="curved-cards pa-2 text-center align-center">
              <v-icon size="64" color="primary">account_box</v-icon>
              <div class='headline'>MDAs</div>
            </v-sheet>
            </center>
          </nuxt-link>
        </v-flex>
        <v-flex md5>
          <nuxt-link to="/register/tax-authority">
          <center>
            <v-sheet class="curved-cards pa-2 align-center">
              <v-icon size="64" color="secondary">account_circle</v-icon>
              <div class="headline">Tax Authority</div>
            </v-sheet>
          </center>
          </nuxt-link>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

