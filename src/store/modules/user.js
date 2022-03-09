/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-12-02 15:31:51
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 09:23:37
 */
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import request from '@/utils/request'


const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        userId: '',
        roles: [],
        roleIds: [],
        user: {},
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLE_IDS: (state, roleIds) => {
        state.roleIds = roleIds
    },
    SET_USER_ID: (state, userId) => {
        state.userId = userId
    },
    SET_USER: (state, user) => {
        state.user = user
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    },
}

const actions = {
    // user login
    login ({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                const { data } = response
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
            // commit('SET_TOKEN', "data.token")
            // setToken("data.token")
            // resolve()
        })
    },

    // get user info
    getInfo ({ commit, state }) {
        return new Promise((resolve, reject) => {
            // console.log(state.token);
            getInfo(state.token).then(async response => {
                const { data } = response

                if (!data) {
                    return reject('Verification failed, please Login again.')
                }
                commit('SET_USER', data)
                const { nick_name: name, icon: avatar, id } = data
                const { data: rolesArr } = await request.get('/authority/roleByAdminId/queryOneById?admin_id=' + id)
                data.roles = rolesArr
                const roles = data.roles.map(item => item.name)
                const roleIds = data.roles.map(item => item.id)
                commit('SET_ROLE_IDS', roleIds)
                // roles must be a non-empty array
                // roles.push('admin')
                if (!roles || roles.length <= 0) {
                    reject('该用户还未被授权访问！(getInfo: roles must be a non-null array!)')
                }
                commit('SET_NAME', name)
                commit('SET_ROLES', roles)
                commit('SET_AVATAR', avatar)
                commit('SET_USER_ID', id)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout ({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // must remove  token  first
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken ({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

