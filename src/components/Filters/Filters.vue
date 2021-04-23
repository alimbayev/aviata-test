<template>
  <div class="filters-box">
    <FiltersOption />
    <FiltersAirline/>
  </div>
</template>

<script>
import FiltersOption from './FiltersOption.vue'
import FiltersAirline from './FiltersAirline.vue'

export default {
  components: {
    FiltersOption,
    FiltersAirline
  },
}
</script>

<style>

</style>