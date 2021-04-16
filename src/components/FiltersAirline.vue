<template>
  <div class="filter">
      <button v-if="isChecked" class="clear-filters" @click="resetCheck">
        <div class="tooltip">Сбросить выбор</div>
      </button>

      <h3 class="filter__title">Авиакомпании</h3>
      <label class="filter__item">
        <input type="checkbox" class="d-none" value="all" checked
               data-id="airline-filter__all"
              @click="check($event)">
        <span class="checkbox active"></span>
        Все
      </label>
      
      <FiltersItem v-for="(carrier,index) in carriers" 
                   :key="index" 
                   :value="getCarrier(carrier)"
                   :text="carrier"
                   :isActive="true"
                   data-filter="airline"
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
            filters: {}
        }
    },
    created() {
        this.changeFilter()
    },
    methods: {

        changeFilter(boolean = true) {
            this.carriers.forEach(carrier => this.filters[this.getCarrier(carrier)] = true);
            if (!boolean) {
                this.carriers.forEach(carrier => this.filters[this.getCarrier(carrier)] = false);
            }
            const updatedFilters = {
                ...this.filters
            }

            this.$emit('change-filter', updatedFilters)
        },

        check(event) {
            const checkbox = event.target.nextSibling;
            const checkboxes = Array.from(document.querySelectorAll(`input[data-filter="airline"]`));
            const isChecked = event.target.checked;
            
            if (isChecked) {
                this.changeFilter()
                checkbox.classList.add('active')
                checkboxes.map(elem => {
                    elem.checked = true;
                    elem.nextSibling.classList.add('active')
                    this.isChecked = false;
                })
            } else {
                this.changeFilter(false)  
                checkbox.classList.remove('active');
                checkboxes.map(elem => {
                    elem.checked = false;
                    elem.nextSibling.classList.remove('active')
                    this.isChecked = true;
                })
            }
        },

        handleCheck(target) {
            const { checkboxes, resetCheckbox } = this.getCheckboxes()
            const isChecked = checkboxes.some(elem => elem.checked === false);

            if (isChecked) {
                this.isChecked = true;
                resetCheckbox.checked = false;
                resetCheckbox.nextSibling.classList.remove('active')
            } else {
                this.isChecked = false;
                resetCheckbox.checked = true;
                resetCheckbox.nextSibling.classList.add('active')
            }
            const updatedFilters = {
                ...this.filters,
                [target.value]: target.checked
            }
            this.filters = updatedFilters;
            this.$emit('change-filter', updatedFilters)
        },

        resetCheck() {
            const { checkboxes, resetCheckbox } = this.getCheckboxes()
            
            resetCheckbox.checked = true;
            resetCheckbox.nextSibling.classList.add('active');
            checkboxes.map(elem => {
                elem.checked = true;
                elem.nextSibling.classList.add('active');
            })
            this.isChecked = false;
            this.changeFilter()
        },

        getCheckboxes() {
            const checkboxes = Array.from(document.querySelectorAll(`input[data-filter="airline"]`));
            const resetCheckbox = document.querySelector('input[data-id="airline-filter__all"]');
            return {
                checkboxes,
                resetCheckbox
            }
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