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

<style lang="scss">
  @import './scss/main.scss'
</style>