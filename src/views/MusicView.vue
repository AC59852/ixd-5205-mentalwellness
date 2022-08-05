<template>
  <section class="music">
    <div v-for="genre in genreSongs" :key="genre.title">
      <h2>{{genre.title}}</h2>
    </div>
  </section>
</template>

<script>
// import AudioCard from '@components/AudioCard.vue';
export default {
  data() {
    return {
      jsonData: "https://api.npoint.io/48294827906cea5bfb5e",
      songs: [],
      genres: [],
      uniqueGenres: [],
      genreSongs: [],
    }
  },

  created() {
    // fetch jsonData
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
  }
</script>

<style>

</style>