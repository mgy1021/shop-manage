/*
 * @Description: 限时购场次API
 * @Author: Mogy
 * @Date: 2021-12-07 14:29:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-22 22:32:48
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryFlashPromotionSession (params) {
    return request({
        url: '/marketing/flash_promotion_session/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/flash_promotion_session/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateFlashPromotionSession (params) {
    return request({
        url: '/marketing/flash_promotion_session/saveOrUpdate',
        method: 'post',
        data: params
    })
}
