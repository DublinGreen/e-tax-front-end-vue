<template>
<div class="p-container" :style="{height: height}">
  <div class="p-line" :style="{width: computedWidth}"></div>
</div>
</template>

<script>
export default {
  props: ['height','width'],
  data() {
    return {
    }
  },
  computed: {
    computedWidth: function() {
      return ((100 - parseInt(this.width, 10)) + '%');
    }
  }
  ,
}
</script>

<style lang="scss" scoped>
.p-container {
  clear: both;
  width: 100%;
  background-image: linear-gradient(to right, rgb(244, 73, 54) 0%, rgb(33, 195, 146) 100%);
}
.p-line {
  height: 100%;
  background: #dde8ed;
  float: right;
}
</style>
