<template>
  <div class="fields">
    <input 
      type="text" 
      class="song-input" 
      :placeholder="songPlaceholder" 
      v-model="newSong" 
      @keyup.enter="addSong">
    <input 
      type="text" 
      class="song-input" 
      :placeholder="artistPlaceholder" 
      v-model="newArtist" 
      @keyup.enter="addSong">
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Form',
  data() {
    return {
      songPlaceholder: 'New Song',
      artistPlaceholder: 'New Artist',
      newSong: '',
      newArtist: ''
    }
  },
  methods: {
    addSong() {
      if(!this.newSong.trim().length || !this.newArtist.trim().length) {
          return;
      }

      const newSongObj = {
          id: new Date().getTime(),
          title: this.newSong,
          artist: this.newArtist,
          score: 0
      };
      
      this.$store.dispatch('addSong', newSongObj);
    },
  }
});
</script>