/*
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-12-02 15:31:51
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-26 17:46:41
 */
const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    role_id: state => state.user.roleIds,
    user: state => state.user.user,
    permission_routes: state => state.permission.routes,
}
export default getters
