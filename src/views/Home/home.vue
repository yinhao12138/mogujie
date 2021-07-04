<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl class="tab-control"
                :title="['流行','新款','精选']"
                @tabClick="tabClick"
                ref="tabContalTop" v-show="isFixed"></TabControl>
    <Scroll class="home-scr" ref="scroll"
            :probe-type="3"
            @scroll="scrollClick"
            :pullUpLoad="true"
            @pullingUp="loadMore">
      <HomeSwiper :banner="banner" @swiperImgLoad="swiperImgLoad"></HomeSwiper>
      <Recommend :recommend="recommend"></Recommend>
      <Feature></Feature>
      <TabControl
          :title="['流行','新款','精选']"
          @tabClick="tabClick"
          ref="tabContal"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShow"></BackTop>
  </div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import Recommend from './childComps/Recommend'
  import Feature from './childComps/Feature'
  import TabControl from '../../components/content/tabContral/TabControl'
  import GoodsList from '../../components/content/goods/GoodsList'
  import Scroll from '../../components/common/scroll/Scroll'
  import BackTop from '../../components/content/backTop/BackTop'
  import {getHomeMultidata, getHomeGoods} from '../../network/home'
  import {debounce} from "../../common/utils";

  export default {
    name: 'Home',
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShow: false,
        tabOffsetTop: 0,
        isFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      Recommend,
      Feature,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //防抖动 图片完成的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      this.$bus.$on('imgImageLoad', () => {
        refresh()
      })
      //获取tabContal的offsettop
    },
    //页面销毁
    destroyed() {
      console.log('home destroyed');
    },
    //页面进来时
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    //页面离开时
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
      tabClick(index) {
        // console.log(index)
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabContalTop.currentIndex = index;
        this.$refs.tabContal.currentIndex = index;
      },
      swiperImgLoad() {
        this.tabOffsetTop = this.$refs.tabContal.$el.offsetTop
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      scrollClick(position) {
        //判断isbacktop是否显示
        // console.log(position)
        this.isShow = (-position.y) > 1000
        //是否吸顶
        this.isFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('上拉加载更多')
        this.getHomeGoods(this.currentType)
      },
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res)
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }


  .home-scr {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  /*.home-scr {*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*  height: calc(100% - 93px);*/
  /*}*/
</style>
