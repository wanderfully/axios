<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { apiAddress } from '@/api1/api.js'
import { get,post } from './api1/http'
import order from './optimizationApi1/api'
export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  created() {
    this.getOrderSource();
  },
  methods:{
    getOrderSource(){
      // 第一个
      // this.$post("PcOpenCityWS/getOrderSource.rtz",{
      //   apikey: 'f9157148882f404fa77fd9a93cc1e72f'
      // }).then(function(res){

      // })
      // 第二个
      // apiAddress({}).then(res => {
      // console.log(res)
      // }).catch(res => {
      //   console.log(res)
      // })
      // 第三个
      order.orderList().then(res => {
        console.log(res)
      }).catch(res => {
        console.log(res)
      })
      
     
    }
  }
}
</script>
  
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
