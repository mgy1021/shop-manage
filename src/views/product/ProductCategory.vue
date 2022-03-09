<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-01-30 11:20:26
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 11:08:29
-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div><el-button @click="toAdd">添加</el-button></div>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="分类名称" align="center">
        </el-table-column>
        <el-table-column prop="level" label="级别" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.level == 0 ? "一级" : "二级" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="product_count"
          label="商品数量"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="product_unit"
          label="数量单位"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="nav_status"
          label="导航栏"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="changeSwitch(scope.row)"
              v-model="scope.row.nav_status"
              :active-value="1"
              :inactive-value="0"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="show_status"
          label="是否显示"
          width="100"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="changeShowSwitch(scope.row)"
              v-model="scope.row.show_status"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="100" align="center">
        </el-table-column>
        <el-table-column prop="zip" label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="toLookNextCategory(scope.row.id)"
              :disabled="disabled"
              >查看下级</el-button
            >
            <!-- <el-button size="mini" @click="toDelete(scope.row.id)"
              >转移商品</el-button
            > -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { pageQueryCategory, deleteById, saveOrUpdate } from "@/api/product/category"
import { login } from '@/api/user';
export default {
  data () {
    return {
      tableData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      parent_id: 0,
      disabled: false
    };
  },
  computed: {},
  methods: {
    //   分页
    handleSizeChange (val) {
      this.params.pageSize = val
      this.params.pageNum = 1
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    async getCategoryData () {
      let temp = {
        ...this.params,
        parent_id: this.parent_id
      }
      let res = await pageQueryCategory(temp)
      //   console.log(res);
      this.total = res.total
      this.tableData = res.data
    },
    async changeSwitch (row) {
      let res = await saveOrUpdate(row)
      this.$message({
        message: '恭喜你，成功修改了导航栏的显示状态！',
        type: 'success'
      });
    },
    async changeShowSwitch (row) {
      let res = await saveOrUpdate(row)
      this.$message({
        message: '恭喜你，成功修改了显示状态！',
        type: 'success'
      });
    },
    // 删除
    handleDelete (id) {
      this.$confirm('此操作将永久删除该商品分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        // console.log(res);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getCategoryData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 新增
    toAdd () {
      this.$router.push("/product/AddProductCate")
    },
    // 修改
    handleEdit (row) {
      this.$router.push({ path: "/product/addProductCate", query: { id: row.id } })
      //   console.log(row);
    },
    // 获取下一级
    toLookNextCategory (id) {
      this.params.pageNum = 1
      this.disabled = true
      this.parent_id = id
      this.getCategoryData()
    }
  },
  watch: {
    params: {
      handler () {
        this.getCategoryData()
      },
      deep: true
    }
  },
  created () {
    this.getCategoryData()
  },
  mounted () { }
};
</script>
<style scoped>
.box-card {
  margin-bottom: 20px;
}
.box-card-addbox {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
}
</style>