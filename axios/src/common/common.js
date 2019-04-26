
import Vue from 'vue'
//引入axios
import axios from 'axios'
import Qs from 'qs'
// //引入生成二维码
// import QRCode from 'qrcode'
import QRCode from 'qrcode'
//引入cookies

export default {
  /**
   ajax方法
   */
  ajax(obj) {
    //检测传入数据类型
    if (typeof  obj !== "object") {
      console.warn('参数必须是对象');
      return
    }
    let data = {};
    data = obj.data ? obj.data : {};
    //将原型或者本地存储中的apikey放入data
    if (this.ajax.prototype.hasOwnProperty('apikey')) {
      data.apikey = this.ajax.prototype.apikey ? this.ajax.prototype.apikey : ''
    } else if (localStorage.apikey) {
      data.apikey = localStorage.apikey
    }
    if (JSON.stringify(data) !== "{}") {
      data = Qs.stringify(data);
    } else {
      data = null;
    }
    axios({
      // `url` 是用于请求的服务器 URL
      url: obj.url,

      // `method` 是创建请求时使用的方法
      method: 'post', // 默认是 get

      // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
      // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL

      // `transformRequest` 允许在向服务器发送前，修改请求数据
      // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
      // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
      transformRequest: [function (data) {
        // 对 data 进行任意转换处理
        return data;
      }],

      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      transformResponse: [function (data) {
        // 对 data 进行任意转换处理
        return data;
      }],

      // `headers` 是即将被发送的自定义请求头
      headers: {'X-Requested-With': 'XMLHttpRequest'},

      // `params` 是即将与请求一起发送的 URL 参数
      // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
      params: {},
      // `paramsSerializer` 是一个负责 `params` 序列化的函数
      // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
      paramsSerializer: function (params) {
        return Qs.stringify(params, {arrayFormat: 'brackets'})
      },
      // `data` 是作为请求主体被发送的数据
      // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
      // 在没有设置 `transformRequest` 时，必须是以下类型之一：
      // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      // - 浏览器专属：FormData, File, Blob
      // - Node 专属： Stream
      data: data,
      // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
      // 如果请求话费了超过 `timeout` 的时间，请求将被中断
      timeout: 5000,
      // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      responseType: 'json', // 默认的
      // `maxContentLength` 定义允许的响应内容的最大尺寸
      maxContentLength: 2000,
      // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
      validateStatus: function (status) {
        return status >= 200 && status < 300; // 默认的
      }
      ,
    }).then(function (e) {
      if (obj.success) {
        obj.success(e.data)
      }
      if (obj.complete) {
        obj.complete()
      }
    }).catch(function (e) {
      if (obj.fail) {
        obj.fail(e)
      }
      if (obj.complete) {
        obj.complete()
      }
    })
  },

  /**
   * 获取开发环境,分为本地环境,测试服环境和正式服环境
   */
  getEnvironment() {
    return process.env.NODE_ENV === 'development' ? 'development' :
      location.port ? 'testServer' : 'testServer'
  },

  /**
   * 生成二维码, 根据输入的字符串生成二维码
   * 返回的数据为base64格式
   */
  createQrCode(str) {
    let img;
    if (typeof  str !== 'string') {
      console.warn('生成二维码参数必须是字符串格式');
      return
    }
    QRCode.toDataURL(str, function (err, url) {
      img = url
    });
    return img
  },

  /**
   *操作cookies相关方法
   */
  cookies: {
    //获取
    get(name) {
      let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg))
        return (arr[2]);
      else
        return null;
    },
    //设置
    set(c_name, value, expiredays) {
      let exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
    },
    //删除
    del(name) {
      let exp = new Date();
      exp.setTime(exp.getTime() - 1);
      let cval = getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  },
  //获取URl参数
  getUrlArgument() {
    let url = location.hash; //获取url中"?"符后的字串
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
      let str = url.substr(url.indexOf("?") + 1);
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  },
  //清除空格
  clearBank(txt) {
    if (typeof  txt === 'string') {
      return txt.replace(/\s/g, '')
    } else {
      console.log('请输入正确的类型')
    }
  },
  //解码html
  htmlDecode(html) {
    return html.replace(/(\&|\&)gt;/g, ">")
      .replace(/(\&|\&)lt;/g, "<")
      .replace(/(\&|\&)quot;/g, "\"");
  },
  /**
   * 对象克隆，将返回新的对象副本，不再影响原始对象
   * @param obj
   * @returns objCopy
   */
  clone(obj) {
    let o;
    if (typeof obj == 'object') {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (let i in obj) {
            o.push(clone(obj[i]));
          }
        } else {
          o = {};
          for (let j in obj) {
            o[j] = clone(obj[j]);
          }
        }
      }
    } else {
      o = obj;
    }
    return o;
  },
  isNumber(data){
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    return regPos.test(data)
  },
  /**针对Vue提交大量数据时有可能出现的数据重复Bug
   *
   * 示例 提交的json字符串 = JSON.stringify(distinctObjArray(JSON.parse(提交的数据)));
   *
   * 处理对象数组去重
   * @param array
   * @returns
   */
  distinctObjArray(array) {
    if (array.length <= 0)
      return array;
    let n = {}, r = []; //n为hash表，r为临时数组
    for (let i = 0; i < array.length; i++) {
      if (array[i] instanceof Array) {
        array[i] = distinctObjArray(array[i]);
      }
      let pp = array[i];
      pp = (pp instanceof Object || pp instanceof Array) ? JSON.stringify(pp) : pp;
      if (!n[pp]) {
        n[pp] = true; //存入hash表
        r.push(array[i]); //把当前数组的当前项push到临时数组里面
      }
    }
    return r;
  },
  /**
   *
   * @param str  需要转的 json 字符串
   * @returns {string}
   */
  JsonToObject(str) {
    if (str) {
      try {
        str = str.replace(/\n/g, " ");
        str = str.replace(/\r/g, " ");
        str = str.replace(/\t/g, " ");
        return JSON.parse(str);
      }
      catch (e) {
        console.warn('传入字符串格式错误')
      }
    }
  }, /**
   * 对Date的扩展，将 Date 转化为指定格式的String
   * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2018-01-12 08:09:04.423
   * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2018-01-12 8:9:4.18
   * @param fmt
   * @returns {*}
   * @constructor
   */
  dateFormat(fmt) { // author: meizz
    let o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      "S": this.getMilliseconds()
      // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  },
  /**
   * 检测一个值是否非空
   * @param val 要检测的值
   * @return boolean 检测结果
   */
  isEmpty(val) {
    if (typeof val === 'number') {
      return false
    }
    return (!val || val === undefined || typeof val === 'undefined' || val === null || val == 'undefined' || val === 'null')
  },
  /**
   * 转译特殊符号
   * @param str 输入字符串
   * @return str 处理后的字符串
   * */
  escape(str) {
    if (this.isEmpty(str)) {
      return str;
    }
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&gt;/g, ">");
    str = str.replace(/&acute;/g, "'");
    str = str.replace(/&#45;&#45;/g, "--");
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&lt;/g, "<");
    str = str.replace(/&quot;/g, '\"');
    str = str.replace(/&acute;/g, "\'");
    return str;
  },
  /**
   * 护照格式验证
   * @param value 护照格式字符串
   * @return boolean
   * */
  decidePossport(value) {
    value = value.toUpperCase();
    let dlReg = /^G[0-9]{8}$/; //大陆护照
    let eReg = /^E[0-9]{8}$/; //
    let nReg = /^1[45][0-9]{7}$/; //大陆护照
    let pReg = /^P[0-9]{7}$/; //
    let sReg = /^S[0-9]{7,8}$/; //
    let dReg = /^D[0-9]+$/; //
    let rtzReg = /^T[0-9]{8}$/; //入台证
    let LReg = /^L[0-9]{8}$/;
    return (dlReg.test(value) || eReg.test(value) || nReg.test(value) || pReg.test(value) || sReg.test(value) || dReg.test(value) || rtzReg.test(value) || LReg.test(value));
  },
  /**
   * 身份证格式验证
   * @param value 护照格式字符串
   * @return boolean
   * */
  decideIdcard(value) {
    if (value.length === 15) {
      let reg = /^[1-9][0-9]{5}[2-9][0-9](0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])[0-9]{3}$/;
      return reg.test(value);
    } else if (value.length === 18) {
      let xiaoYan = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
      let xiao = ["1", "0", "x", "9", "8", "7", "6", "5", "4", "3", "2"];
      let yuShu = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let xiShu = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      let cardArray = value.split("");

      let sum = 0;
      for (let i = 0; i < cardArray.length - 1; i++) {
        sum += parseInt(cardArray[i]) * xiShu[i];
      }
      let yu = sum % 11;
      for (let i = 0; i < yuShu.length; i++) {
        if (yu === yuShu[i]) {
          if (value.substring(value.length - 1).toUpperCase() === xiaoYan[i]) {
            return true;
          }
        }
      }
    }
    return false;
  },
  /**
   * 中文验证
   * @param value 护照格式字符串
   * @return boolean
   * */
  decideChinese(value) {
    let reg = /^[\u4E00-\u9FA5]{0,}$/;
    return !reg.test(value);
  },
  /**
   * 手机验证
   * @param value 护照格式字符串
   * @return boolean
   * */
  decidePhone(value) {
    let reg = /^0?1[34758]\d{9}$/;
    return !reg.test(value);
  },
  /**
   *
   *价格验证
   * @param {number} value
   * @returns boolean
   */
  decidePrice(value) {
    let reg = /^(-?((0|([1-9][0-9]*))|((0\.\d{1,2}|[1-9][0-9]*\.\d{1,2}))))$/
    return !reg.test(value);
  },
  /**
   * 邮箱验证
   * @param value 护照格式字符串
   * @return boolean
   * */
  decideEmail(value) {
    let reg = /^(\w)+@(\w)+(\.[A-Za-z]{2,3}){1,3}$/;
    return !reg.test(value);
  },
