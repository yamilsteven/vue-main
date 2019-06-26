<template>
  <div class="song">
    <Form @create="createSong"/>
    <h3>{{ numberPlaceholder }}{{ totalSongs }}</h3>
  </div>
</template>

<script>
import axios from "axios";
import Form from "@/components/Form.vue";
import Song from "@/components/Song.vue";

export default {
  name: "Songs",
  components: { Form, Song },
  data() {
    return {
      endpoint: "https://my-json-server.typicode.com/kycrling/vue-main/songs",
      numberPlaceholder: "Number of Songs - ",
      songs: []
    };
  },
  created() {
    this.getSongs();
  },
  computed: {
    sortedSongs: function() {
      return this.songs.sort((a, b) => b.score - a.score);
    },
    totalSongs: function() {
      return this.songs.length;
    }
  },
  methods: {
    getSongs() {
      //localStorage.removeItem('songs');
      if (localStorage.getItem("songs")) {
        this.songs = JSON.parse(localStorage.getItem("songs"));
      } else {
        axios.get(this.endpoint).then(response => {
          this.songs = response.data;
        });
      }
    },
    removeSong(index, song) {
      this.songs.splice(index, 1);
      this.updateSongs();
    },
    updateSong(index, song) {
      this.songs[index] = song;
      this.updateSongs();
    },
    createSong(song) {
      this.songs.push(song);
      this.updateSongs();
    },
    updateSongs() {
      localStorage.setItem("songs", JSON.stringify(this.songs));
    }
  }
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

.song {
  max-width: 1000px;
  margin: 0 auto;

  &-title {
    text-align: left;
    width: 200px;
  }

  &-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }

  &-item {
    -moz-box-shadow: 0px 3px 6px -1px rgba(0, 0, 0, 0.4);
    -webkit-box-shadow: 0px 3px 6px -1px rgba(0, 0, 0, 0.4);
    align-items: center;
    animation-duration: 0.3s;
    box-shadow: 0px 3px 6px -1px rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 0 10px;

    &:first-child() {
      background: #1cd760;
      color: #fff;
      font-weight: bold;
    }

    .thumb {
      cursor: pointer;
      width: 50px;

      img {
        width: 100%;
      }

      &--down {
        transform: rotate(180deg);
      }
    }
  }

  &-item:first-child {
    background: #1cd760;
    color: #fff;
    font-weight: bold;
  }
}

.remove-song {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}
</style>
