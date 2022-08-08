<template>
  <header class="header">
    <img src="@/assets/header_bck.png" alt="">
    <h1>{{route}}</h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      route: '',
    }
  },

  mounted() {
    this.route = this.$route.name;
  },

  // on route change, update the route
  watch: {
    $route: function(to, from) {
      this.route = to.name;
    }
  }
}
</script>

<style>

</style>