<template>
  <div class="song-item">
    <div class="song-title">
        {{ song.title }} - {{ song.artist }}
    </div>
    <img class="thumb" @click="likeSong($event)" alt="logo" src="../assets/thumb.png">
    <img class="thumb thumb--down" @click="dislikeSong($event)" alt="logo" src="../assets/thumb.png">
    <div>
        Score: {{ song.score }}
    </div>
    <div class="remove-song" @click="removeSong()">
        &times;
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Song',

  props: {
    item: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      song: this.item,
    }
  },
  methods: {
    removeSong() {
      this.$emit('remove');
    },
    likeSong: function(event) {
      if (event) {
        this.song.score++;
        this.updateSong();
      }
    },
    dislikeSong: function(event) {
      if (this.song.score && event) {
        this.song.score--;
        this.updateSong();
      }
    },
    updateSong() {
      this.$emit('update');
    }
  }
});
</script>