/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-09 15:13:00
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-09 15:13:00
 */
/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-08 09:18:06
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-09 11:03:47
 */
import request from '@/utils/request'



// 查询一个订单中多个订单商品信息
export function findAllOrderItem (params) {
    return request({
        url: '/order/orderItem/findAllOrderItem',
        method: 'get',
        params
    })
}
