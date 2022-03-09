/*
 * @Description: 优惠券历史记录表
 * @Author: Mogy
 * @Date: 2022-02-26 15:00:04
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-26 15:28:33
 */
import request from '@/utils/request'


// 通过id查询
export function queryOneBycouponHistoryId (params) {
    return request({
        url: '/marketing/couponHistory/queryOneById',
        method: 'get',
        params
    })
}

// 分页查询
export function pageQueryCouponHistoryList (params) {
    return request({
        url: '/marketing/couponHistory/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/couponHistory/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateCouponHistoryList (params) {
    return request({
        url: '/marketing/couponHistory/saveOrUpdate',
        method: 'post',
        data: params
    })
}
