<template>
	<div v-for="n in 10">div</div>
	<div class="fav"></div>
</template>

<script>
	export default {
		data(){
			return {
				msg : 'hello world!'
			}
		}
	}
</script>

<style lang="less" scoped>
	body{
		background: gold;
		#app{
			height: 200px;background: peru;
		}
		.fav{
			height: 200px;background: plum;
		}
	}
	
</style>