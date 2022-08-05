<template>
  <section class="player">
      <span @click="close()">X</span>
      <div class="player__info">
        <img :src="currentSong.coverPhoto" :alt="`Cover Photo for the Song: ${currentSong.title}, By ${selectedSong.artist}`">
        <div class="info__text">
          <h3>{{currentSong.title}}</h3>
          <span>{{currentSong.artist}}</span>
        </div>
      </div>
      <div class="player__song">
        <!-- selectedSong.songLink auto play -->
        <div class="player__wrapper">
          <div class="player__time">
            <span>{{currentTime}}</span>
            <span>{{songLength}}</span>
          </div>
          <div class="player__progress">
            <progress :value="currentTimeRaw" :max="songLengthRaw" @click="getClickedPosition($event)"></progress>
          </div>
        </div>
        <audio @timeupdate="updateCurrent()" :src="currentSong.songLink" type="audio/mpeg"></audio>
      </div>
      <div class="player__controls">
        <button class="player__button player__button--shuffle" @click="shufflePlaylist()">
          <font-awesome-icon icon="fa-solid fa-shuffle"></font-awesome-icon>
        </button>
        <button class="player__button player__button--back" @click="previousSong()">
          <font-awesome-icon icon="fa-solid fa-backward-step" />
        </button>
        <button class="player__button player__button--play" @click="toggleSong()">
          <font-awesome-icon v-if="songPlaying" icon="fa-solid fa-pause" />
          <font-awesome-icon v-else icon="fa-solid fa-play" />
        </button>
        <button class="player__button player__button--skip" @click="nextSong()">
          <font-awesome-icon icon="fa-solid fa-forward-step" />
        </button>
        <button class="player__button player__button--repeat">
          <font-awesome-icon icon="fa-solid fa-repeat" />
        </button>
      </div>
  </section>
</template>

<script>
export default {
  props: ['selectedSong', 'selectedPlaylist'],

  data() {
    return {
      songPlaying: false,
      currentTimeRaw: 0,
      currentTime: 0,
      songLengthRaw: 0,
      songLength: 0,
      currentSong: this.selectedSong,
      currentPlaylist: this.selectedPlaylist
    }
  },

  mounted() {
    // get the audio length
    this.setAudio()

    console.log(this.selectedPlaylist)
  },

  methods: {
    close() {
      this.$emit('close')
    },

    toggleSong() {
      this.songPlaying = !this.songPlaying;
      // toggle the audio
      const audio = document.querySelector('audio');
      if (this.songPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    },

    updateCurrent() {
      const audio = document.querySelector('audio');
      this.currentTimeRaw = audio.currentTime;
      // format audio.currentTime to minutes:seconds
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      this.currentTime = `${minutes}:${seconds}`;

      // update the progress bar
      const progress = document.querySelector('progress');
      progress.value = audio.currentTime;
    },

    getClickedPosition(event) {
      const audio = document.querySelector('audio');
      const progress = document.querySelector('progress');
      const clickedPosition = event.offsetX / progress.offsetWidth;
      audio.currentTime = clickedPosition * audio.duration;
    },

    shufflePlaylist() {
      if(this.currentPlaylist != null) {
        // shuffle the playlist where the current song is always the first song in the playlist
        const currentSongIndex = this.currentPlaylist.findIndex(song => song.id === this.currentSong.id);

        // create a new array with the current song at the beginning
        const newPlaylist = [this.currentSong];

        // shuffle the rest of the playlist
        const shuffledPlaylist = this.currentPlaylist.slice(0, currentSongIndex).concat(this.currentPlaylist.slice(currentSongIndex + 1));

        // shuffle the shuffled playlist
        for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
        }

        console.log(shuffledPlaylist)

        // add the rest of the playlist to the new playlist
        for (let i = 0; i < shuffledPlaylist.length; i++) {
          newPlaylist.push(shuffledPlaylist[i]);
        }

        // set the new playlist
        this.currentPlaylist = newPlaylist;

        console.log(this.currentPlaylist)
        } else {
          console.log('No playlist selected')
          return
        }

    },

    previousSong() {
      // get the current song index based on the selected song id
      let previousButton = document.querySelector('.player__button--back');
      if(this.currentPlaylist != null) {
        const currentSongIndex = this.currentPlaylist.findIndex(song => song.id === this.currentSong.id);

        // get the previous song index
        const previousSongIndex = currentSongIndex - 1;

        const previousSong = this.currentPlaylist[previousSongIndex];

        console.log(previousSongIndex)

        // if the current song is the first song in the playlist, return
        if (previousSongIndex === -1) {
          // gray out the previous button
          previousButton.style.opacity = 0.5;
          return
        }

        this.currentSong = previousSong;
        this.currenTimeRaw = 0;
        this.currentTime = '0:00';

        this.songPlaying = true;
        this.setAudio()
        } else {
          previousButton.style.opacity = 0.5;
          return
        }
    },

    nextSong() {
      let nextButton = document.querySelector('.player__button--skip');
      if(this.currentPlaylist != null) {
        // get the current song index based on the selected song id
        const currentSongIndex = this.currentPlaylist.findIndex(song => song.id === this.currentSong.id);

        const previousButton = document.querySelector('.player__button--back');
        previousButton.style.opacity = 1;

        console.log(currentSongIndex)

        // get the next song index
        const nextSongIndex = currentSongIndex + 1;

        console.log(nextSongIndex)

        // get the next song
        const nextSong = this.currentPlaylist[nextSongIndex];

        if (nextSongIndex > this.currentPlaylist.length - 1) {
          // gray out the next button
          nextButton.style.opacity = 0.5;
          return
        }

        // set the new current song
        this.currentSong = nextSong;
        // set the new current time
        this.currentTimeRaw = 0;
        // set the new current time
        this.currentTime = `0:00`;

        this.songPlaying = true;

        this.setAudio()
      } else {
        nextButton.style.opacity = 0.5;
        return
      }
    },

    setAudio() {
      const audio = document.querySelector('audio');
      audio.addEventListener('loadedmetadata', () => {
        this.songLengthRaw = audio.duration;
        // format audio.duration to minutes:seconds
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60);
        this.songLength = `${minutes}:${seconds}`;

        this.songPlaying = true;
        audio.play()
      });
    }
  },
}
</script>

<style>
</style>