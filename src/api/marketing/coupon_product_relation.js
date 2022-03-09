/*
 * @Description: 优惠券和商品的关系表
 * @Author: Mogy
 * @Date: 2022-02-26 13:30:50
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-26 13:30:50
 */
import request from '@/utils/request'

// 分页查询
export function pageQuerycoupon_product_relationList (params) {
    return request({
        url: '/marketing/coupon_product_relation/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/coupon_product_relation/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdatecoupon_product_relationList (params) {
    return request({
        url: '/marketing/coupon_product_relation/saveOrUpdate',
        method: 'post',
        data: params
    })
}

