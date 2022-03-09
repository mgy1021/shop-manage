/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-08 09:18:06
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-12 11:30:10
 */
import request from '@/utils/request'

export function queryAllCompanyAddress (params) {
    return request({
        url: '/order/companyAddress/findAllCompanyAddress',
        method: 'get',
        params
    })
}

export function queryOneCompanyAddress (params) {
    return request({
        url: '/order/companyAddress/queryOneById',
        method: 'get',
        params
    })
}



