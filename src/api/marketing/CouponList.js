/*
 * @Description: 优惠卷列表API
 * @Author: Mogy
 * @Date: 2022-02-23 22:35:17
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-26 14:17:57
 */

import request from '@/utils/request'


// 通过id查询
export function queryOneByCouponId (params) {
    return request({
        url: '/marketing/coupon/queryOneById',
        method: 'get',
        params
    })
}

// 分页查询
export function pageQueryCouponList (params) {
    return request({
        url: '/marketing/coupon/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/coupon/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateCouponList (params) {
    return request({
        url: '/marketing/coupon/saveOrUpdate',
        method: 'post',
        data: params
    })
}
