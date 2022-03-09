/*
 * @Description: 新品推荐API
 * @Author: Mogy
 * @Date: 2022-02-23 22:35:17
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-24 12:08:12
 */

import request from '@/utils/request'

// 分页查询
export function pageQueryNewProRecommend (params) {
    return request({
        url: '/marketing/home_new_product/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/home_new_product/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateNewProRecommend (params) {
    return request({
        url: '/marketing/home_new_product/saveOrUpdate',
        method: 'post',
        data: params
    })
}
