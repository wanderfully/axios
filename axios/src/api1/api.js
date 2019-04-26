import { get,post } from './http'

export const apiAddress = data => {return post('PcOpenCityWS/getOrderSource.rtz',data)};