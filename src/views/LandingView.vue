<template>
  <section class="landing">
    <img src="@/assets/wave.png" class="landing__wave">
    <div class="landing__wrapper">
      <CarouselComponent :selectedContent="selectedContent"/>
      <div class="landing__dots">
        <div v-for="content in content" :data-index="content.id" :key="content.id" class="landing__dot" @click="setCarouselContent($event)"></div>
      </div>
      <div class="landing__login">
        <router-link to="/dashboard" class="landing__button landing__button--signin">Sign-In</router-link>
        <router-link to="/signup" class="landing__button landing__button--signup">Sign-Up Now</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import CarouselComponent from '../components/CarouselComponent.vue';
export default {
  data() {
    return {
      content: [
        {id: 1, title: 'Anxiety', subtitle: 'forecast', icon: 'logo.png', para: `Weal is catered to your needs and wants. We are here to help you find the best way to deal with your anxiety. By providing you with customized music, you can relax your way.`},
        {id: 2, title: 'Take', subtitle: 'Control', icon: 'control.png', para: `We understand that your needs are ever changing, that's why Weal provides you with plenty of methods of controlling what content you need to hear.`},
      ],

      selectedContent: {}
    }
  },

  mounted() {
    this.selectedContent = this.content[0];

    // add the active class to the first dot
    const dots = document.querySelectorAll('.landing__dot');
    dots[0].classList.add('dot--active');

    document.querySelector(".navbar").classList.add("hide")
    document.querySelector(".header").classList.add("hide")
  },

  methods: {
    setCarouselContent(e) {
      // get the index of the clicked dot
      let index = e.target.dataset.index;

      // remove the active class from all dots
      let dots = document.querySelectorAll('.landing__dot');
      dots.forEach(dot => dot.classList.remove('dot--active'));

      // add the active class to the clicked dot
      e.target.classList.add('dot--active');

      console.log(index)

      // set the selected content to the content at that index
      this.selectedContent = this.content[index - 1];
    }
  },

  // router before change remove hide from navbar and header
  beforeRouteLeave(to, from, next) {
    document.querySelector(".navbar").classList.remove("hide")
    document.querySelector(".header").classList.remove("hide")
    next()
  },

  components: {
    CarouselComponent,
  },

}
</script>

<style>

</style>