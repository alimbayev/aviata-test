<template>
    <label class="filter__item">
        <input type="checkbox" 
               class="d-none" 
              :value="value" 
              :data-filter="dataFilter"
              :checked="isActive"
              @click="check($event)">
        <span class="checkbox" :class="{active: isActive}"></span>
        {{text}}
    </label>
</template>

<script>
export default {
    props: ['text', 'value', 'dataFilter', 'isActive'],
    data() {
        return {}
    },
    methods: {
        check(event) {
            const checkbox = event.target.nextSibling;
            if (event.target.checked) {
                checkbox.classList.add('active')
            } else {
                checkbox.classList.remove('active')
            }
            this.$emit('handleCheck', event.target)
        }
    }
}
</script>

<style>
.filter__item {
  display: flex;
  height: 38px;
  padding: 10px 12px;
  box-sizing: border-box;
  line-height: 16px;
  cursor: pointer;
  color: #202123;
  transition: background-color .5s ease-out;
  letter-spacing: 0.01rem;
  font-weight: 100;
}

.filter__item:hover {
  background-color: #ebebeb;
}

.d-none {
  display: none;
}

.checkbox {
  position: relative;
  width: 12px;
  height: 12px;
  margin: 2px 12px 2px 0;
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #B9B9B9;
  border-radius: 2px;
  background: #fff;
  transition: all .1s ease-in-out;
}

.checkbox.active{
    background-color: #55BB06;
    background-image: url('../assets/vector-white.svg');
    background-position: center center;
    background-repeat: no-repeat;
    border: none;
}

</style>