<script>
	import { actions } from './store';
	import Card from 'components/card';
	import List from 'components/list';
	import Text from 'components/text';
	import Message from 'components/message';
	
	export default {
		components : { Card, List, Text, Message },
		vuex : {
			actions : actions
		}
	}
</script>

<template>
</template>


<style>
</style>