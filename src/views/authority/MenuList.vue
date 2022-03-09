<!--
 * @Description: 菜单列表
 * @Author: Mogy
 * @Date: 2022-02-13 11:58:03
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-26 13:43:53
-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div>
          <el-button @click="toAdd">添加</el-button>
        </div>
      </div>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table class="table" :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="title" label="菜单名称" align="center">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            {{ scope.row.level == 0 ? "一级" : "二级" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="前端名称"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="icon" label="图标" align="center" width="150">
        </el-table-column>
        <el-table-column
          prop="hidden"
          label="是否显示"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.hidden"
              :active-value="1"
              :inactive-value="0"
              @change="toChangeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="150">
        </el-table-column>
        <el-table-column label="设置" width="120" align="center">
          <template slot-scope="scope">
            <div>
              <el-button
                type="text"
                @click="toLooknextLevel(scope.row.id)"
                :disabled="scope.row.level != 0"
                >查看下级</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="toEdit(scope.row)">编辑</el-button>
              <el-button type="text" @click="toDelete(scope.row.id)"
                >删除</el-button
              >
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
          label="菜单名称:"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="上级菜单:"
          :label-width="formLabelWidth"
          prop="parent_id"
          ><el-select v-model="form.parent_id" placeholder="请选择">
            <el-option
              v-for="item in oneLevelData"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
            <el-option label="无" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="前端名称:"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="前端图标:"
          :label-width="formLabelWidth"
          prop="icon"
        >
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示:" :label-width="formLabelWidth">
          <el-radio-group v-model="form.hidden">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序:" :label-width="formLabelWidth" prop="sort">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
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
import { pageQueryMenus, deleteById, saveOrUpdateMenus } from "@/api/authority/menuList"
import moment from "moment"
export default {
  data () {
    return {
      tableData: [],
      oneLevelData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      dialogFormVisible: false,
      form: {
        name: null,
        title: null,
        parent_id: 0,
        icon: null,
        sort: 0,
        hidden: 0
      },
      formLabelWidth: "120px",
      title: "添加菜单",
      rules: {
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入前端名称', trigger: 'blur' },
        ],
        icon: [
          { required: true, message: '请输入前端图标', trigger: 'blur' },
        ],
      },
      parent_id: 0
    };
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryMenusData()
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
    // 分页
    handleSizeChange (val) {
      this.params.pageSize = val
      this.params.pageNum = 1
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    toDelete (id) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQueryMenusData()
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
      this.title = "添加菜单"
      this.form = {
        name: null,
        title: null,
        parent_id: 0,
        icon: null,
        sort: 0,
        hidden: 0
      }
      this.dialogFormVisible = true
    },
    toSubmit () {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (this.title == "添加菜单") {
            this.form.create_time = moment(Date()).format("YYYY-MM-DD HH:mm:ss")
          } else {
            this.form.create_time = moment(this.form.create_time).format("YYYY-MM-DD HH:mm:ss")
          }
          if (!this.form.parent_id) {
            this.form.level = 0
          } else {
            this.form.level = 1
          }
          let res = await saveOrUpdateMenus(this.form)
          this.dialogFormVisible = false
          this.pageQueryMenusData()
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
      this.title = "编辑菜单"
      this.form = row
      this.dialogFormVisible = true
    },
    async pageQueryMenusData () {
      let temp = {
        ...this.params,
        parent_id: this.parent_id
      }
      let res = await pageQueryMenus(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    async pageQueryMenusOneLevel () {
      let temp = {
        ...this.params,
        level: 0
      }
      let res = await pageQueryMenus(temp)
      this.oneLevelData = res.data
    },
    async toLooknextLevel (id) {
      this.parent_id = id
      let temp = {
        ...this.params,
        parent_id: this.parent_id
      }
      let res = await pageQueryMenus(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    async toChangeSwitch (row) {
      row.create_time = moment(row.create_time).format("YYYY-MM-DD HH:mm:ss")
      let res = await saveOrUpdateMenus(row)
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
    },
  },
  created () {
    this.pageQueryMenusData()
    this.pageQueryMenusOneLevel()
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