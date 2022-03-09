/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-20 10:41:12
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 09:07:57
 */
// 动态路由
import request from '@/utils/request'
import Layout from '@/layout'
import { construct } from '@aximario/json-tree'
// import orderList from "@/views/order/OrderList.vue"

async function parseMenu (id) {
    const response = await request.get('/authority/menuByRoleId/queryOneById?role_id=' + id)
    const privileges = construct(response.data, {
        id: 'id',
        pid: 'parent_id',
        children: 'children'
    })

    const routes = []
    for (const privilege of privileges) {
        if (privilege.type === 'menu') {
            const route = {
                path: privilege.route,
                component: Layout,
                meta: { title: privilege.name, icon: privilege.icon, affix: true },
                children: [],
                hidden: privilege.hidden != 1
            }
            if (privilege.children && privilege.children.length > 0) {
                for (const p of privilege.children) {
                    const son_route = {
                        path: p.route,
                        // component: () => import('@/views'+p.route),
                        component: function component (resolve) {
                            require(['@/views' + p.route], resolve)
                        },
                        name: p.route.replace(/\//g, '_'),
                        meta: { title: p.name, affix: true },
                        hidden: p.hidden != 1
                    }
                    route.children.push(son_route)
                }
            }
            routes.push(route)
        }
    }
    routes.push({ path: '*', redirect: '/404', hidden: true })
    return routes
}
// let routes = parseMenu();

export default parseMenu

