<template>
<div>
  <app-header/>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    AppHeader
  }
}
</script>
