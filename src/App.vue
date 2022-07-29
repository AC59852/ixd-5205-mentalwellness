<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  </header>
  <!-- RouterView is where our route content gets rendered. 
       So if the route is About, it will render anything that we tell the About route to render in the router/index.js file  
  -->
  <RouterView />
</template>
