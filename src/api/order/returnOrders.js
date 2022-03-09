/*
 * @Description: 退货申请
 * @Author: Mogy
 * @Date: 2022-02-10 22:58:13
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-11 16:39:34
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryreturnOrders (params) {
    return request({
        url: '/order/returnOrders/pageQuery',
        method: 'get',
        params
    })
}

// 删除
export function deleteById (params) {
    return request({
        url: '/order/returnOrders/deleteById',
        method: 'delete',
        params
    })
}

// 更新或新增
export function saveOrUpdateReturnOrders (params) {
    return request({
        url: '/order/returnOrders/saveOrUpdate',
        method: 'post',
        data: params
    })
}

// 通过id查询某一订单
export function queryOneById (params) {
    return request({
        url: '/order/returnOrders/queryOneById',
        method: 'get',
        params
    })
}
