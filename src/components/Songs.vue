<template>
    <div class="song">
        <h3>{{ numberPlaceholder }}: {{ totalSongs }}</h3>
        <input type="text" class="song-input" :placeholder="songPlaceholder" v-model="newSong" @keyup.enter="addSong">
        <input type="text" class="song-input" :placeholder="artistPlaceholder" v-model="newArtist" @keyup.enter="addSong">
        <div v-for="(song, index) in sortedSongs" :key="song.id" class="song-item">
            <div class="song-title">
                {{ song.title }} - {{ song.artist }}
            </div>
            <img class="thumb" @click="likeSong($event, index)" alt="logo" src="../assets/thumb.png">
            <img class="thumb thumb--down" @click="dislikeSong($event, index)" alt="logo" src="../assets/thumb.png">
            <div>
                Score: {{ song.score }}
            </div>
            <div class="remove-song" @click="removeSong(index)">
                &times;
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Songs',
    data () {
        return {
            endpoint: "my-json-server.typicode.com/yamilsteven/vue-main/blob/2-styled-component/songs",
            numberPlaceholder: 'Number of Songs',
            newSong: '',
            newArtist: '',
            totalSongs: 0,
            songs: [],
            songPlaceholder: 'New Song',
            artistPlaceholder: 'New Artist'
        }
    },
    created () {
        this.getSongs();
    },
    computed: {
        sortedSongs: function() {
            function compare(a, b) {
                return b.score - a.score;
            }

            return this.songs.sort((a, b) => b.score - a.score);
        }
    },
    methods: {
        addSong() {
            if(!this.newSong.trim().length || !this.newArtist.trim().length) {
                return
            }

            const newSong = {
                id: this.totalSongs,
                title: this.newSong,
                artist: this.newArtist,
                score: 0
            }
            
            axios.put(this.endpoint, newSong)
            .then(response => {
                this.getSongs();
                this.newSong = '';
                this.newArtist = '';
            });
        },
        removeSong(index) {
            const url = `${this.endpoint}/${index}`
            axios.delete(url)
            .then(response => {
                this.getSongs();
            });
        },
        likeSong: function(event, index) {
            this.songs[index].score++;
            this.updateSong(index);
        },
        dislikeSong: function(event, index) {
            if (this.songs[index].score) {
                this.songs[index].score--;
                this.updateSong(index);
            }
        },
        updateSong(index) {
            const url = `${this.endpoint}/${index}`
            axios.patch(url, this.songs[index])
            .then(response => {
                this.getSongs();
            });
        },
        getSongs() {
            axios.get(this.endpoint)
            .then(response => {
                this.songs = response.data.songs;
                this.totalSongs = this.songs.length;
            });
        }
    }
}
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
        -moz-box-shadow: 0px 3px 6px -1px rgba(0,0,0,0.4);
        -webkit-box-shadow: 0px 3px 6px -1px rgba(0,0,0,0.4);
        align-items: center;
        animation-duration: 0.3s;
        box-shadow: 0px 3px 6px -1px rgba(0,0,0,0.4);
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
