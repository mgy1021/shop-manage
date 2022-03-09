/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-08 09:18:06
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-10 17:05:25
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryOrderList (params) {
    return request({
        url: '/order/orderList/pageQuery',
        method: 'get',
        params
    })
}

// 通过id查询某一订单
export function queryOneById (params) {
    return request({
        url: '/order/orderList/queryOneById',
        method: 'get',
        params
    })
}

// 删除
export function deleteById (params) {
    return request({
        url: '/order/orderList/deleteById',
        method: 'delete',
        params
    })
}

// 更新或新增
export function saveOrUpdate (params) {
    return request({
        url: '/order/orderList/saveOrUpdate',
        method: 'post',
        data: params
    })
}

