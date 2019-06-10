<template>
  <div class="home">
    <img width="300" alt="Spotify logo" src="../assets/spotifylogo.png">
    <Songs/>
  </div>
</template>

<script>
// @ is an alias to /src
import Songs from '@/components/Songs.vue'

export default {
  name: 'home',
  components: {
    Songs
  }
}
</script>
