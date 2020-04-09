
import axios from 'axios'
import qs from 'qs'; // 根据需求是否导入qs模块

//对axios进行二次封装
const service = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 10000,//请求超时
    transformRequest: [function (data) { return qs.stringify({ ...data }) }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }

})
//添加请求拦截器
service.interceptors.request.use(config => {
    // 请求之前判断token是否存在或者过去，如果过期直接跳转到登陆界面，再次获取token
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = token)//请求带上token
    return config;

}, error => {
    return Promise.reject(error);
})
// service.defaults.validateStatus=status=>{
//     //自定义响应成功的HTTP状态吗
//     return /^(2|3)d{2}$/.test(status);
// }
//添加响应拦截器
service.interceptors.response.use(response => {
    return response.data;
}, error => {
    let {response}=error
    if (response) {
        //=》服务器最起码返回结果
        switch(response.status){
            case 401: //=>权限
                break;
            case 403: //服务器拒绝执行（token过期）
                break;
        }
    } else {
        if (!window.navigator.onLine) {
            //断网处理：可以跳转到断网页面
            return;
        }
        return Promise.reject(error)
    }

    
})
export default service 