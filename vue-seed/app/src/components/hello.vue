<template>
    <div>
        <p>{{ greeting }} World!</p>
    </div>
    
</template>

<script>
    module.exports = {
        data : function(){
            return {
                greeting : 'hello'
            }
        }
    }
</script>

<style lang="less">
    div{
        height:200px;background:peru;
        p{color:#fff}
    }
</style>