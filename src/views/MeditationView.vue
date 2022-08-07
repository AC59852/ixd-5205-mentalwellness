<template>
  <section class="music">
    <div class="dashboard__audio" v-for="genre in genreSongs" :key="genre.title">
      <h2>{{genre.title}}</h2>
      <div class="card__list card__list--meditation">
        <AudioCard class="dashboard__card" @click="loadPlayer(card), setPlaylist(card)" v-for="card in genre.songs" :key="card.id" :card="card"/>
      </div>
    </div>
    <transition name="slide">
      <PlayerComponent @close="closePlayer()" v-if="selectedSong && selectedPlaylist" :selectedSong="selectedSong" :selectedPlaylist="selectedPlaylist" />
    </transition>
  </section>
</template>

<script>
import AudioCard from '@/components/AudioCard.vue';
import PlayerComponent from '@/components/PlayerComponent.vue';

export default {
  data() {
    return {
      jsonData: "https://api.npoint.io/48294827906cea5bfb5e",
      songs: [],
      genres: [],
      uniqueGenres: [],
      genreSongs: [],
      selectedPlaylist: null,
      selectedSong: null,
    }
  },

  created() {
    // fetch jsonData
    fetch(this.jsonData)
      .then(response => response.json())
      .then(json => {
        json.Music.forEach(song => {
          this.songs.push(song);
          if (song.genre === "Meditation") {
            this.genres.push(song.genre);
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

    closePlayer() {
      this.selectedSong = null;
      this.selectedPlaylist = null;
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
    },
  },

  components: {
    AudioCard: AudioCard,
    PlayerComponent
  }
}
</script>

<style>

</style>