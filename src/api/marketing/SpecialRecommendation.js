/*
 * @Description: 专题推荐API
 * @Author: Mogy
 * @Date: 2022-02-23 22:35:17
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-24 17:31:55
 */

import request from '@/utils/request'

// 分页查询
export function pageQueryHomeRecommendSubject (params) {
    return request({
        url: '/marketing/home_recommend_subject/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/home_recommend_subject/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateHomeRecommendSubject (params) {
    return request({
        url: '/marketing/home_recommend_subject/saveOrUpdate',
        method: 'post',
        data: params
    })
}
