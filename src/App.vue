<template>
  <div id="app">
    <Members v-bind:members="members" />
  </div>
</template>

<script>

import Members from './components/Members';
import axios from 'axios';

export default {
  name: "app",
  components: {
    Members
  },
  data () {
    return {
      members: []
    }
  },
  created() {
    axios.get('https://api.myjson.com/bins/ldu3a')
    .then(res => this.members = res.data)
    .catch(err => console.log('Error: ', err));
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
