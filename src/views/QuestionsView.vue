<template>
  <section class="questions">
    <h2>{{activeQuestion}}</h2>
    <ul class="questions__list">
      <li class="questions__item" v-for="response in questions[0].responses" :key="response.id">
        <input type="checkbox" name="question" :value="response.response" @click="logChoice($event)"/>
        <label for="question">{{response.response}}</label>
      </li>
    </ul>
    <button class="questions__button" @click="loadNextQuestion()">Next</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          id: 1, 
          question: 'What brings you here today?',
          responses: [
            {id: 1, response: 'Reduce Anxiety'},
            {id: 2, response: 'Relieve Stress'},
            {id: 3, response: 'Improve Motivation'},
            {id: 4, response: 'Better Mood'},
            {id: 5, response: 'Increase Focus'},
          ]
        },

        {
          id: 2,
          question: 'How often do you get anxiety attacks?',
          responses: [
            {id: 1, response: 'Once a month'},
            {id: 2, response: 'Several times a month'},
            {id: 3, response: 'Once a week'},
            {id: 4, response: 'Several times a week'},
            {id: 5, response: 'Daily'},
            {id: 6, response: 'Several times a day'},
          ]
        },

        {
          id: 3,
          question: 'What would help you relax?',
          responses: [
            {id: 1, response: 'Video Games'},
            {id: 2, response: 'Meditation'},
            {id: 3, response: 'Music'},
            {id: 4, response: 'Walks/Exercise'},
            {id: 5, response: 'Reading'},
            {id: 6, response: 'Talking with other people'},
          ]
        },
      ],

      activeQuestion: null
    }
  },

  mounted() {
    this.activeQuestion = this.questions[0].question;

    document.querySelector(".navbar").classList.add("hide")
  },

  beforeRouteLeave(to, from, next) {
    document.querySelector(".navbar").classList.remove("hide")
    document.querySelector(".header").classList.remove("hide")
    next()
  },

  methods: {
    loadNextQuestion() {
      this.questions.shift();

      // clear out the checkboxes
      document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });

      if (this.questions.length > 0) {
        this.activeQuestion = this.questions[0].question;
      } 
      // else if the user has answered all questions, redirect to dashboard
      else {
        this.$router.push('/dashboard');
      }
    },

    logChoice(event) {
      console.log(event.target.value);
    }
  }
}
</script>

<style>

</style>