<template>
  <div class="filter" ref="filters">
      <button v-if="isChecked" class="clear-filters" @click="resetCheck()">
        <div class="tooltip">Сбросить выбор</div>
      </button>
      <h3 class="filter__title">
        Опции тарифа
      </h3>
      <FiltersItem text="Только прямые"     value="isDirect"   @handleCheck="handleCheck"/>
      <FiltersItem text="Только с багажом"  value="isLuggage"  @handleCheck="handleCheck"/>
      <FiltersItem text="Только возвратные" value="isRefundable" @handleCheck="handleCheck"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
      filters: this.$store.getters.getOptionFilters
    }
  },
  
  methods: {
   getCheckboxes() {
     const checkboxes = [...this.$refs.filters.children]
                        .filter(elem => elem.className === 'filter__item');
     return checkboxes
   },
   handleCheck(target) {
      const checkboxes = this.getCheckboxes()
      const isChecked = checkboxes.some(elem => elem.firstChild.checked === true);
      const updatedFilters = {
        ...this.filters,
        [target.value]: target.checked
      }

      isChecked ? this.isChecked = true : this.isChecked = false;
      this.filters = updatedFilters
      this.$store.dispatch('changeOptionFilters', updatedFilters);
    },

    resetCheck() {
      const checkboxes = this.getCheckboxes()
      const updatedFilters = {
        isDirect: false,
        isLuggage: false,
        isRefundable: false,
      }
      checkboxes.map(elem => {
        elem = elem.firstChild;
        elem.checked = false;
        elem.nextSibling.classList.remove('active')
      });
      this.filters = updatedFilters
      this.isChecked = false;
      this.$store.dispatch('changeOptionFilters', updatedFilters);
    },
  }
}
</script>

<style>
</style>