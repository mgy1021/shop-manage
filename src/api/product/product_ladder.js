/*
 * @Description: 商品梯度价格
 * @Author: Mogy
 * @Date: 2022-02-27 22:37:49
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-27 22:37:49
 */
import request from '@/utils/request'

// 更新或新增
export function saveOrUpdateProductLadder (params) {
    return request({
        url: '/product/product_ladder/saveOrUpdate',
        method: 'post',
        data: params
    })
}

