/*
 * @Description: 资源管理
 * @Author: Mogy
 * @Date: 2021-12-07 14:29:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-15 09:30:07
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryresourceCategory (params) {
    return request({
        url: '/authority/resource_category/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/authority/resource_category/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateresourceCategory (params) {
    return request({
        url: '/authority/resource_category/saveOrUpdate',
        method: 'post',
        data: params
    })
}
