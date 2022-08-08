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
  <!-- Emoji picker input. -->
    <!-- Code resource: https://www.youtube.com/watch?v=qpmSyUk31o8&ab_channel=EdwardLanceLorilla -->
    <!-- Code resource: https://edwardize.blogspot.com/2018/03/emoji-picker.html -->
  <emoji-picker @emoji="append"></emoji-picker>

  <div class="emoji-invoker" @click="toggle">
    <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
    </svg>
  </div>

  <div class="emoji-picker" v-if="display.visible" :style="{ top: display.y + 'px', left: display.x + 'px' }" v-click-outside="hide">
    <div class="emoji-picker__search">
      <input type="text" v-model="search" ref="search">
    </div>
    <div>
      <div v-for="(emojis, category) in this.searchedEmojis">
        <h5>{{ category }}</h5>
        <div class="emojis">
          <span
                v-for="(emoji, emojiName) in emojis"
                @click="insert(emoji)"
                :title="emojiName"
                >{{ emoji }}</span>
        </div>
      </div>
    </div>
  </div>

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

<!-- Emoji picker icons script. -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.15/vue.js"></script>
<script src="emoji.js"></script>

<style>

</style>