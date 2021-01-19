import Vue from 'vue'
// import config from '../../../public/config'
let host = localStorage.getItem('host')?localStorage.getItem('host'):'http://westice.xicp.net'
Vue.prototype.$apiUrl = {
    // 登陆
    loginUrl: host + '/v1/apis/user/login',
    getPriceDiffRatioList: host + '/getPriceDiffRatioList',
}