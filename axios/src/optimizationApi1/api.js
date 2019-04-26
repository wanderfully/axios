/**
 * 假设这是订单列表模块
 */
import base from './base' //接口域名
import axios from './http' //导出创建的axios实例
import qs from 'qs'

const getData = (url,params) => {
    return axios.post(`${base.sq}/`+url,qs.stringify(params))
}

const order = {
    // 订单列表
    orderList(params){
        return getData('PcOpenCityWS/getOrderSource.rtz',params);
    }
    // 登录
}

export default order;