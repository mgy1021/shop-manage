<!--
 * @Description: 资源分类
 * @Author: Mogy
 * @Date: 2022-02-13 11:58:03
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-15 11:03:20
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
        <el-table-column prop="name" label="资源分类名称" align="center">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
          width="300"
        >
          <template slot-scope="scope">
            {{ scope.row.create_time | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="300">
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
          label="资源名称:"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
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
import { pageQueryresourceCategory, deleteById, saveOrUpdateresourceCategory } from "@/api/authority/resourceCategoryList"
import moment from "moment"
export default {
  data () {
    return {
      tableData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      dialogFormVisible: false,
      form: {
        name: null,
        sort: 0
      },
      formLabelWidth: "120px",
      title: "添加分类",
      rules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' },
        ],
      }
    };
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryresourceCategoryData()
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
      this.$confirm('此操作将永久删除该资源分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQueryresourceCategoryData()
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
      this.title = "添加分类"
      this.form = {
        name: null,
        sort: 0
      }
      this.dialogFormVisible = true
    },
    toSubmit () {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (this.title == "添加分类") {
            this.form.create_time = moment(Date()).format("YYYY-MM-DD HH:mm:ss")
          } else {
            this.form.create_time = moment(this.form.create_time).format("YYYY-MM-DD HH:mm:ss")
          }
          let res = await saveOrUpdateresourceCategory(this.form)
          this.dialogFormVisible = false
          this.pageQueryresourceCategoryData()
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
      this.title = "编辑分类"
      this.form = row
      this.dialogFormVisible = true
    },
    async pageQueryresourceCategoryData () {
      let res = await pageQueryresourceCategory(this.params)
      this.tableData = res.data,
        this.total = res.total
    },
  },
  created () {
    this.pageQueryresourceCategoryData()
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