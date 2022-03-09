/*
 * @Description: 品牌管理
 * @Author: Mogy
 * @Date: 2021-12-07 14:29:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-07 11:55:31
 */
import request from '@/utils/request'

export function getBrandList (params) {
    return request({
        url: '/product/brand/findAll',
        method: 'get',
        params
    })
}

// 分页查询
export function pageQueryBrand (params) {
    return request({
        url: '/product/brand/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/product/brand/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateBrand (params) {
    return request({
        url: '/product/brand/saveOrUpdate',
        method: 'post',
        data: params
    })
}
