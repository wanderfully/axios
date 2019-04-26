import axios from './config'
import qs from 'qs'
export const post = (url, data, extend = {isJson: false, cache: false}) => {
    let defaultConfig = {
        url,
        method: 'POST',
        data: extend.isJson ? data : qs.stringify(data)//通过isjson来确定传参格式是json还是formData
    }
    let config = {...defaultConfig, ...extend}
    return axios(config).then(res => {
        Promise.resolve(res)//可以对返回的数据进行操作
    },err => {
        Promise.reject(err)
    })
}

export const get = (url, data, extend = {isJson: true, cache: false}) => {
    let defaultConfig = {
        url,
        method: 'GET',
        params: data 
    }
    let config = { ...defaultConfig, ...extend }
    return axios(config).then(res => {
        Promise.resolve(res)
    },err => {
        Promise.reject(err)
    })
}