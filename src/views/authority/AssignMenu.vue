<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-16 09:25:10
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-26 23:21:40
-->
<template>
  <div class="app-container">
    <div class="outer">
      <el-card shadow="never" class="order_content">
        <el-tree
          ref="tree"
          :props="props"
          :data="data"
          show-checkbox
          :getCurrentNode="getCurrentNode"
          :getHalfCheckedKeys="getHalfCheckedKeys"
          node-key="id"
          @check="handleNodeClick"
          :default-expanded-keys="[1, 7, 12, 21]"
          :default-checked-keys="menuIds"
        >
        </el-tree>
        <div>
          <div style="width: 150px; margin: 20px auto">
            <el-button type="primary" @click="toSave">保存</el-button>
            <el-button @click="resetChecked">清空</el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { pageQueryMenus } from "@/api/authority/menuList"
import { getMenuByRoleId, deleteByRoleId, saveOrUpdateRoleMenuRelation } from "@/api/authority/roleMenuRelation"

export default {
  data () {
    return {
      props: {
        label: 'title',
        children: 'children'
      },
      count: 1,
      data: [],
      menuIds: [],
      addMenuIds: []
    };
  },
  computed: {
    role_id () {
      return this.$route.query.role_id
    }
  },
  methods: {
    handleNodeClick (row, data) {
      //   console.log(data.checkedKeys);
      //   let arr = [...data.checkedKeys, ...this.menuIds]
      this.addMenuIds = data.checkedKeys
      console.log(this.addMenuIds);
    },
    async pageQueryMenusData () {
      let res = await pageQueryMenus({ pageNum: 1, pageSize: 100 })
      let arr = res.data.filter((item, index) => {
        return item.level == 0
      });
      arr.forEach((item, index) => {
        arr[index].children = res.data.filter((i, index) => {
          return i.parent_id == item.id
        });
      });
      this.data = arr
    },
    async getMenuByRoleIdData () {
      let res = await getMenuByRoleId({ role_id: this.role_id })
      //   console.log(res, "res");
      this.menuIds = res.data.map((item) => {
        return item.id
      })
      console.log(this.menuIds);
    },
    getCurrentNode (value) {
      console.log(value);
    },
    getHalfCheckedKeys (value) {
      console.log(value);
    },
    resetChecked () {
      this.$refs.tree.setCheckedKeys([]);
    },
    async toSave () {
      if (this.addMenuIds.length <= 0) {
        return
      }
      await deleteByRoleId({ role_id: this.role_id })
      console.log(this.addMenuIds, "addMenuIds");
      this.addMenuIds.forEach(async (item) => {
        let temp = { role_id: this.role_id, menu_id: item }
        let res = await saveOrUpdateRoleMenuRelation(temp)
      })
      this.$router.push("/authority/RoleList")
      this.$message({
        message: '分配菜单成功！',
        type: 'success'
      });
    }
  },
  created () {
    this.pageQueryMenusData()
    this.getMenuByRoleIdData()
  },
  mounted () { }
};
</script>
<style scoped>
.outer {
  padding: 30px 120px;
}
</style>