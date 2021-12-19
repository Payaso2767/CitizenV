<template>
  <div id="app">
    <router-link
      v-if="authenticated" to="/" v-on:click="logout()" replace>LogOut</router-link
    >
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      authenticated: false
    }
  },
  mounted () {
    if (this.authenticated) {
      this.$router.push('/about')
    }
  },
  methods: {
    setAuthenticated (status) {
      this.authenticated = status
    },
    logout () {
      this.authenticated = false
    }
  }
}
</script>

<style>
  @import'~bootstrap/dist/css/bootstrap.css';
  ::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-thumb {
  --webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  border-radius: 10px;
  background-color: #007bff;
}
::-webkit-scrollbar-track {
  --webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  --radius: 10px;
  background-color: #F5F5F5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 1200px;
  margin: auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
