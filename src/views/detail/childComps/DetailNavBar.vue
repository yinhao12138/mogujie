<template>
  <div>
    <NavBar>
      <div slot="left" class="back">
        <img src="../../../assets/img/common/back.svg" alt="" @click="backClick">
      </div>
      <div slot="center" class="titel">
        <div v-for="(item,index) in title"
             class="titel-item"
             :class="{active:index===currentIndex}" @click="titleClick(index)">{{item}}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";

  export default {
    name: "DetailNavBar",
    data() {
      return {
        title: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .titel {
    display: flex;
    font-size: 15px;
  }

  .titel-item {
    flex: 1;
  }

  .active {
    color: deeppink;
  }
  .back img{
    margin: 5px 0 0 13px ;
    height: 35px;
    width: 35px;
  }
</style>