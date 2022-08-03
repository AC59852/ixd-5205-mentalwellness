<template>
  <section class="dashboard">
    <!-- start of checkin -->
    <div class="checkin">
      <h2>Daily Check-In</h2>
      <div class="checkin__card">
        <div class="card__text">
          <h3>Hello, {{user}}</h3>
          <span>How are you feeling today?</span>
        </div>
        <div class="card__btns">
          <button class="card__btn card__btn--skip">Skip</button>
          <button class="card__btn card__btn--checkin">Check-in</button>
        </div>
      </div>
    </div>
    <!-- end of checkin -->
    <section class="dashboard__list dashboard__list--music">
      <AudioCard @click="loadPlayer(card), setPlaylist(card)" v-for="card in MusicCards" :key="card.id" :card="card"/>
    </section>
    <section class="dashboard__list dashboard__list--music">
      <AudioCard @click="loadPlayer(card), setPlaylist()" v-for="card in MeditationCards" :key="card.id" :card="card" />
    </section>
    <PlayerComponent v-if="selectedSong && selectedPlaylist" :selectedSong="selectedSong" :selectedPlaylist="selectedPlaylist" />
  </section>
</template>

<script>
import AudioCard from '@/components/AudioCard.vue';
import PlayerComponent from '../components/PlayerComponent.vue';
export default {
  data() {
    return {
      jsonData: "https://api.npoint.io/48294827906cea5bfb5e",
      user: "Austin",
      MusicCards: null,
      MeditationCards: null,
      selectedPlaylist: null,
      selectedSong: null,
    }
  },

  created() {
    // fetch jsonData
    fetch(this.jsonData)
      .then(response => response.json())
      .then(json => {
        this.MusicCards = json.Music;
        this.MeditationCards = json.Meditation;
      })
      .catch(error => console.log(error));
  },

  methods: {
    loadPlayer(card) {
      this.selectedSong = card;
    },

    setPlaylist(card) {
      console.log(card.type);
      // capitalize card.type
      let type = card.type.charAt(0).toUpperCase() + card.type.slice(1);

      fetch(`${this.jsonData}/${type}`)
        .then(response => response.json())
        .then(json => {
          this.selectedPlaylist = json;
          console.log(this.selectedPlaylist);
        })
        .catch(error => console.log(error));
    }

  },

  components: {
    AudioCard: AudioCard,
    PlayerComponent
}
}
</script>

<style>

</style>