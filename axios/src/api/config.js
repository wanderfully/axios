import axios from 'axios'
import Cache from './cache'

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* 需要缓存的情况 */
// new Cache(axios, {
//     requestInterceptorFn: config => {
//         //自定义请求拦截器
//         // 需要用Promise将config返回
//         return Promise.resolve(config)
//     },
//     responseInterceptorFn: response => {
//         // 自定义响应拦截器，可统一返回的数据格式也可拦截错误
//         // 需要用Promise将response
//         return Promise.resolve(response)
//     }
// })

// export default axios

axios.interceptors.request.use(function(config){
    // Do something before request is sent
    return config;
},function(error){
    // Do something with request error
    return Promise.reject(error)
})
// add a response intercetor
axios.interceptors.response.use(function (response) {
    // Do something with reponse data
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
export default axios