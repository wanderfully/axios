import { get , post } from './base'

export const install = function(Vue, config = {}){
    Vue.prototype.$get = get;
    Vue.prototype.$post = post;
}