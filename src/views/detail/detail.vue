<template>
  <div id="detail">
    <DetailNavBar @titleClick="titleClick" ref="nav"></DetailNavBar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo ref="param" :paramInfo="paramInfo"></DetailParamInfo>
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo"></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </scroll>
    <BackTop @click.native="backClick" v-show="isShow"></BackTop>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <Toast :message="message" :show="show"></Toast>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from '../../components/content/backTop/BackTop'
  import Toast from "../../components/common/toast/Toast";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";

  export default {
    name: "detail",
    data() {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        isShow: false,
        message: '',
        show: false
      }
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid
      //根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result
        //顶部轮播图
        this.topImages = data.itemInfo.topImages
        //商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // console.log(data.skuInfo.title);
        //商品详情对象
        this.shop = new Shop(data.shopInfo)
        //商品详情信息数据
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      }),
        getRecommend().then(res => {
          // console.log(res);
          this.recommends = res.data.list
        })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.$nextTick(() => {
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.param.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopYs.push(Number.MAX_VALUE)
        })
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        this.isShow = (-position.y) > 1000
        const positionY = -position.y
        let length = this.themeTopYs.length
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      addToCart() {
        //获取商品的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        //将商品添加到购物车
        this.$store.dispatch('addCart', product).then(res => {
          // console.log(res);
          this.message = res
          this.show = true
          setTimeout(() => {
            this.show = false
            this.message = ''
          }, 1500)
        }).catch(err => {
        })
        //添加到购物车成功
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      Scroll,
      BackTop,
      Toast
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    height: 100vh;
    z-index: 1;
    background-color: white;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 56px;
  }
</style>