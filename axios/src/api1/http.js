import axios from 'axios'
import QS from 'qs'

// 环境切换
if(process.env.NODE_ENV == 'development'){
    axios.defaults.baseURL = '/api'
}else if(process.env.NODE_ENV == 'production'){
    axios.defaults.baseURL = 'https://www.baidu.com'
}
// 设置超时时间
axios.defaults.timeout = 10000;
// 设置post请求头 
// post为application/x-www-form-urlencoded;charset=UTF-8     Form Data  
// get为 Query String Parameters
// json 为 application/json; charset=UTF-8     Request Payload
axios.defaults.headers.post['Content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截 我们拦截请求 有些请求是需要用户登录之后才能访问的
// 先导入vuex 需要用到状态对象
import store from './../store'
store.state.token = 'true'
// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能是过期的，所以在响应拦截器中要对返回的状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token)
        
        return config;
    },
    error => {
        console.log('请求拦截器')
        console.log(error)
        return Promise.reject(error);
    }
)
// 响应拦截器
axios.interceptors.response.use(
    response => {
        // console.log('响应拦截器')
        // 如果返回的状态吗为200 说明接口请求成功，可以正常拿到数据
        if(response.status == 200){
            // 如果都是请求成功，只是返回的状态码是0，而有报错信息则
            if(response.data.status == 1){
                return Promise.resolve(response)
            }else{
                return Promise.reject(response);
            }
            
        }else{
            return Promise.reject(response);
        }
    },
    error => {
        console.log('响应拦截器报错')
        if(error.response.status){
            switch(error.response.status) {
                // 假设403是token过期，清除本地token和vuex中的token,然后跳转到登录页面
                case 403:
                    alert('登陆过期，请重新登录')
                    localStorage.removeItem('token');
                    // store.commit('loginSuccess',null);
                    setTimeout(() => {
                        // 跳转的页面
                    });
                    break;
                case 404:
                    alert('访问资源不存在')
                    break;
                case 500:
                    alert('服务器错误')
                    break;
                default:
                    alert('未知错误')
            }
            return Promise.reject(error.response)
        }
        return Promise.reject(error);
    }
)
/**
 *
 *
 * get get请求
 * @param {string} url [请求的url地址]
 * @param {object} params [请求时带的参数]
 */
export function get(url,params){
    return new Promise((resolve,reject) => {
        axios.get(url,{
            params:params
        })
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(res.data)
        })
    })
    
}
/**
 *
 *
 * post post请求
 * @param {string} url [请求的url地址]
 * @param {object} params [请求时的参数]
 */
export function post(url,params){
    return new Promise((resolve,reject) => {
        axios.post(url,QS.stringify(params))
        .then(res => {
            console.log(res)
            resolve(res.data)
        })
        .catch(res => {
            reject(res.data)
        })
    })
}
