<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar />
  <!-- RouterView is where our route content gets rendered. 
       So if the route is About, it will render anything that we tell the About route to render in the router/index.js file  
  -->
  <RouterView />
</template>

