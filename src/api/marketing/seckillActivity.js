/*
 * @Description: 秒杀活动API
 * @Author: Mogy
 * @Date: 2021-12-07 14:29:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-22 14:35:13
 */
import request from '@/utils/request'

// 分页查询
export function pageQuerySeckillActivity (params) {
    return request({
        url: '/marketing/seckillActivity/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/marketing/seckillActivity/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateSeckillActivity (params) {
    return request({
        url: '/marketing/seckillActivity/saveOrUpdate',
        method: 'post',
        data: params
    })
}
