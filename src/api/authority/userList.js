/*
 * @Description: 用户管理
 * @Author: Mogy
 * @Date: 2021-12-07 14:29:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-13 16:37:38
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryUser (params) {
    return request({
        url: '/authority/userList/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/authority/userList/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateUser (params) {
    return request({
        url: '/authority/userList/saveOrUpdate',
        method: 'post',
        data: params
    })
}
