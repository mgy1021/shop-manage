/*
 * @Description: 品牌推荐API
 * @Author: Mogy
 * @Date: 2022-02-23 22:35:17
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-23 22:36:22
 */

import request from '@/utils/request'

// 分页查询
export function pageQueryBrandRecommend (params) {
    return request({
        url: '/marketing/home_brand/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/home_brand/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateBrandRecommend (params) {
    return request({
        url: '/marketing/home_brand/saveOrUpdate',
        method: 'post',
        data: params
    })
}
