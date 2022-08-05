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
    <section v-for="genre in genreSongs" :key="genre.title" class="dashboard__list dashboard__list--music">
      <h2>{{genre.title}}</h2>
      <AudioCard @click="loadPlayer(card), setPlaylist(card)" v-for="card in genre.songs" :key="card.id" :card="card"/>
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
      songs: [],
      genres: [],
      uniqueGenres: [],
      genreSongs: [],
    }
  },

  created() {
    fetch(this.jsonData)
      .then(response => response.json())
      .then(json => {
        json.Music.forEach(song => {
          this.songs.push(song);
          if (song.genre) {
            this.genres.push(song.genre);
          } else {
            this.genres.push("Other");
          }
        });

        // create an array with each genre and put the WHOLE song into it
        this.uniqueGenres = this.genres.filter((item, index) => this.genres.indexOf(item) === index);

        // seperate the songs into genres and set title as the genre
        this.uniqueGenres.forEach(genre => {
          this.genreSongs.push({
            title: genre,
            songs: this.songs.filter(song => song === genre)
          });
        });

        // put the songs into their genres
        this.genreSongs.forEach(genre => {
          this.songs.forEach(song => {
            // if a song doesn't have a genre, set the genre to "Other"
            if (song.genre === undefined) {
              song.genre = "Other";
            }
            
            if (genre.title === song.genre) {
              genre.songs.push(song);
            }
          });
        });

        console.log(this.genreSongs)
      })
      .catch(error => console.log(error));
  },

  methods: {
    loadPlayer(card) {
      this.selectedSong = card;
    },

    setPlaylist(card) {
      console.log(card.genre);
      // capitalize card.type
      let genre = card.genre.charAt(0).toUpperCase() + card.genre.slice(1);

      // get all songs of the genre
      let songs = this.songs.filter(song => song.genre === genre);

      console.log(songs)

      // set the playlist
      this.selectedPlaylist = songs;
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