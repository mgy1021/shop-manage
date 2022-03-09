/*
 * @Description: 资源管理
 * @Author: Mogy
 * @Date: 2021-12-07 14:29:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-14 23:27:58
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryResource (params) {
    return request({
        url: '/authority/resource/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/authority/resource/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateResource (params) {
    return request({
        url: '/authority/resource/saveOrUpdate',
        method: 'post',
        data: params
    })
}
