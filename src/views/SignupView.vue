<template>
  <section class="signup">
    <img src="@/assets/logo.png" alt="Logo for the Weal App">
    <div class="signup__form">
      <h2>Create a new account</h2>
      <form>
        <div class="signup__wrapper">
          <label for="email">Email</label>
          <input type="text" required id="email" placeholder="Enter your Email" v-model="email">
        </div>
        <div class="signup__wrapper">
          <label for="firstname">First Name</label>
          <input type="text" required id="firstname" placeholder="Enter your First Name" v-model="firstname">
        </div>
        <div class="signup__wrapper">
          <label for="lastname">Last Name</label>
          <input type="text" required id="lastname" placeholder="Enter your Last Name" v-model="lastname">
        </div>
        <div class="signup__wrapper">
          <label for="password">Password</label>
          <input type="password" required id="password" placeholder="Enter your Password" v-model="password">
        </div>
        <router-link to="/dashboard" class="signup__create" @click="processLogin()">Create Account</router-link>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      firstname: '',
      lastname: '',
      password: ''
    }
  },

  mounted() {
    this.email = '';
    this.firstname = '';
    this.lastname = '';
    this.password = '';

    document.querySelector(".navbar").classList.add("hide")
    document.querySelector(".header").classList.add("hide")
  },

  // router before change remove hide from navbar and header
  beforeRouteLeave(to, from, next) {
    document.querySelector(".navbar").classList.remove("hide")
    document.querySelector(".header").classList.remove("hide")
    next()
  },

  methods: {
    processLogin() {
      // set the user's credentials in the local storage as an object User
      localStorage.setItem('User', JSON.stringify({
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password
      }));
    }
  }
}
</script>

<style>

</style>