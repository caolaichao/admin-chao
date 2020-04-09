import service from '../utils/request'
//登陆接口
export function getLogin(parameter){
    return service({
        url:'/login',
        method:'post',
        data:parameter,
    })
}