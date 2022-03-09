/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-06 10:21:29
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-06 22:24:32
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryAttribute (params) {
    return request({
        url: '/product/attribute/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/product/attribute/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateAttribute (params) {
    return request({
        url: '/product/attribute/saveOrUpdate',
        method: 'post',
        data: params
    })
}