// 是否为安卓端
  isAndroid_ios(){
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isAndroid==true?true:false;
  },

  /**指定日期的前几天或后几天
   *date 指定日期
   *num 前几天或者后几天
   */

  getThatDate(date, num) {
    let trans_day = "";
    let cur_date = "";
    let cur_year = "";

    cur_date = new Date(date.replace(/,/g,"/"));
    cur_year = new Date(date.replace(/,/g,"/")).getFullYear();

    let cur_month = cur_date.getMonth() + 1;
    let real_date = cur_date.getDate();
    cur_month = cur_month > 9 ? cur_month : ("0" + cur_month);
    real_date = real_date > 9 ? real_date : ("0" + real_date);
    let eT = cur_year + "-" + cur_month + "-" + real_date;
    trans_day = this.transDate(eT, num);
    return trans_day;
  },
  transDate(dateParameter, num) {
    let translateDate = "",
      dateString = "",
      monthString = "",
      dayString = "";
    translateDate = dateParameter.replace("-", "/").replace("-", "/");
    let newDate = new Date(translateDate);
    newDate = newDate.valueOf();
    newDate = newDate + num * 24 * 60 * 60 * 1000;
    newDate = new Date(newDate);
    if ((newDate.getMonth() + 1).toString().length === 1) {
      monthString = 0 + "" + (newDate.getMonth() + 1).toString();
    } else {
      monthString = (newDate.getMonth() + 1).toString();
    }
    if (newDate.getDate().toString().length === 1) {
      dayString = 0 + "" + newDate.getDate().toString();
    } else {
      dayString = newDate.getDate().toString();
    }
    dateString = newDate.getFullYear() + "-" + monthString + "-" + dayString;
    return dateString;
  },
  /**
   * 根据传入时间计算当前时间是该月份的第几周,以周日作为节点;
   * @param d 时间对象,必须是系统原生时间对象
   * **/
  calcWeek(d) {
    let now = d.getTime(); //当前时间戳
    let res = {now:d.getTime()};
    //根据当前时间获取周日
    let monthHead = new Date(d.getFullYear(), d.getMonth(), 1).getTime(); //月初时间戳
    let monthEnd = new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime() - 24 * 3600 * 1000; //月末时间戳
    let wd;
    if (7 - d.getDay() < 7) {
      wd = now + (7 - d.getDay()) * 24 * 3600 * 1000; //周日时间戳
    } else {
      wd = now; //周日时间戳
    }
    if (wd > monthEnd) {
      //周日大于月底就是下月的第一周
      res.week = 1;
      res.month = new Date(d).getMonth() + 2;
    }else if(new Date(wd).getDate() <=7){
      //周日小于7号就是本月第一周
      res.week = 1;
      res.month = new Date(d).getMonth() + 1;
    }else if(new Date(monthHead).getDay()===1){
      //本月一号是周一的情况下,周日除以7就是第几周
      res.week=new Date(wd).getDate() / 7;
      res.month = new Date(d).getMonth() + 1;
    }else {
      //周日 日期 减去第一周天数 除以7再加一就是第几周
      res.week=(new Date(wd).getDate() - (8- new Date(monthHead).getDay()))/ 7 +1
      res.month = new Date(d).getMonth() + 1;
    }
    return res
  },
  lengthVali(num,str){
    if(str == undefined || str == null || str.length <= num){
      return true;
    }else{
      return false;
    }
  }
}
