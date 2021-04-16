<template>
  <div class="results">
    <template v-if="flights.length">
      <ResultsItem v-for="flight in flights" :key="flight.id" :result="flight" />
    </template>  
    <div v-else>Мы нашли {{total}} варианта перелета, но ни один из вариантов не соответствует заданным фильтрам</div>

  </div>
</template>

<script>
import ResultsItem from './ResultsItem.vue';
export default {
  props: {
    flights: {
      type: Array,
      required: true
    }
  },
  components: {
    ResultsItem
  },
  data() {
    return {
      total: null
    }
  },
  created() {
    this.total = this.flights.length;
  }
}
</script>

<style>
.results{
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  width: 75%;
  margin-left: 1.25rem;
}

</style>