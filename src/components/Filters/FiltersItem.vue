<template>
    <label class="filter__item">
        <input type="checkbox" 
               class="d-none" 
              :value="value" 
              :checked="isActive"
              @click="check($event)">
        <span class="checkbox" :class="{active: isActive}"></span>
        {{text}}
    </label>
</template>

<script>
export default {
    props: ['text', 'value', 'isActive'],
    data() {
        return {}
    },
    methods: {
        check(event) {
            const checkbox = event.target.nextSibling;
            event.target.checked ? checkbox.classList.add('active') 
                                 : checkbox.classList.remove('active')
            this.$emit('handleCheck', event.target)
        }
    }
}
</script>

<style>

</style>