/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-25 17:16:32
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-25 17:17:33
 */
import request from '@/utils/request'

export function getQiuNiuToken () {
    return request({
        url: '/config/imgToken',
        method: 'post',
    })
}
