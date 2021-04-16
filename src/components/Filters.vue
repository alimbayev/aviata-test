<template>
  <div class="filters-box">
    <FiltersOption  @change-filter="setOptionFilter"/>
    <FiltersAirline @change-filter="setAirlineFilter"/>
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
  methods: {
    setOptionFilter(updatedFilters) {
      this.$emit('option-filter', updatedFilters)
    },
    setAirlineFilter(newFilters) {
      this.$emit('airline-filter', newFilters)
    }
  }
}
</script>

<style>

.filters-box{
  width: 25%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  position: relative;
}

.filter {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-radius: 4px;
  background: #f5f5f5;
}

.filter__title {
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  margin: 0 12px 12px 12px;
}

.filter:not(:first-child) {
  margin-top: 0.5rem;
}

.clear-filters {
  background: url('../assets/icon-close-filter.svg') center center no-repeat;
  border: none;
  position: absolute;
  top: 12px;
  right: 0;
  margin-right: 12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.clear-filters:hover {
  background: url('../assets/icon-close-filter-hover.svg');
  transform: scale(1.2);
}

.tooltip {
  position: absolute;
  font-size: 12px;
  min-width: 120px;
  border-radius: 6px;
  box-sizing: border-box;
  top: 0;
  right: 0;
  transform: translate(40%, -115%);
  background: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0 , 10%);
  opacity: 0;
  padding: 10px;
}

.tooltip::after {
  content: "";
  display: block;
  position: absolute;
  bottom: -3px;
  background: #fff;
  left: calc(50% - 5px);
  width: 14px;
  height: 14px;
  transform: rotate(45deg);
}

.clear-filters:hover .tooltip {
  opacity: 1;
}

</style>