<template>
<v-app>
  <v-content class="bg">
    <v-container fill-height>
      <nuxt />
    </v-container>
  </v-content>

</v-app>
</template>

<style lang="scss" scoped>
@media (min-width: 768px) {
  .bg {
    background-image: url("/bg.svg");
    background-color: #cccccc;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>

<script>
export default {
  middleware: 'guest',
  data() {
    return {

    }
  }
}
</script>
