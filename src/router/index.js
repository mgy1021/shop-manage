import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },

    // {
    //     path: '/product',
    //     component: Layout,
    //     redirect: '/product/productlist',
    //     name: 'Product',
    //     meta: { title: '商品', icon: 'el-icon-s-help' },
    //     children: [
    //         {
    //             path: 'productlist',
    //             name: 'ProductList',
    //             component: () => import('@/views/product/List'),
    //             meta: { title: '商品列表', icon: 'table' }
    //         },
    //         {
    //             path: 'addproduct',
    //             name: 'AddProduct',
    //             component: () => import('@/views/product/AddProduct'),
    //             meta: { title: '添加商品', icon: 'tree' }
    //         },
    //         {
    //             path: 'productcategory',
    //             name: 'ProductCategory',
    //             component: () => import('@/views/product/ProductCategory'),
    //             meta: { title: '商品分类', icon: 'tree' }
    //         },
    //         {
    //             path: 'addProductCate',
    //             name: 'AddProductCate',
    //             component: () => import('@/views/product/AddProductCate'),
    //             meta: { title: '新增商品分类', icon: 'tree' },
    //             hidden: true
    //         },
    //         {
    //             path: 'productType',
    //             name: 'ProductType',
    //             component: () => import('@/views/product/ProductType'),
    //             meta: { title: '商品类型', icon: 'tree' },
    //         },
    //         {
    //             path: 'productAttrList',
    //             name: 'ProductAttrList',
    //             component: () => import('@/views/product/ProductAttrList'),
    //             meta: { title: '商品属性列表', icon: 'tree' },
    //             hidden: true
    //         },
    //         {
    //             path: 'addProductAttr',          //添加商品属性
    //             name: 'AddProductAttr',
    //             component: () => import('@/views/product/AddProductAttr'),
    //             meta: { title: '商品类型', icon: 'tree' },
    //             hidden: true
    //         }, {
    //             path: 'brand',                  //品牌管理
    //             name: 'Brand',
    //             component: () => import('@/views/product/Brand'),
    //             meta: { title: '品牌管理', icon: 'tree' },
    //         },
    //     ]
    // },

    // {
    //     path: '/order',
    //     name: 'Order',
    //     component: Layout,
    //     redirect: '/order/orderList',
    //     meta: { title: '订单', icon: 'el-icon-s-help' },
    //     children: [
    //         {
    //             path: 'orderList',
    //             name: 'OrderList',
    //             component: () => import('@/views/order/OrderList'),
    //             meta: { title: '订单列表', icon: 'form' }
    //         },
    //         {
    //             path: 'orderSetup',
    //             name: 'OrderSetup',
    //             component: () => import('@/views/order/OrderSetup'),
    //             meta: { title: '订单设置', icon: 'form' }
    //         },
    //         {
    //             path: 'cancelOrders',
    //             name: 'CancelOrders',
    //             component: () => import('@/views/order/CancelOrders'),
    //             meta: { title: '退货申请处理', icon: 'form' }
    //         },
    //         {
    //             path: 'cancelReason',
    //             name: 'CancelReason',
    //             component: () => import('@/views/order/CancelReason'),
    //             meta: { title: '退货原因设置', icon: 'form' }
    //         },
    //         {
    //             path: 'orderDetail',
    //             name: 'OrderDetail',
    //             component: () => import('@/views/order/OrderDetail'),
    //             meta: { title: '订单详情页', icon: 'form' },
    //             hidden: true
    //         },
    //         {
    //             path: 'returnOrderApply',
    //             name: 'ReturnOrderApply',
    //             component: () => import('@/views/order/ReturnOrderApply'),
    //             meta: { title: '退货申请处理详情', icon: 'form' },
    //             hidden: true
    //         }
    //     ]
    // },

    // {
    //     path: '/marketing',
    //     component: Layout,
    //     redirect: '/marketing/seckillActivity',
    //     name: 'Marketing',
    //     meta: {
    //         title: '营销',
    //         icon: 'nested'
    //     },
    //     children: [
    //         {
    //             path: 'seckillActivity',
    //             component: () => import('@/views/marketing/SeckillActivity'), // Parent router-view
    //             name: 'SeckillActivity',
    //             meta: { title: '秒杀活动列表', icon: 'nested' },
    //         },
    //         {
    //             path: 'couponList',
    //             component: () => import('@/views/marketing/CouponList'),
    //             name: 'CouponList',
    //             meta: { title: '优惠卷列表', icon: 'nested' }
    //         },
    //         {
    //             path: 'brandRecommend',
    //             component: () => import('@/views/marketing/BrandRecommend'),
    //             name: 'BrandRecommend',
    //             meta: { title: '品牌推荐', icon: 'nested' }
    //         },
    //         {
    //             path: 'newProductRecommend',
    //             component: () => import('@/views/marketing/NewProductRecommend'),
    //             name: 'NewProductRecommend',
    //             meta: { title: '新品推荐', icon: 'nested' }
    //         },
    //         {
    //             path: 'popularityRecommendation',
    //             component: () => import('@/views/marketing/PopularityRecommendation'),
    //             name: 'PopularityRecommendation',
    //             meta: { title: '人气推荐', icon: 'nested' }
    //         },
    //         {
    //             path: 'specialRecommendation',
    //             component: () => import('@/views/marketing/SpecialRecommendation'),
    //             name: 'SpecialRecommendation',
    //             meta: { title: '专题推荐', icon: 'nested' }
    //         },
    //         {
    //             path: 'advertisingList',
    //             component: () => import('@/views/marketing/AdvertisingList'),
    //             name: 'AdvertisingList',
    //             meta: { title: '广告列表', icon: 'nested' }
    //         }
    //     ]
    // },

    // {
    //     path: '/authority',
    //     component: Layout,
    //     redirect: '/authority/userList',
    //     name: 'Authority',
    //     meta: {
    //         title: '权限',
    //         icon: 'nested'
    //     },
    //     children: [
    //         {
    //             path: 'userList',
    //             component: () => import('@/views/authority/UserList'),
    //             name: 'UserList',
    //             meta: { title: '用户列表', icon: 'link' }
    //         },
    //         {
    //             path: 'roleList',
    //             component: () => import('@/views/authority/RoleList'),
    //             name: 'RoleList',
    //             meta: { title: '角色列表', icon: 'link' }
    //         },
    //         {
    //             path: 'menuList',
    //             component: () => import('@/views/authority/MenuList'),
    //             name: 'MenuList',
    //             meta: { title: '菜单列表', icon: 'link' }
    //         },
    //         {
    //             path: 'resourceList',
    //             component: () => import('@/views/authority/ResourceList'),
    //             name: 'ResourceList',
    //             meta: { title: '资源列表', icon: 'link' }
    //         }, {
    //             path: 'resourceCategoryList',
    //             component: () => import('@/views/authority/ResourceCategoryList'),
    //             name: 'ResourceCategoryList',
    //             meta: { title: '资源分类列表', icon: 'link' },
    //             hidden: true
    //         }, {
    //             path: 'assignMenu',
    //             component: () => import('@/views/authority/AssignMenu'),
    //             name: 'AssignMenu',
    //             meta: { title: '分配菜单', icon: 'link' },
    //             hidden: true
    //         }
    //     ]
    // },

    // 404 page must be placed at the end !!!
    // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
