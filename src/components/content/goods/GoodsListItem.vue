<template>
  <div class="good-item" @click="itemClick">
    <img :src="showImage" alt="" @load="laodImg">
    <div class="good-infos">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image  || this.goodsItem.show.img
      }
    },
    methods: {
      laodImg() {
        this.$bus.$emit('imgImageLoad')
      },
      itemClick() {
        this.$router.push('/detail' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .good-item {
    padding-bottom: 40px;
    position: relative;
    width: 50%;
  }

  .good-item img {
    width: 98%;
    border-radius: 6px;
    padding-left: 2%;
  }

  .good-infos {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .good-infos p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .good-infos .price {
    color: var(--color-high-text);
    margin-right: 25px;
  }

  .good-infos .collect {
    position: relative;
  }

  .good-infos .collect::before {
    content: '';
    position: absolute;
    left: -13px;
    top: 1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/收 藏.svg") 0 0/14px 14px;
  }
</style>