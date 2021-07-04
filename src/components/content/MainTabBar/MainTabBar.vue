<template>
	<div>
		<TabBar>
			<TabBarItem path='/home' activeColor="black">
				<img slot="item-icon" src="../../../assets/img/icon/首页.svg" />
				<img slot="item-icon-Active" src="../../../assets/img/icon/首页 (1).svg" />
				<div slot="item-text">首页</div>
			</TabBarItem>
			<TabBarItem path='/category' activeColor="black">
				<img slot="item-icon" src="../../../assets/img/icon/分类.svg" />
				<img slot="item-icon-Active" src="../../../assets/img/icon/分类 (1).svg" />
				<div slot="item-text">列表</div>
			</TabBarItem>
			<TabBarItem path='/cart' activeColor="black">
				<img slot="item-icon" src="../../../assets/img/icon/购物车空.svg" />
				<img slot="item-icon-Active" src="../../../assets/img/icon/购物车空 (1).svg" />
				<div slot="item-text">购物车</div>
			</TabBarItem>
			<TabBarItem path='/profile' activeColor="black">
				<img slot="item-icon" src="../../../assets/img/icon/我 的.svg" />
				<img slot="item-icon-Active" src="../../../assets/img/icon/我 的 (1).svg" />
				<div slot="item-text">我的</div>
			</TabBarItem>
		</TabBar>
	</div>
</template>

<script>
	import TabBar from "../../common/tabbar/TabBar.vue"
	import TabBarItem from '../../common/tabbar/TabBarItem'
	export default {
		name: 'MainTabBar',
		components: {
      TabBar,
      TabBarItem
		}
	}
</script>

<style>
</style>
