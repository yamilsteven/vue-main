<template>
    <div class="playlist">
        <h3>Number of Playlists: {{ idForPlaylist }}</h3>
        <input type="text" class="playlist-input" placeholder="New Playlist" v-model="newPlaylist" @keyup.enter="addPlaylist">
        <div v-for="(playlist, index) in sortedPlaylists" :key="playlist.id" class="playlist-item">
            <div class="playlist-title">
                {{ playlist.title }}
            </div>
            <img class="thumb" @click="likePlaylist($event, index)" alt="logo" src="../assets/thumb.png">
            <img class="thumb thumb--down" @click="dislikePlaylist($event, index)" alt="logo" src="../assets/thumb.png">
            <div>
                Score: {{ playlist.score }}
            </div>
            <div class="remove-playlist" @click="removePlaylist(index)">
                &times;
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Playlists',
    data () {
        return {
            newPlaylist: '',
            idForPlaylist: 4,
            playlists: [
                {
                    'id': 1,
                    'title': 'Playlist number one!',
                    'score': 15,
                },
                {
                    'id': 2,
                    'title': 'Rock Playlist!',
                    'score': 12,
                },
                {
                    'id': 3,
                    'title': 'Salsa Playlist!',
                    'score': 8,
                },
                {
                    'id': 4,
                    'title': 'Ballads Playlist!',
                    'score': 5,
                },
                {
                    'id': 5,
                    'title': 'Top 20 Playlist!',
                    'score': 25,
                },
            ]
        }
    },
    computed: {
        sortedPlaylists: function() {
        function compare(a, b) {
            if (a.score < b.score)
                return 1;
            if (a.score > b.score)
                return -1;
            return 0;
        }

        return this.playlists.sort(compare);
        }
    },
    methods: {
        addPlaylist() {
            if(this.newPlaylist.trim().lenght == 0) {
                return
            }

            this.playlists.push({
                id: this.idForPlaylist,
                title: this.newPlaylist,
                score: 0,
                completed: false,
            })

            this.newPlaylist = ''
            this.idForPlaylist++
        },
        removePlaylist(index) {
            this.playlists.splice(index, 1);
            this.idForPlaylist--
        },
        likePlaylist: function(event, index) {
            this.playlists[index].score++;
        },
        dislikePlaylist: function(event, index) {
            if (this.playlists[index].score) {
                this.playlists[index].score--;
            }
        }
    }
}
</script>

<style lang="scss">
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

  .playlist {
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

  .remove-playlist {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
</style>

