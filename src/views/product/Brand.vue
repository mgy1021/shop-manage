<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-07 10:35:12
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-07 14:40:28
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
                    placeholder="输入搜索"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8"></el-col>
              <el-col :span="8"></el-col>
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
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>
        <el-table-column prop="id" label="编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="品牌名称" align="center">
        </el-table-column>
        <el-table-column
          prop="first_letter"
          label="品牌首字母"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="100">
        </el-table-column>
        <el-table-column
          prop="factory_status"
          label="品牌制造商"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.factory_status"
              :active-value="1"
              :inactive-value="0"
              @change="toChangeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="show_status"
          label="是否显示"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.show_status"
              :active-value="1"
              :inactive-value="0"
              @change="toChangeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="相关" align="center" width="220">
          <template slot-scope="scope">
            <div>
              <span style="margin-right: 10px"
                >商品：<span class="numbercolor">{{
                  scope.row.product_count
                }}</span></span
              >
              <span
                >评价：<span class="numbercolor">{{
                  scope.row.product_comment_count
                }}</span></span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <div class="btn_box">
              <el-button @click="toEdit(scope.row)">编辑</el-button>
              <el-button type="danger" @click="toDelete(scope.row.id)"
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="品牌名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌首字母:" :label-width="formLabelWidth">
          <el-input v-model="form.first_letter" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌 Logo:" :label-width="formLabelWidth">
          <el-input v-model="form.logo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌专区大图:" :label-width="formLabelWidth">
          <el-input v-model="form.big_pic" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌故事:" :label-width="formLabelWidth">
          <el-input v-model="form.brand_story" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序:" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否显示:" :label-width="formLabelWidth">
          <el-radio-group v-model="form.show_status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="品牌制造商:" :label-width="formLabelWidth">
          <el-radio-group v-model="form.factory_status">
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
import { pageQueryBrand, deleteById, saveOrUpdateBrand } from "@/api/product/brand"
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
        first_letter: null,
        sort: 0,
        factory_status: 0,
        show_status: 0,
        logo: null,
        big_pic: null,
        brand_story: null,
        product_count: 0,
        product_comment_count: 0
      },
      formLabelWidth: "120px",
      title: "添加商品品牌"
    };
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryBrand()
      },
      deep: true
    }
  },
  computed: {},
  methods: {
    //   重置
    toReset () {
      this.formInline = {
        name: null
      }
      this.pageQueryBrand()
    },
    // 条件查询
    toSearch () {
      this.params.pageNum = 1
      this.pageQueryBrand()
    },
    // 分页
    handleSizeChange (val) {
      this.params.pageSize = val
      this.params.pageNum = 1
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    async pageQueryBrand () {
      let temp = {
        ...this.params,
        ...this.formInline
      }
      let res = await pageQueryBrand(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    toDelete (id) {
      this.$confirm('此操作将永久删除该品牌, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQueryBrand()
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
      this.title = "添加商品品牌"
      this.form = {
        name: null,
        first_letter: null,
        sort: 0,
        factory_status: 0,
        show_status: 0,
        logo: null,
        big_pic: null,
        brand_story: null,
        product_count: 0,
        product_comment_count: 0
      }
      this.dialogFormVisible = true
    },
    async toSubmit () {
      console.log(this.form);
      let res = await saveOrUpdateBrand(this.form)
      console.log(res);
      this.dialogFormVisible = false
      this.pageQueryBrand()
      this.$message({
        message: '恭喜你，成功添加商品品牌！',
        type: 'success'
      });
    },
    // 编辑
    toEdit (row) {
      this.title = "编辑商品品牌"
      this.form = row
      this.dialogFormVisible = true
    },
    async toChangeSwitch (row) {
      let res = await saveOrUpdateBrand(row)
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
    }
  },
  created () {
    this.pageQueryBrand()
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
}
</style>