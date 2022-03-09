/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-12-02 15:31:51
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-20 22:06:07
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken () {
    return Cookies.get(TokenKey)
}

export function setToken (token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken () {
    return Cookies.remove(TokenKey)
}
