<template>
  <div class="home">
    <img width="300" alt="Spotify logo" src="../assets/spotifylogo.png">
    <Playlists/>
  </div>
</template>

<script>
// @ is an alias to /src
import Playlists from '@/components/Playlists.vue'

export default {
  name: 'home',
  components: {
    Playlists
  }
}
</script>
