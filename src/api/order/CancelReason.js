/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-10 22:58:13
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-11 11:18:23
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryOrderReturnReason (params) {
    return request({
        url: '/order/orderReturnReason/pageQuery',
        method: 'get',
        params
    })
}

// 删除
export function deleteById (params) {
    return request({
        url: '/order/orderReturnReason/deleteById',
        method: 'delete',
        params
    })
}

// 更新或新增
export function saveOrUpdateReturnReason (params) {
    return request({
        url: '/order/orderReturnReason/saveOrUpdate',
        method: 'post',
        data: params
    })
}
