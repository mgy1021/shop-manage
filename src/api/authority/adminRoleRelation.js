/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-12-07 14:29:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-13 23:06:31
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryRoleRelation (params) {
    return request({
        url: '/authority/ums_admin_role_relation/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/authority/ums_admin_role_relation/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateRoleRelation (params) {
    return request({
        url: '/authority/ums_admin_role_relation/saveOrUpdate',
        method: 'post',
        data: params
    })
}
