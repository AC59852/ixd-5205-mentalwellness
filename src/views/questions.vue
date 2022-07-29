<template>
  <h1>Questions</h1>
  <h2>{{activeQuestion}}</h2>
  <ul>
    <li v-for="response in questions[0].responses" :key="response.id">
      <input type="radio" name="question" :value="response.response" @click="logChoice($event)"/>
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
          {id: 1, response: 'Reduce anxiety'},
          {id: 2, response: 'Relieve Stress'},
        ]},

        {
          id: 2,
          question: 'How often do you get anxiety attacks?',
          responses: [
            {id: 1, response: 'Once a month'},
            {id: 2, response: 'Once a week'},
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
    },

    logChoice(event) {
      console.log(event.target.value);
      //localStorage.setItem('choice', event.target.value);
    }
  }
}
</script>

<style>

</style>