/*
 * @Description: 用户管理
 * @Author: Mogy
 * @Date: 2021-12-07 14:29:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-13 17:22:00
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryRoles (params) {
    return request({
        url: '/authority/roleList/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/authority/roleList/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateRole (params) {
    return request({
        url: '/authority/roleList/saveOrUpdate',
        method: 'post',
        data: params
    })
}
