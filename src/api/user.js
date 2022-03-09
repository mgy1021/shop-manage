/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-12-02 15:31:51
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-27 14:35:21
 */
import request from '@/utils/request'

export function login (data) {
    return request({
        url: '/passport/login',
        method: 'post',
        data
    })
}

export function getInfo (token) {
    return request({
        url: '/passport/getUserInfo',
        method: 'get',
        params: { token }
    })
}

export function getRole (params) {
    return request({
        url: '/passport/ums_admin_role_relation/queryOneById',
        method: 'get',
        params
    })
}

export function logout () {
    return request({
        url: '/passport/logout',
        method: 'post'
    })
}

export function register (data) {
    return request({
        url: '/passport/register',
        method: 'post',
        data,
    })
}

// 获取验证码
export function getCode (id) {
    return request({
        url: '/passport/get_code/' + id,
        method: 'get',
    })
}
