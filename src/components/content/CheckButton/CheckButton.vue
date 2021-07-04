<template>
  <div class="check-button" :class="{check:isChecked}" @click="selectClick">
    <img src="../../../assets/img/common/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "checkButton",
    props: {
      isChecked: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      selectClick() {
        this.$emit('checkBtnClick')
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid lightgray;
  }

  .check {
    border-color: red;
    background-color: red;
  }
</style>