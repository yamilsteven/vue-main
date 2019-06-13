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
    song: {
      default() {
        return {}
      },
      type: Object
    }
  },
  methods: {
    removeSong() {
      this.$store.dispatch('removeSong', this.song.id);
    },
    likeSong: function(event) {
      if (event) {
        this.$store.dispatch('likeSong', this.song.id);
      }
    },
    dislikeSong: function(event) {
      if (event) {
        this.$store.dispatch('dislikeSong', this.song.id);
      }
    }
  }
});
</script>