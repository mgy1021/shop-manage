<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-22 22:17:47
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-23 23:23:04
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
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>
        <el-table-column prop="id" label="编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center">
        </el-table-column>
        <el-table-column
          prop="product_sn"
          label="货号"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="商品价格"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <span style="font-size: 14px">￥ </span>{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column
          prop="stock"
          label="剩余数量"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="flash_promotion_price"
          label="秒杀价格"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <span style="font-size: 14px">￥ </span
            >{{ scope.row.flash_promotion_price }}
          </template>
        </el-table-column>
        <el-table-column
          prop="flash_promotion_count"
          label="秒杀数量"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="flash_promotion_limit"
          label="限购数量"
          align="center"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="100">
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <div class="btn_box">
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="45%">
      <el-form :model="form">
        <el-form-item label="商品名称:" :label-width="formLabelWidth">
          {{ form.name }}
        </el-form-item>
        <el-form-item label="货号:" :label-width="formLabelWidth">
          {{ form.product_sn }}
        </el-form-item>
        <el-form-item label="商品价格:" :label-width="formLabelWidth">
          <span style="font-size: 14px">￥ </span>{{ form.price }}
        </el-form-item>
        <el-form-item label="秒杀价格:" :label-width="formLabelWidth">
          <el-input
            placeholder="请输入内容"
            v-model="form.flash_promotion_price"
          >
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="剩余数量:" :label-width="formLabelWidth">
          {{ form.stock }}
        </el-form-item>
        <el-form-item label="秒杀数量:" :label-width="formLabelWidth">
          <el-input
            v-model="form.flash_promotion_count"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="限购数量:" :label-width="formLabelWidth">
          <el-input
            v-model="form.flash_promotion_limit"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序:" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加模态框 -->
    <el-dialog title="选择商品" :visible.sync="dialogTableVisible">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input
            v-model="formInline.name"
            placeholder="商品名称搜索"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="primary" @click="toReset">重置</el-button>
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
  </div>
</template>

<script>
import { pageQueryFlashActiviryProduct, saveOrUpdateFlashActiviryProduct, deleteById } from "@/api/marketing/flash_promotion_product_relation"
import { pageQuery } from "@/api/product/list"
import moment from "moment"
export default {
  data () {
    return {
      moment,
      tableData: [],
      gridData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      page: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      pageTotal: 0,
      dialogFormVisible: false,
      dialogTableVisible: false,
      title: "选择商品",
      form: {},
      formInline: {
        name: ""
      },
      formLabelWidth: "150px",
      multipleSelection: []
    };
  },
  computed: {
    flash_promotion_session_id () {
      return this.$route.query.id
    },
    flash_promotion_id () {
      return this.$route.query.flash_promotion_id
    }
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
    handlePageNumChange (val) {
      this.page.pageNum = val
    },
    async pageQueryFlashActiviryProductData () {
      let temp = {
        ...this.params,
        flash_promotion_session_id: this.flash_promotion_session_id
      }
      let res = await pageQueryFlashActiviryProduct(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    // 获取商品信息
    async pageQueryProducts () {
      let temp = { ...this.formInline, ...this.page }
      let res = await pageQuery(temp)
      console.log(res, "分页");
      this.gridData = res.data
      this.pageTotal = res.total
      console.log(this.pageTotal);
    },
    toEdit (row) {
      this.title = "编辑秒杀商品信息"
      this.form = { ...row }
      //   console.log(row);
      this.dialogFormVisible = true
    },
    async toSubmit () {
      let temp = { ...this.form }
      delete temp.name
      delete temp.price
      delete temp.product_sn
      delete temp.stock
      await saveOrUpdateFlashActiviryProduct(temp)
      this.dialogFormVisible = false
      this.pageQueryFlashActiviryProductData()
      this.$message({
        message: '恭喜你，成功修改秒杀商品信息！',
        type: 'success'
      });
    },
    // 查询
    onSearch () {
      this.page.pageNum = 1
      this.pageQueryProducts()
    },
    toReset () {
      this.formInline = {
        name: null,
      }
      this.pageQueryProducts()
    },
    // 删除
    toDelete (id) {
      this.$confirm('此操作将永久删除该秒杀商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQueryFlashActiviryProductData()
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
    toAdd () {
      this.dialogTableVisible = true
      this.page.pageNum = 1
      this.multipleSelection = []
    },
    handleSelectionChange (val) {
      this.multipleSelection = val.map((item) => {
        return item.id
      });
      console.log(this.multipleSelection);
    },
    toSubmitProduct () {
      if (this.multipleSelection.length <= 0) {
        return
      }
      this.multipleSelection.forEach(async (item) => {
        let temp = { product_id: item, flash_promotion_session_id: this.flash_promotion_session_id, sort: 0, flash_promotion_id: this.flash_promotion_id }
        await saveOrUpdateFlashActiviryProduct(temp)
        this.dialogTableVisible = false
        this.pageQueryFlashActiviryProductData()
        this.$message({
          message: "添加成功！",
          type: 'success'
        });
      })
    }
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryFlashActiviryProductData()
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
    this.pageQueryFlashActiviryProductData()
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

  ::v-deep .el-dialog {
    .el-input {
      width: 280px;
    }
  }
}
</style>