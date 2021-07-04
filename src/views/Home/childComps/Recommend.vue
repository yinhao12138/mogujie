<template>
<div class="recommend">
  <div v-for="item in recommend" class="recommend-item">
    <a :href="item.link"></a>
    <img :src="item.image" alt="">
    <div>{{item.title}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: "Recommend",
  props:{
    recommend:{
     type:Array,
      default(){
       return[]
      }
   }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  width: 100%;
  font-size: 12px;
  text-align: center;
  padding: 10px 0 15px;
  border-bottom: 7px solid #a8a8aa;
}
.recommend-item {
  flex: 1;
}
.recommend-item img{
  width: 80px;
  height: 80px;
  border-bottom: 6px;
}
</style>