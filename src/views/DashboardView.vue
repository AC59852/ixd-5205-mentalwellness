<template>
  <section class="dashboard">
    <!-- start of checkin -->
    <div class="checkin">
      <h2>Daily Check-In</h2>
      <div class="checkin__card">
        <div class="card__text">
          <h3>Hello {{user}},</h3>
          <span>How are you feeling today?</span>
        </div>
        <div class="card__btns">
          <button class="card__btn card__btn--skip" @click="hideCheckin()">Skip</button>
          <button class="card__btn card__btn--checkin">Check-in</button>
        </div>
      </div>
    </div>
    <!-- end of checkin -->
    <section class="dashboard__audio">
      <h2>Recommended Music</h2>
      <div class="card__list">
        <AudioCard class="dashboard__card" v-for="song in recommendedSongs" :key="song" :card="song" @showAudioPlayer="loadPlayer(song)"/>
      </div>
    </section>
    <section v-for="genre in genreSongs" :key="genre.title" class="dashboard__audio">
      <h2>{{genre.title}}</h2>
      <div class="card__list">
        <AudioCard class="dashboard__card" @showAudioPlayer="loadPlayer(card), setPlaylist(card)" v-for="card in genre.songs" :key="card.id" :card="card"/>
      </div>
    </section>
    <section class="dashboard__audio">
      <h2>Meditation</h2>
      <div class="card__list">
        <AudioCard @showAudioPlayer="loadPlayer(card), setPlaylist(card)" v-for="card in MeditationCards" :key="card.id" :card="card" />
      </div>
    </section>
    <transition name="slide">
      <PlayerComponent @close="closePlayer()" v-if="selectedSong" :selectedSong="selectedSong" :selectedPlaylist="selectedPlaylist" />
    </transition>
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
      MeditationCards: null,
      selectedPlaylist: null,
      selectedSong: null,
      songs: [],
      genres: [],
      uniqueGenres: [],
      genreSongs: [],
      recommendedSongs: [],
    }
  },

  created() {
    fetch(this.jsonData)
      .then(response => response.json())
      .then(json => {
        this.MeditationCards = json.Meditation;
        json.Music.forEach(song => {
          this.songs.push(song);
          if (song.genre) {
            this.genres.push(song.genre);
          } else {
            this.genres.push("Other");
          }
        });

        // get 10 random songs in the songs array and put them in the recommendedSongs array with no duplicates
        for (let i = 0; i < 6; i++) {
          let randomSong = this.songs[Math.floor(Math.random() * this.songs.length)];
          if (this.recommendedSongs.includes(randomSong)) {
            i--;
          } else {
            this.recommendedSongs.push(randomSong);
          }
        }

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

              // cap the number of songs in each genre to 5
              if (genre.songs.length > 5) {
                genre.songs.pop();
              }
            }
          });
        });
      })
      .catch(error => console.log(error));
  },

  methods: {

    hideCheckin() {
      document.querySelector(".checkin").style.display = "none";
    },

    loadPlayer(card) {
      this.selectedSong = card;
    },

    setPlaylist(card) {
      // capitalize card.type
      let genre = card.genre.charAt(0).toUpperCase() + card.genre.slice(1);

      // look in genreSongs for the genre and set the playlist to that genre's songs
      this.genreSongs.forEach(songs => {
        if (genre === songs.title) {
          this.selectedPlaylist = songs.songs;
        }
      });
    },

    closePlayer() {
      this.selectedSong = null;
      this.selectedPlaylist = null;
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