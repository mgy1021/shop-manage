/*
 * @Description: 专题列表API
 * @Author: Mogy
 * @Date: 2022-02-23 22:35:17
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-24 17:50:31
 */

import request from '@/utils/request'

// 分页查询
export function pageQuerySubject (params) {
    return request({
        url: '/marketing/subject/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/subject/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateSubject (params) {
    return request({
        url: '/marketing/subject/saveOrUpdate',
        method: 'post',
        data: params
    })
}
