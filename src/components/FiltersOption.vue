<template>
  <div class="filter">
      <button v-if="isChecked" class="clear-filters" @click="resetCheck()">
        <div class="tooltip">Сбросить выбор</div>
      </button>
      <h3 class="filter__title" data-filter-name="options">Опции тарифа</h3>
      <FiltersItem text="Только прямые"     value="isDirect"     data-filter="options" @handleCheck="handleCheck"/>
      <FiltersItem text="Только с багажом"  value="isLuggage"    data-filter="options" @handleCheck="handleCheck"/>
      <FiltersItem text="Только возвратные" value="isRefundable" data-filter="options" @handleCheck="handleCheck"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isChecked: false,
      filters: {
        isDirect: false,
        isLuggage: false,
        isRefundable: false,
      }
    }
  },

  methods: {
   handleCheck(target) {
      const checkboxes = Array.from(document.querySelectorAll(`input[data-filter="options"]`));
      const isChecked = checkboxes.some(elem => elem.checked === true);
      if (isChecked) {
        this.isChecked = true;
      } else this.isChecked = false;
      
      const updatedFilters = {
        ...this.filters,
        [target.value]: target.checked
      }
      this.filters = updatedFilters
      this.$emit('change-filter', updatedFilters)
    },
    resetCheck() {
      const checkboxes = Array.from(document.querySelectorAll(`input[data-filter="options"]`));
      checkboxes.map(elem => {
        elem.checked = false;
        elem.nextSibling.classList.remove('active')
      });
      const updatedFilters = {
        isDirect: false,
        isLuggage: false,
        isRefundable: false,
      }
      this.filters = updatedFilters
      this.$emit('change-filter', updatedFilters)
      this.isChecked = false;
    },
  }
}
</script>

<style>

</style>