/*
 * @Description: 商品类型
 * @Author: Mogy
 * @Date: 2022-02-05 12:24:38
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-05 23:53:14
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryType (params) {
    return request({
        url: '/product/type/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/product/type/deleteById',
        method: 'delete',
        params
    })
}

// 更新或新增
export function saveOrUpdate (params) {
    return request({
        url: '/product/type/saveOrUpdate',
        method: 'post',
        data: params
    })
}

