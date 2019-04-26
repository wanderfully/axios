/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from './../router/index';
import store from './../store';
import { Loading,Message } from 'element-ui'

/* **************加载效果 *************/
let options = {
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
}
let loadingInstance = null;

/******************* 提示框 ****************/
Message.success({
    message:'提示框'
})

/* *********** 跳转登录页 *********** */
const toLogin = () => {
    router.replace({
        path:'/login',
        query:{
            redirect: router.currentRoute.fullPath
        }
    })
}
/* *********** 状态错误码统一处理 ************* */
const errorHandle = (statusCode,other) => {
    // 状态吗判断
    switch(statusCode) {
        case 401:
            // doSomethings
            break;
        case 403:
            // doSomethings
            break;
        case 404:
            // doSometings
            break;
        default:
            console.log(other)
    }
} 

/* ************* 创建axios实例 ***************** */
var instance = axios.create({ timeout: 1000*10 });
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/* ***************请求拦截器*********************** */

instance.interceptors.request.use(
    config => {
        loadingInstance = Loading.service(options)
        const token = store.state.token;        
        token && (config.headers.Authorization = token);        
        return config;
    },
    error => {
        Promise.error(error)
    }
)

/* ********* 响应拦截器************* */
instance.interceptors.response.use(
    response => {
        loadingInstance.close()
        if(response.status == 200){
            Promise.resolve(response)
        }else{
            Promise.reject(response)
        }
    },
    error => {
        console.dir(error)
        loadingInstance.close()
        const { response } = error;
        if(response){
            // 请求已发出，但不是2开头
            // 判断状态码错误类型
            errorHandle(response.status,response.data.message);
            return Promise.reject(response)
        }else{
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            // store.commit('changeNetwork', false);
            return Promise.reject('断网了')
        }
    }
)
export default instance;
