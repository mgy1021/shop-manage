<!--
 * @Description: 角色列表
 * @Author: Mogy
 * @Date: 2022-02-13 11:58:03
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-15 10:46:50
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
              <el-col :span="8"
                ><el-form-item label="输入搜索:">
                  <el-input
                    clearable
                    v-model="formInline.name"
                    placeholder="角色名字"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="资源路径:">
                  <el-input
                    clearable
                    v-model="formInline.url"
                    placeholder="资源路径"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="资源分类:">
                  <el-select
                    v-model="formInline.category_id"
                    placeholder="请选择"
                    clearable
                  >
                    <el-option
                      v-for="item in categoryOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div>
          <el-button @click="toResourceCategoryList">资源分类</el-button
          ><el-button @click="toAdd">添加</el-button>
        </div>
      </div>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table class="table" :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="资源名称" align="center">
        </el-table-column>
        <el-table-column prop="url" label="资源路径" align="center" width="220">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
          width="220"
        >
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="添加时间"
          align="center"
          width="220"
        >
          <template slot-scope="scope">
            {{ scope.row.create_time | timeFormat }}
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
          label="资源名称:"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="资源路径:"
          :label-width="formLabelWidth"
          prop="url"
        >
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="资源分类:"
          :label-width="formLabelWidth"
          prop="category_id"
        >
          <el-select v-model="form.category_id" placeholder="请选择" clearable>
            <el-option
              v-for="item in categoryOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageQueryresourceCategory } from "@/api/authority/resourceCategoryList"
import { pageQueryResource, saveOrUpdateResource, deleteById } from "@/api/authority/resourceList"
import moment from "moment"
export default {
  data () {
    return {
      formInline: {
        name: null,
        category_id: "",
        url: "",
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
        url: "",
        category_id: ""
      },
      formLabelWidth: "120px",
      title: "添加资源",
      categoryOptions: [],
      rules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' },
        ],
        category_id: [
          { required: true, message: '请选择资源分类', trigger: 'blur' },
        ],
        url: [
          { required: true, message: '请输入资源路径', trigger: 'blur' },
        ],
      }
    };
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryResourceData()
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
        name: null,
        category_id: "",
        url: "",
      }
      this.pageQueryResourceData()
    },
    // 条件查询
    toSearch () {
      this.params.pageNum = 1
      this.pageQueryResourceData()
    },
    // 分页
    handleSizeChange (val) {
      this.params.pageSize = val
      this.params.pageNum = 1
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    async pageQueryResourceData () {
      let temp = {
        ...this.params,
        ...this.formInline
      }
      let res = await pageQueryResource(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    toDelete (id) {
      this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQueryResourceData()
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
      this.title = "添加资源"
      this.form = {
        name: null,
        description: "",
        url: "",
        category_id: ""
      }
      this.dialogFormVisible = true
    },
    toSubmit () {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (this.title == "添加资源") {
            this.form.create_time = moment(Date()).format("YYYY-MM-DD HH:mm:ss")
          } else {
            this.form.create_time = moment(this.form.create_time).format("YYYY-MM-DD HH:mm:ss")
          }
          let res = await saveOrUpdateResource(this.form)
          this.dialogFormVisible = false
          this.pageQueryResourceData()
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
      this.title = "编辑资源"
      this.form = row
      this.dialogFormVisible = true
    },
    async pageQueryresourceCategory () {
      let res = await pageQueryresourceCategory({ pageNum: 1, pageSize: 100 })
      this.categoryOptions = res.data
    },
    // 跳转资源分类
    toResourceCategoryList () {
      this.$router.push({ path: "/authority/resourceCategoryList" })
    }
  },
  created () {
    this.pageQueryresourceCategory()
    this.pageQueryResourceData()
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