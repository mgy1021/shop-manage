/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-20 10:35:48
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-23 13:46:56
 */
import { constantRoutes } from '@/router'
import getDyRoutes from '@/router/modules/dynamicMenu'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    // 合并之后的数组
    routes: [],
    // 动态路由数组
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes ({ commit }, id) {
        return new Promise(async resolve => {
            // 通过用户角色ID查询该用户可以访问到的菜单，转换为路由
            const rs = await getDyRoutes(id)
            const accessedRoutes = rs || []
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
