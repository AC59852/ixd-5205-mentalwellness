<template>
  <h1>Check-in</h1>
  <h2>{{activeMood}}</h2>
  <ul>
    <li v-for="response in moods[0].responses" :key="response.id">
      <input type="radio" name="mood" :value="response.response" @click="logChoice($event)"/>
      <label for="mood">{{response.response}}</label>
    </li>
  </ul>
  <button @click="loadNextMood()"></button>

  <!-- Text field 'journal' -->
  <!-- *** Fix: Implement "This might help you" suggestion popup before routing to dashboard or music player. *** -->
  <form action="/dashboard" id="checkinForm">
    <fieldset>
      <legend>Would you like to write a few words about this?</legend>
        <textarea name="checkin" form="checkinForm">Enter text here...</textarea>
    </fieldset>
  </form>
</template>

<script>
export default {
  data() {
    return {
      moods: [
        {
          id: 1, 
          question: 'I am feeling...',
          responses: [
            {id: 1, response: 'Sad'},
            {id: 2, response: 'Depressed'},
            {id: 3, response: 'Stressed'},
            {id: 4, response: 'Confused'},
            {id: 5, response: 'Relaxed'},
            {id: 6, response: 'Happy'},
          ]
        },

        {
          id: 2,
          question: 'Any specific reason you would like to share?',
          responses: [
            {id: 1, response: 'Work'},
            {id: 2, response: 'Relationship'},
            {id: 3, response: 'Family'},
            {id: 4, response: 'Friends'},
            {id: 5, response: 'Education'},
            {id: 6, response: 'Health'},
            {id: 7, response: 'Situation'},
            {id: 8, response: 'Other'},
          ]
        },
      ],

      activeMood: null
    }
  },

  mounted() {
    this.activeMood = this.moods[0].mood;
  },

  methods: {
    loadNextMood() {
      this.moods.shift();
    },

    logChoice(event) {
      console.log(event.target.value);
    }
  }
}
</script>

<style>

</style>