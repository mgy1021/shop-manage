<!--
 * @Description: 人气推荐
 * @Author: Mogy
 * @Date: 2022-02-13 11:47:53
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-24 17:39:46
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
                ><el-form-item label="商品名称:">
                  <el-input
                    clearable
                    v-model="formInline.product_name"
                    placeholder="商品名称"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="推荐状态:">
                  <el-select
                    v-model="formInline.recommend_status"
                    clearable
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div>
          <el-button @click="toAdd">选择商品</el-button>
        </div>
      </div>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table class="table" :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>
        <el-table-column prop="id" label="编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="product_name" label="商品名称" align="center">
        </el-table-column>
        <el-table-column label="是否推荐" align="center" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.recommend_status"
              :active-value="1"
              :inactive-value="0"
              @change="toChangeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="180">
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="状态"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.recommend_status == 1" type="success"
              >推荐中</el-tag
            ><el-tag v-else type="danger">未推荐</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <div class="btn_box">
              <el-button type="text" @click="toSetSort(scope.row)"
                >设置排序</el-button
              >
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
    <!-- 添加模态框 -->
    <el-dialog title="选择商品" :visible.sync="dialogTableVisible">
      <el-form :inline="true" :model="addFormInline" class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="addFormInline.name"
            placeholder="商品名称搜索"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="toResetProduct">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="gridData"
        border
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column
          align="center"
          property="name"
          label="商品名称"
        ></el-table-column>
        <el-table-column
          align="center"
          property="product_sn"
          label="货号"
          width="180"
        ></el-table-column>
        <el-table-column
          align="center"
          property="price"
          label="价格"
          width="180"
        >
          <template slot-scope="scope">
            <span style="font-size: 14px">￥ </span>{{ scope.row.price }}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageTotal"
        @current-change="handlePageNumChange"
        :page-size="page.pageSize"
        :current-page="page.pageNum"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSubmitProduct">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置排序模态框 -->
    <el-dialog title="设置排序" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSubmitSort">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageQueryHomeRecommendProduct, deleteById, saveOrUpdateHomeRecommendProduct } from "@/api/marketing/PopularityRecommendation"
import { pageQuery } from "@/api/product/list"

export default {
  data () {
    return {
      formInline: {
        product_name: null
      },
      options: [
        {
          id: 0,
          name: '未推荐',
          value: 0
        },
        {
          id: 1,
          name: '推荐中',
          value: 1
        }
      ],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      page: {
        pageNum: 1,
        pageSize: 5
      },
      addFormInline: {},
      form: {},
      total: 0,
      pageTotal: 0,
      tableData: [],
      gridData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      multipleSelection: [],
      formLabelWidth: "120px"
    };
  },
  computed: {},
  methods: {
    // 分页
    handleSizeChange (val) {
      this.params.pageSize = val
      this.params.pageNum = 1
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    handlePageNumChange (val) {
      this.page.pageNum = val
    },
    async pageQueryHomeRecommendProductData () {
      let temp = {
        ...this.params,
        ...this.formInline
      }
      let res = await pageQueryHomeRecommendProduct(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    // 获取商品信息
    async pageQueryProducts () {
      let temp = { ...this.addFormInline, ...this.page }
      let res = await pageQuery(temp)
      console.log(res, "分页");
      this.gridData = res.data
      this.pageTotal = res.total
      console.log(this.pageTotal);
    },
    toReset () {
      this.formInline = {
        product_name: null,
        recommend_status: null
      }
      this.pageQueryHomeRecommendProductData()
    },
    toSearch () {
      console.log(this.formInline);
      this.params.pageNum = 1
      this.pageQueryHomeRecommendProductData()
    },
    toAdd () {
      this.dialogTableVisible = true
      this.multipleSelection = []
    },
    async toChangeSwitch (row) {
      let temp = { ...row }
      let res = await saveOrUpdateHomeRecommendProduct(temp)
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
    },
    toDelete (id) {
      this.$confirm('此操作将取消推荐该人气商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQueryHomeRecommendProductData()
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
    handleSelectionChange (val) {
      this.multipleSelection = val.map((item) => {
        return { id: item.id, name: item.name, sort: item.sort }
      });
      console.log(this.multipleSelection);
    },
    // 查询品牌
    onSearch () {
      this.page.pageNum = 1
      this.pageQueryProducts()
    },
    toResetProduct () {
      this.addFormInline = {
        name: null,
      }
      this.pageQueryProducts()
    },
    // 提交添加
    toSubmitProduct () {
      if (this.multipleSelection.length <= 0) {
        return
      }
      this.multipleSelection.forEach(async (item) => {
        let temp = { product_id: item.id, product_name: item.name, recommend_status: 1, sort: item.sort }
        await saveOrUpdateHomeRecommendProduct(temp)
        this.dialogTableVisible = false
        this.pageQueryHomeRecommendProductData()
        this.$message({
          message: "添加成功！",
          type: 'success'
        });
      })
    },
    toSetSort (row) {
      this.dialogFormVisible = true
      this.form = { ...row }
    },
    async toSubmitSort () {
      let res = await saveOrUpdateHomeRecommendProduct(this.form)
      this.dialogFormVisible = false
      this.pageQueryHomeRecommendProductData()
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
    }
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryHomeRecommendProductData()
      },
      deep: true
    },
    page: {
      handler (newValue) {
        this.pageQueryProducts()
      },
      deep: true
    }
  },
  created () {
    this.pageQueryHomeRecommendProductData()
    this.pageQueryProducts()
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
  }
  .numbercolor {
    color: #409eff;
  }
  ::v-deep .el-dialog {
    .el-input {
      width: 240px;
    }
  }
}
</style>