/*
 * @Description: 订单超时设置
 * @Author: Mogy
 * @Date: 2022-02-10 22:58:13
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-12 23:30:29
 */
import request from '@/utils/request'


// 更新或新增
export function saveOrUpdate (params) {
    return request({
        url: '/order/orderSetting/saveOrUpdate',
        method: 'post',
        data: params
    })
}

// 通过id查询
export function queryOneById (params) {
    return request({
        url: '/order/orderSetting/queryOneById',
        method: 'get',
        params
    })
}
