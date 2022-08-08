<template>
  <h1>Questions</h1>
  <h2>{{activeQuestion}}</h2>
  <ul>
    <li v-for="response in questions[0].responses" :key="response.id">
      <input type="checkbox" name="question" :value="response.response" @click="logChoice($event)"/>
      <label for="question">{{response.response}}</label>
    </li>
  </ul>
  <button @click="loadNextQuestion()"></button>
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
            {id: 1, response: 'Mood Improvement'},
            {id: 2, response: 'Stress Relief'},
            {id: 3, response: 'Improve Motivation'},
            {id: 4, response: 'Improve focus'},
            {id: 5, response: 'Reduce Anxiety'},
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
            {id: 1, response: 'Music'},
            {id: 2, response: 'Relaxing sounds'},
            {id: 3, response: 'Reading articles on mental wellness and mental health'},
            {id: 4, response: 'Talking with others like you'},
            {id: 5, response: 'Talking to a mental health coach'},
            {id: 6, response: 'Talking to a mental health professional'},
          ]
        },
      ],

      activeQuestion: null
    }
  },

  mounted() {
    this.activeQuestion = this.questions[0].question;
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