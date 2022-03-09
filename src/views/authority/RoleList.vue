<!--
 * @Description: 角色列表
 * @Author: Mogy
 * @Date: 2022-02-13 11:58:03
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 11:03:29
-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="box-card-top">
        <div><i class="el-icon-search mr10px size18px"></i>筛选搜索</div>
        <div>
          <el-button @click="toReset">重置</el-button>
          <el-button type="primary" @click="toSearch">查询结果</el-button>
        </div>
      </div>
      <div class="box-card-content-box">
        <div class="box-card-content">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-row>
              <el-col :span="10"
                ><el-form-item label="输入搜索:">
                  <el-input
                    clearable
                    v-model="formInline.name"
                    placeholder="角色名字"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8"></el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div><el-button @click="toAdd">添加</el-button></div>
      </div>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table class="table" :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="角色名称" align="center">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="admin_count"
          label="用户数"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="添加时间"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            {{ scope.row.create_time | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="是否启用"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="toChangeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <div class="btn_box">
              <el-button type="text" @click="toAssignMenu(scope.row.id)"
                >分配菜单</el-button
              >
              <el-button type="text" @click="toEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="toDelete(scope.row.id)"
                >删除</el-button
              >
              <!-- <el-button type="text" @click="toAssignRoles(scope.row.id)"
                >分配资源</el-button
              > -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pageNum"
        :page-sizes="[5, 8, 10, 20]"
        :page-size="params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%">
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="角色名称:"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="是否启用:" :label-width="formLabelWidth">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageQueryRoles, saveOrUpdateRole, deleteById } from "@/api/authority/roleList"
import { saveOrUpdateRoleRelation } from "@/api/authority/adminRoleRelation"
import moment from "moment"
export default {
  data () {
    return {
      formInline: {
        name: null,
      },
      tableData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      dialogFormVisible: false,
      form: {
        name: null,
        status: 0,
        description: ""
      },
      formLabelWidth: "120px",
      title: "添加角色",
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ],
      }
    };
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryRoleData()
      },
      deep: true
    }
  },
  computed: {},
  filters: {
    timeFormat (time) {
      if (!time) {
        return ""
      }
      return moment(time).format("YYYY-MM-DD HH:mm:ss")
    },
  },
  methods: {
    //   重置
    toReset () {
      this.formInline = {
        name: null
      }
      this.pageQueryRoleData()
    },
    // 条件查询
    toSearch () {
      this.params.pageNum = 1
      this.pageQueryRoleData()
    },
    // 分页
    handleSizeChange (val) {
      this.params.pageSize = val
      this.params.pageNum = 1
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    async pageQueryRoleData () {
      let temp = {
        ...this.params,
        ...this.formInline
      }
      let res = await pageQueryRoles(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    toDelete (id) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQueryRoleData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 添加
    toAdd () {
      this.title = "添加角色"
      this.form = {
        name: null,
        status: 0,
        description: "",
        admin_count: 0
      }
      this.dialogFormVisible = true
    },
    toSubmit () {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (this.title == "添加角色") {
            this.form.create_time = moment(Date()).format("YYYY-MM-DD HH:mm:ss")
          } else {
            this.form.create_time = moment(this.form.create_time).format("YYYY-MM-DD HH:mm:ss")
          }
          let res = await saveOrUpdateRole(this.form)
          this.dialogFormVisible = false
          this.pageQueryRoleData()
          this.$message({
            message: '恭喜你，操作成功！',
            type: 'success'
          });
        } else {
          this.$notify({
            title: '警告',
            message: '输入内容不正确',
            type: 'warning'
          });
          return false;
        }
      });

    },
    // 编辑
    toEdit (row) {
      this.title = "编辑用户"
      this.form = row
      this.dialogFormVisible = true
    },
    async toChangeSwitch (row) {
      row.create_time = moment(row.create_time).format("YYYY-MM-DD HH:mm:ss")
      let res = await saveOrUpdateRole(row)
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
    },
    toAssignRoles (id) {
      this.Visible = true
      this.pageQueryRoles()
      this.dialogForm.admin_id = id
    },
    toAssignMenu (id) {
      this.$router.push({ path: "/authority/AssignMenu", query: { role_id: id } })
    }
  },
  created () {
    this.pageQueryRoleData()
  },
  mounted () { }
};
</script>
<style lang="scss" scoped>
.app-container {
  .box-card {
    margin-bottom: 20px;
    .box-card-top {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
      margin-bottom: 20px;
    }
    .box-card-content-box {
      .box-card-content {
        width: 90%;
        margin: 0 auto;
        // background: yellow;
      }
    }
    .box-card-addbox {
      display: flex;
      justify-content: space-between;
      line-height: 30px;
    }
    // .table {
    //   .scope_item {
    //     margin: 14px 0;
    //   }
    //   .btn_box {
    //     display: flex;
    //     margin: 14px 0;
    //   }
    // }
    .numbercolor {
      color: #409eff;
    }
  }
  ::v-deep.el-dialog {
    .el-form-item__content {
      width: 300px;
    }
  }
}
</style>