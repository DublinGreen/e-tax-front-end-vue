<template>
    <v-layout row wrap>
        <v-flex xs12 md12 class="sec-head"><h3>{{title}}</h3></v-flex>
        <!-- <v-flex xs12 md12><v-divider></v-divider></v-flex> -->
    </v-layout>
</template>
<style>
  .sec-head{
    /* background-color:#b4c7e8 */
    background-color:rgba(38, 144, 235, 0.2)
  }
</style>

<script>
export default {
    props:{
        title:String
    }
}
</script>
