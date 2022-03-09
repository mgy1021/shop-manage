/*
 * @Description: 商品分类
 * @Author: Mogy
 * @Date: 2022-01-28 10:29:15
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-04 18:13:43
 */
import request from '@/utils/request'

// 查询所有分类
export function getAllCategory (params) {
    return request({
        url: '/product/category/findAll',
        method: 'get',
        params
    })
}

// 通过id查询
export function queryOneById (params) {
    return request({
        url: '/product/category/queryOneById',
        method: 'get',
        params
    })
}

// 分页查询
export function pageQueryCategory (params) {
    return request({
        url: '/product/category/pageQuery',
        method: 'get',
        params
    })
}

// 删除
export function deleteById (params) {
    return request({
        url: '/product/category/deleteById',
        method: 'delete',
        params
    })
}

// 更新或新增
export function saveOrUpdate (params) {
    return request({
        url: '/product/category/saveOrUpdate',
        method: 'post',
        data: params
    })
}