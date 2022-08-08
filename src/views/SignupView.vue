<template>
  <section class="signup">
    <img src="@/assets/logo.png" alt="Logo for the Weal App">
    <div class="signup__form">
      <h2>Create a new account</h2>
      <form>
        <div class="signup__wrapper">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email">
        </div>
        <div class="signup__wrapper">
          <label for="firstname">First Name</label>
          <input type="text" id="firstname" v-model="firstname">
        </div>
        <div class="signup__wrapper">
          <label for="lastname">Last Name</label>
          <input type="text" id="lastname" v-model="lastname">
        </div>
        <div class="signup__wrapper">
          <label for="password">Password</label>
          <input type="text" id="password" v-model="password">
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