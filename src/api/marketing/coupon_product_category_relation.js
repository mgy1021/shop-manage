/*
 * @Description: 优惠券和商品分类关系表
 * @Author: Mogy
 * @Date: 2022-02-23 22:35:17
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-25 22:52:47
 */

import request from '@/utils/request'

// 分页查询
export function pageQuerycoupon_product_category_relationList (params) {
    return request({
        url: '/marketing/coupon_product_category_relation/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/coupon_product_category_relation/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdatecoupon_product_category_relationList (params) {
    return request({
        url: '/marketing/coupon_product_category_relation/saveOrUpdate',
        method: 'post',
        data: params
    })
}
