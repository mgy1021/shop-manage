/*
 * @Description: 商品满减
 * @Author: Mogy
 * @Date: 2022-02-27 22:41:43
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-27 22:42:47
 */
import request from '@/utils/request'

// 更新或新增
export function saveOrUpdateProductFullReduction (params) {
    return request({
        url: '/product/product_full_reduction/saveOrUpdate',
        method: 'post',
        data: params
    })
}