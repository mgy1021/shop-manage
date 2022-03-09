/*
 * @Description: 商品分类
 * @Author: Mogy
 * @Date: 2022-01-28 10:29:15
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-27 23:57:38
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryStock (params) {
    return request({
        url: '/product/pms_sku_stock/pageQuery',
        method: 'get',
        params
    })
}


// 更新或新增
export function saveOrUpdateStock (params) {
    return request({
        url: '/product/pms_sku_stock/saveOrUpdate',
        method: 'post',
        data: params
    })
}