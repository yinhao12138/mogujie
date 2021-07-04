<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></CheckButton>
      <span>全选</span>
    </div>
    <div class="price">合计: ¥{{totalPrice}}</div>
    <div class="calculate">去计算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/CheckButton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "BottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        const cartList = this.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked === true).length
      },
      //点击全选
      isSelectAll() {
        if (this.cartList.length === 0) return false
        return !(this.cartList.filter(item => !item.checked).length)
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {//全部选中
          this.cartList.forEach(item => item.checked = false)
        } else {//部分或者全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    display: flex;
    width: 100%;
    height: 49px;
    bottom: 49px;
    background-color: #eee;
    line-height: 50px;
    font-size: 16px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 80px;
  }

  .check-button {
    width: 23px;
    height: 23px;
    line-height: 23px;
    margin-right: 5px;
  }

  .price {
    flex: 1;
    text-align: center;
    letter-spacing: 1px;
  }

  .price span {
    color: var(--color-high-text);
  }

  .calculate {
    width: 100px;
    /*background-color: var(--color-tint);*/
    background: linear-gradient(90deg, rgb(255, 87, 119), rgb(255, 70, 143));
    color: #eeeeee;
    text-align: center;
  }
</style>
