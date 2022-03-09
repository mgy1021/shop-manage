/*
 * @Description:
 * @Author: Mogy
 * @Date: 2021-12-09 13:49:39
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 10:40:04
 */
import request from '@/utils/request'

export function findAll (params) {
    return request({
        url: '/product/list/findAll',
        method: 'get',
        params
    })
}
export function findOne (params) {
    return request({
        url: '/product/list/queryOneById',
        method: 'get',
        params
    })
}

export function pageQuery (params) {
    return request({
        url: '/product/list/pageQuery',
        method: 'get',
        params
    })
}

export function deleteById (params) {
    return request({
        url: '/product/list/deleteById',
        method: 'delete',
        params
    })
}

// 更新或新增
export function saveOrUpdateProduct (params) {
    return request({
        url: '/product/list/saveOrUpdate',
        method: 'post',
        data: params
    })
}