<template>
  <!-- div @click emit showAudioPlayer -->
  <div class="audio-card">
    <div class="audio-card__img">
      <img :src="card.image" :alt="'Cover Photo for the Song: ' + card.title + ', By: ' + card.artist">
      <button class="audio-card__btn" >+</button>
    </div>
    <div class="audio-card__text">
      <h3>{{card.title}}</h3>
      <span>{{card.artist}}</span>
    </div>
  </div>
</template>

<script>
export default {
props: ['card'],

}
</script>

<style>

</style>