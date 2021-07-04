<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //创建scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        observeDOM: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //监听滚动位置
      if (this.probeType == 2 || this.probeType == 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position)
          this.$emit('scroll', position)
        })
      }
      //监听滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载更多')
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      finishPullUp() {
        this.finishPullUp && this.scroll.finishPullUp()
      },
      refresh() {
        this.refresh && this.scroll.refresh()
      },
      scrollTo(x, y, time = 500) {
        this.scrollTo && this.scroll.scrollTo(x, y, time)
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>