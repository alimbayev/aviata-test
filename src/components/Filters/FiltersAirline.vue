<template>
  <div class="filter" ref="filters">
      <button v-if="isChecked" class="clear-filters" @click="resetCheck">
        <div class="tooltip">Сбросить выбор</div>
      </button>

      <h3 class="filter__title">Авиакомпании</h3>
      <label class="filter__item filter-all">
        <input type="checkbox" class="d-none" checked
               ref="resetCheckbox"  @click="check($event)">
        <span class="checkbox active"></span>
        Все
      </label>
      
      <FiltersItem v-for="(carrier,index) in carriers" 
                   :key="index" 
                   :value="getCarrier(carrier)"
                   :text="carrier"
                   :isActive="true"
                   @handleCheck="handleCheck"
      />
    </div>
</template>

<script>
export default {
    inject: ['airlines', 'carriers'],
    data() {
        return {
            isChecked: false,
            filters: this.$store.getters.getAirlineFilters,
        }
    },
    created() {
        this.changeFilter()
    },
    methods: {
        changeFilter(isTrue = true) {
            const updatedFilters = { ...this.filters }
            
            isTrue ? this.carriers.forEach(carrier => this.filters[this.getCarrier(carrier)] = true)
                   : this.carriers.forEach(carrier => this.filters[this.getCarrier(carrier)] = false);
            this.$store.dispatch('changeAirlineFilters', updatedFilters)
        },

        check(event) {
            const checkbox = event.target.nextSibling;
            const isChecked = event.target.checked;
            const { checkboxes } = this.getCheckboxes();

            isChecked ? this.changeFilter() : this.changeFilter(false);
            isChecked ? checkbox.classList.add('active') 
                      : checkbox.classList.remove('active');

            if (isChecked) 
                  checkboxes.map(elem => {
                    elem = elem.firstChild;
                    elem.checked = false;
                    elem.nextSibling.classList.add('active')
                    this.isChecked = false; })

            else checkboxes.map(elem => {
                    elem = elem.firstChild;
                    elem.checked = true;
                    elem.nextSibling.classList.remove('active')
                    this.isChecked = true;  })
            
        },

        handleCheck(target) {
            const { checkboxes, resetCheckbox } = this.getCheckboxes()
            const isChecked = checkboxes.some(elem => { return elem.firstChild.checked === false});
 
            isChecked ? this.isChecked = true : this.isChecked = false;
            isChecked ? resetCheckbox.checked = false : resetCheckbox.checked = true;
            isChecked ? resetCheckbox.nextSibling.classList.remove('active') 
                      : resetCheckbox.nextSibling.classList.add('active')

            const updatedFilters = {
                ...this.filters,
                [target.value]: target.checked
            }
            this.filters = updatedFilters;
            this.$store.dispatch('changeAirlineFilters', updatedFilters)
        },

        resetCheck() {
            const { checkboxes, resetCheckbox } = this.getCheckboxes()
            
            resetCheckbox.checked = true;
            resetCheckbox.nextSibling.classList.add('active');
            
            checkboxes.map(elem => {
                elem = elem.firstChild;
                elem.checked = true;
                elem.nextSibling.classList.add('active');
            })
            this.isChecked = false;
            this.changeFilter()
        },

        getCheckboxes() {
            const checkboxes = [...this.$refs.filters.children].filter(elem => elem.className === 'filter__item');
            const resetCheckbox = this.$refs.resetCheckbox;
            return { checkboxes, resetCheckbox }
        },

        getCarrier(value) {
            const object = this.airlines;
            return Object.keys(object).find(key => object[key] === value);
        } 
    }
}
</script>

<style>
</style>