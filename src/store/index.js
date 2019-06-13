import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const ENDPOINT = "http://my-json-server.typicode.com/kycrling/vue-main/songs";

export default new Vuex.Store({
  state: {
    songs: []
  },
  getters: {
    sortedSongs: state => {
      return state.songs.sort((a, b) => b.score - a.score);
    },
    totalSongs: state => {
      return state.songs.length;
    } 
  },
  mutations: {
    'SET_SONGS' (state, songs) {
      state.songs = songs;
    },
    'LIKE_SONG' (state, songId) {
      state.songs.find(song => song.id === songId).score++;
    },
    'DISLIKE_SONG' (state, songId) {
      const song = state.songs.find(song => song.id === songId);
      if(song.score > 0) {
        song.score--;
      }
    },
    'ADD_SONG' (state, song) {
      state.songs.push(song);
    },
    'REMOVE_SONG' (state, songId) {
      const songIndex = state.songs.findIndex(song => song.id === songId);
      if (songIndex !== -1) {
        state.songs.splice(songIndex, 1);
      }
    },
    'UPDATE_SONG' (state, index, song) {
      state.songs[index] = song;
    }
  },
  actions: {
    addSong ({ commit, dispatch }, newSong) {
      commit('ADD_SONG', newSong);
      dispatch('saveSongs');
    },

    removeSong ({ commit, dispatch }, songId) {
      commit('REMOVE_SONG', songId);
      dispatch('saveSongs');
    },

    likeSong: function ({ commit, dispatch }, songId) {
      commit('LIKE_SONG', songId);
      dispatch('saveSongs');
    },

    dislikeSong: function ({ commit, dispatch }, songId) {
      commit('DISLIKE_SONG', songId);
      dispatch('saveSongs');
    },

    getSongs ({commit}) {
      if (localStorage.getItem('songs')) {
        commit('SET_SONGS', JSON.parse(localStorage.getItem('songs')));
      } else {
        axios.get(ENDPOINT).then(response => {
          commit('SET_SONGS', response.data);
        })
      }
    },
    saveSongs ({ state }) {
      localStorage.setItem('songs', JSON.stringify(state.songs));
    }
  }
})
