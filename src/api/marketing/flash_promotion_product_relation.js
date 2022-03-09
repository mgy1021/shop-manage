/*
 * @Description: 限时购场次获取商品API
 * @Author: Mogy
 * @Date: 2021-12-07 14:29:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-22 23:06:06
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryFlashActiviryProduct (params) {
    return request({
        url: '/marketing/flash_promotion_product_relation/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/flash_promotion_product_relation/deleteById',
        method: 'delete',
        params
    })
}


// 通过限时购id(flash_promotion_id)获取
export function findProductByFlashPromotionId (params) {
    return request({
        url: '/marketing/flash_promotion_product_relation/queryActiviryProductById',
        method: 'get',
        params
    })
}

// 新增或者更新
export function saveOrUpdateFlashActiviryProduct (params) {
    return request({
        url: '/marketing/flash_promotion_product_relation/saveOrUpdate',
        method: 'post',
        data: params
    })
}
