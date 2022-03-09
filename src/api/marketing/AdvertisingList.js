/*
 * @Description: 广告列表API
 * @Author: Mogy
 * @Date: 2022-02-23 22:35:17
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-24 21:56:52
 */

import request from '@/utils/request'

// 分页查询
export function pageQueryAdvertisingList (params) {
    return request({
        url: '/marketing/home_advertise/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/home_advertise/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateAdvertisingList (params) {
    return request({
        url: '/marketing/home_advertise/saveOrUpdate',
        method: 'post',
        data: params
    })
}
