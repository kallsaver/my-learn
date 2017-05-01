<template>
	<div v-for="n in 10">div</div>
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

<style lang="less">
	body{
		background: purple;
		#app{
			height: 200px;background: peru;
		}
	}
</style>