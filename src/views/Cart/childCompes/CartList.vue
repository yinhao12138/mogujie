<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <CartListItem v-for="(item,index) in cartList" :key="index" :item-info="item"></CartListItem>
    </Scroll>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import Scroll from "../../../components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'

  export default {
    name: "CareList",
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 89px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>