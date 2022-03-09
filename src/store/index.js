/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-12-02 15:31:51
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-20 10:50:21
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        settings,
        user,
        permission
    },
    getters
})

export default store
