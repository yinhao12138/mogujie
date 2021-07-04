<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" class="tab-control-item" :class="{active:index===currentIndex}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: white;
}

.tab-control-item {
  flex: 1;
}

.active {
  color: #ff5777;
}

.tab-control-item span {
  padding: 5px;
}

.active span {
  border-bottom: 3px solid #ff5777;
}
</style>