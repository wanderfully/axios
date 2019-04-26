<template>
    <div>
        我是组件
    </div>
</template>
 
<script>
    export default {
        created() {
            console.log(this)
        },
    }
</script>
 
<style scoped>
    div{
        font-size:40px;
        color:#fbb;
        text-align:center;
    }
</style>
