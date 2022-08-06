<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <router-link to="/">
          <img src="@/assets/home.svg" alt="Icon to navigate to the Home Page">
          Home
        </router-link>
      </li>
      <li class="navbar__item">
        <router-link to="/checkin">
          <img src="@/assets/checkin.svg" alt="Icon to navigate to the Home Page">
          Check-In
        </router-link>
      </li>
      <li class="navbar__item">
        <router-link to="/care">
          <img src="@/assets/care.svg" alt="Icon to navigate to the Home Page">
          Care
        </router-link>
      </li>
      <li class="navbar__item navbar__item--patterns">
        <router-link to="/Patterns">
          <img src="@/assets/patterns.svg" alt="Icon to navigate to the Home Page">
          Patterns
        </router-link>
      </li>
      <li class="navbar__item navbar__item--profile">
        <router-link to="/profile">
          <img src="@/assets/Profile.svg" alt="Icon to navigate to the Home Page">
          Profile
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>