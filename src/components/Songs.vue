<template>
  <div class="song">
    <Form />
    <h3>{{ numberPlaceholder }}{{ totalSongs }}</h3>
    <Song
      v-for="song in sortedSongs"
      :key="song.id"
      :song="song"
    />
  </div>
</template>

<script>
import Form from "@/components/Form.vue";
import Song from "@/components/Song.vue";

export default {
  name: "Songs",
  components: { Form, Song },

  data() {
    return {
      numberPlaceholder: "Number of Songs - "
    };
  },

  created() {
    this.$store.dispatch("getSongs");
  },

  computed: {
    sortedSongs() {
      return this.$store.getters.sortedSongs;
    },
    totalSongs() {
      return this.$store.getters.totalSongs;
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
