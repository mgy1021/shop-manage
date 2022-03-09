/*
 * @Description: 人气推荐API
 * @Author: Mogy
 * @Date: 2022-02-23 22:35:17
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-24 16:10:17
 */

import request from '@/utils/request'

// 分页查询
export function pageQueryHomeRecommendProduct (params) {
    return request({
        url: '/marketing/home_recommend_product/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/home_recommend_product/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateHomeRecommendProduct (params) {
    return request({
        url: '/marketing/home_recommend_product/saveOrUpdate',
        method: 'post',
        data: params
    })
}
