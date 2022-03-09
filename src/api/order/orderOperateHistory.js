/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-09 15:13:00
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-10 18:22:39
 */
/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-08 09:18:06
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-09 11:03:47
 */
import request from '@/utils/request'


export function findAllOrderOperateHistory (params) {
    return request({
        url: '/order/orderOperateHistory/findAllOrderOperateHistory',
        method: 'get',
        params
    })
}

// 更新或新增
export function saveOrUpdateOperate (params) {
    return request({
        url: '/order/orderOperateHistory/saveOrUpdate',
        method: 'post',
        data: params
    })
}

