<template>
  <div class="landing__item">
    <div class="landing__title">
      <h1>{{selectedContent.title}}</h1>
      <h2>{{selectedContent.subtitle}}</h2>
    </div>
    <img :src="`${this.selectedContent.icon}`" :alt="`Icon for ${selectedContent.title} ${selectedContent.subtitle}`">
    <p>{{selectedContent.para}}</p>
  </div>
</template>

<script>
export default {
  props: ['selectedContent'],

  methods: {
  }
}
</script>

<style>

</style>