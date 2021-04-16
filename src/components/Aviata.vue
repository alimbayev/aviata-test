<template>
    <div class="container">
        <Filters @option-filter ="setOptionFilter"
                 @airline-filter="setAirlineFilter"/>
        <Results :flights="filteredFlights"/>
    </div>
</template>

<script>
import Filters from "./Filters.vue";
import Results from "./Results.vue";
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
          optionFilters: {
            isDirect: false,
            isLuggage: false,
            isRefundable: false
          },
          airlineFilters: {
            "DV": true,
            "KC": true
          }
      }
  },
  provide() {
    return {
      carriers: this.carriers,
      airlines: this.airlines,
    }
  },
  computed: {
    filteredFlights() {
      let flights = results.flights;
      if (this.optionFilters.isDirect) {
        flights = flights.filter(elem => elem.itineraries[0][0].stops === 0);
      }
      if (this.optionFilters.isLuggage) {
        flights = flights.filter(elem => !elem.services['0PC']);
      }
      if (this.optionFilters.isRefundable) {
        flights = flights.filter(elem => elem.refundable === true)
      }

      Object.keys(this.airlineFilters).forEach( filter => {
        let isActive = this.airlineFilters[filter];
        if (!isActive) {
          flights = flights.filter(elem => {
            const iata = elem.itineraries[0][0].segments[0].carrier;
            return iata !== filter;
          })
        }
      })
    
      return flights
    }
  },
  methods: {
    setOptionFilter(updatedFilters) {
      this.optionFilters = updatedFilters
    },
    setAirlineFilter(updatedFilters) {
      this.airlineFilters = updatedFilters;
    }
  },
};
</script>

<style>
.container {
  display: flex;
  width: 85%;
  margin: 1rem auto;
}
</style>