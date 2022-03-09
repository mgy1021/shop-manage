/*
 * @Description: 菜单管理
 * @Author: Mogy
 * @Date: 2021-12-07 14:29:02
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-15 11:41:14
 */
import request from '@/utils/request'

// 分页查询
export function pageQueryMenus (params) {
    return request({
        url: '/authority/menu/pageQuery',
        method: 'get',
        params
    })
}

// 通过id删除
export function deleteById (params) {
    return request({
        url: '/authority/menu/deleteById',
        method: 'delete',
        params
    })
}

// 新增或者更新
export function saveOrUpdateMenus (params) {
    return request({
        url: '/authority/menu/saveOrUpdate',
        method: 'post',
        data: params
    })
}
