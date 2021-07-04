<template>
  <div class="cart">
    <NavBar class="top">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <CartList class="cart-list"></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childCompes/CartList";
  import CartBottomBar from "./childCompes/CartBottomBar";
  import {mapGetters} from 'vuex'

  export default {
    name: 'cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style>
  .cart {
    /*position: relative;*/
    height: 100vh;
  }

  .top {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
