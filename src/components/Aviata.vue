<template>
    <div class="container">
        <Filters />
        <Results :flights="filteredFlights"/>
    </div>
</template>

<script>
import Filters from "./Filters/Filters.vue";
import Results from "./Result/Results.vue";
import results from '../assets/results.json'

export default {
  name: "AviataSearch",
  components: {
    Filters,
    Results,
  },
  data() {
      return {
          airlines: results.airlines,
          carriers: [...new Set(results.flights.map(elem => elem.itineraries[0][0].carrier_name))].sort(),
      }
  },
  provide() {
    return {
      carriers: this.carriers,
      airlines: this.airlines,
    }
  },
  created() {
  },
  computed: {
    filteredFlights() {
      const airlineFilters = this.$store.getters.getAirlineFilters;
      const optionFilters = this.$store.getters.getOptionFilters;
      let flights = this.$store.getters.getSearchResults.flights;

      if (optionFilters.isDirect) {
        flights = flights.filter(elem => elem.itineraries[0][0].stops === 0);
      }
      if (optionFilters.isLuggage) {
        flights = flights.filter(elem => !elem.services['0PC']);
      }
      if (optionFilters.isRefundable) {
        flights = flights.filter(elem => elem.refundable === true)
      }

      Object.keys(airlineFilters).forEach( filter => {
        let isActive = airlineFilters[filter];
        if (!isActive) {
          flights = flights.filter(elem => {
            const iata = elem.itineraries[0][0].segments[0].carrier;
            return iata !== filter;
          })
        }
      })
    
      return flights
    }
  }
};
</script>

<style>

</style>