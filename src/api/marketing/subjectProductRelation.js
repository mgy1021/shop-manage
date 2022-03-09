/*
 * @Description: 专题商品关系表
 * @Author: Mogy
 * @Date: 2022-02-23 22:35:17
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-27 20:42:00
 */

import request from '@/utils/request'

// 分页查询
export function pageQuerySubjectProductRelation (params) {
    return request({
        url: '/marketing/subject_product_relation/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/subject_product_relation/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateSubjectProductRelation (params) {
    return request({
        url: '/marketing/subject_product_relation/saveOrUpdate',
        method: 'post',
        data: params
    })
}
