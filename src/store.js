import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import results from './assets/results.json'

const store = new Vuex.Store({
    state: {
        searchResults: results,
        totalFlights: results.flights.length,
        optionFilters: {
            isDirect: false,
            isLuggage: false,
            isRefundable: false
          },
        airlineFilters: {},
    },
    getters: {
        getSearchResults:  state => state.searchResults,
        getOptionFilters:  state => state.optionFilters,
        getAirlineFilters: state => state.airlineFilters,
        getTotalFlights:   state => state.totalFlights 
    },
    mutations: {
        setOptionFilters: (state,payload) => {
            state.optionFilters = payload;
        },
        setAirlineFilters: (state, payload) => {
            state.airlineFilters = payload;
        }
    },
    actions: {
        changeOptionFilters: ({commit}, payload) => {
            commit('setOptionFilters', payload);
        },
        changeAirlineFilters: ({commit}, payload) => {
            commit('setAirlineFilters', payload);
        }
    }
})

export default store;