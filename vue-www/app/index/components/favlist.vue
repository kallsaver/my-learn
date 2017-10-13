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
		},
		created : function(){
			console.log(11)
			var a = 4;
			console.log(a)
		},
		beforeCreate : function(){
			console.log(7);
		}
	}
</script>

<!--<style>
	body{
		background: gold;	
	}
	#app{
		height: 200px;background: peru;
	}
	
</style>-->

<style lang="less" scoped>
@import (reference)'./style.less';
body{
	
	#app{
		background: peru;
	}
	.fav{
		.a .b .c;background: gold;
	}
}
	
</style>