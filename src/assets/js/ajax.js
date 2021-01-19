
import Vue from 'vue'
import axios from 'axios'
import querystring from 'querystring'
import router from '../../router/index'
import { Message } from 'element-ui'
var ajax = function (type, url, data) {
    if (!data){
        data = {}
    }
    data['token'] = sessionStorage.getItem('token')
    if (type == 'post') {
        data = querystring.stringify(data)
    }
    if (type == 'get') {
        var dataStr = querystring.stringify(data)
        url = url + '?' + dataStr
    }
    return axios[type](url, data).then((res) => {
        // error值为-99时，跳转至登陆页
        if (res.data.code === -99) {
            // 如果登录失效了，保存该状态
            router.push('/login')
        }
        if (res.data.code != 0 && res.data.code != -99 && res.data.msg && res.data.msg.length != 0) {
            Message.error(res.data.msg)
        }
        return res.data
    }).catch((err) => {
        Message.error(err.message)
    })
}

// ajax
Vue.prototype.$ajax = {
    get: (url, data) => ajax('get', url, data),
    post: (url, data) => ajax('post', url, data),
}
