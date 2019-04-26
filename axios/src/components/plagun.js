
import component from './Cmponent.vue'
const component = {
    install:function(Vue){
        Vue.component('component-name',component)
    }  //'component-name'这就是后面可以使用的组件的名字，install是默认的一个方法
    
}
// 导出该组件
export default component
