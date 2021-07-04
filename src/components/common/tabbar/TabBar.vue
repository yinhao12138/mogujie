<template>
	<div>
		<div id="tab-bar">
			<slot></slot>
		</div>
	</div>
</template>

<script>
</script>

<style>
	#tab-bar {
    display: flex;
    background-color: lightgrey;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    /*z-index: 9;*/
	}

	/*.tab-bar-item {*/
	/*	flex: 1;*/
	/*	text-align: center;*/
	/*	height: 49px;*/
	/*	box-shadow: 0 -2px 1px rgba(100, 100, 100, .1);*/
	/*}*/
</style>
