<template>
  <div class="emojis">
    <h2 class="checkin__title">I am feeling...</h2>
    <ul class="checkin__wrapper">
      <li v-for="emoji in emojis" :data-id="emoji.id" @click="setEmoji(emoji)" :key="emoji.id">
      <div>{{emoji.icon}}</div>
      <h3>{{emoji.title}}</h3>
      </li>
    </ul>
  </div>
  <div class="reasons" v-if="activeEmoji">
    <h2 class="checkin__title">Any specific reason you would like to share?</h2>
    <ul class="checkin__wrapper">
      <li v-for="reason in reasons" :key="reason.id">{{reason.response}}</li>
    </ul>
  </div>
  <form action="/dashboard" id="checkinForm" v-if="activeEmoji">
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
      emojis: [
            {id: 1, title: 'Sad', icon: '😔'},
            {id: 2, title: 'Stressed', icon: '😓'},
            {id: 3, title: 'Confused', icon: '😵'},
            {id: 4, title: 'Relaxed', icon: '😎'},
            {id: 5, title: 'Happy', icon: '😃'},
      ],

      reasons: [
            {id: 1, response: 'Work'},
            {id: 2, response: 'Relationship'},
            {id: 3, response: 'Family'},
            {id: 4, response: 'Friends'},
            {id: 5, response: 'Education'},
            {id: 6, response: 'Health'},
            {id: 7, response: 'Situation'},
            {id: 8, response: 'Other'},
      ],

      activeEmoji: null
    }
  },

  mounted() {
  },

  methods: {
    setEmoji(emoji) {
      this.activeEmoji = emoji;

      // hide all other emojis except the one that was clicked
      this.emojis.forEach(emoji => {
        if (emoji.id !== this.activeEmoji.id) {
          // display none
          document.querySelector(`[data-id="${emoji.id}"]`).style.display = 'none';
        }
      });

      console.log(this.activeEmoji);
    }
  }
}
</script>
<style>

</style>