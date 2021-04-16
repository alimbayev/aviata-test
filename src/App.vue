<template>
  <div id="app">
    <Header />
    <Aviata/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Aviata from './components/Aviata.vue'

export default {
  name: 'App',
  components: {
    Aviata,
    Header
  },
  created() {
    document.title = "Aviata.kz"
  }
}
</script>

<style>
:root {
  font-family: Open Sans, Arial ,sans-serif;
  font-size: 100%;
}

body {
  background-color: #D7D7D7;
  min-height: 200vh;
}


</style>
