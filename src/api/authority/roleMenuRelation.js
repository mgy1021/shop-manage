/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-26 17:36:46
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-26 20:45:46
 */
import request from '@/utils/request'

// 根据role_id查询能访问的菜单
export function getMenuByRoleId (params) {
    return request({
        url: '/authority/menuByRoleId/queryOneById',
        method: 'get',
        params
    })
}

// 通过role_id删除
export function deleteByRoleId (params) {
    return request({
        url: '/authority/role_menu_relation/deleteByRoleId',
        method: 'delete',
        params
    })
}

// 新增或修改
export function saveOrUpdateRoleMenuRelation (data) {
    return request({
        url: '/authority/role_menu_relation/saveOrUpdate',
        method: 'post',
        data
    })
}
