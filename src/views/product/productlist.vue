<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-12-07 13:50:09
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 10:31:39
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
                ><el-form-item label="输入搜索">
                  <el-input
                    clearable
                    v-model="formInline.name"
                    placeholder="输入搜索"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="商品货号">
                  <el-input
                    clearable
                    v-model="formInline.product_sn"
                    placeholder="商品货号"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="商品分类">
                  <!-- <el-select
                    clearable
                    v-model="formInline.product_category_id"
                    placeholder="商品分类"
                  >
                    <el-option
                      v-for="item in category"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select> -->
                  <el-cascader
                    clearable
                    v-model="formInline.product_category_id"
                    :options="options"
                    @change="handleChange"
                  ></el-cascader> </el-form-item
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"
                ><el-form-item label="商品品牌">
                  <el-select
                    v-model="formInline.brand_id"
                    placeholder="商品品牌"
                    clearable
                  >
                    <el-option
                      :label="item.name"
                      v-for="item in brand"
                      :key="item.id"
                      :value="item.id"
                    ></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="上架状态">
                  <el-select
                    clearable
                    v-model="formInline.publish_status"
                    placeholder="上架状态"
                  >
                    <el-option label="上架" value="1"></el-option>
                    <el-option label="下架" value="0"></el-option>
                  </el-select> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="审核状态">
                  <el-select
                    clearable
                    v-model="formInline.verify_status"
                    placeholder="审核状态"
                  >
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="未审核" value="0"></el-option>
                  </el-select> </el-form-item
              ></el-col>
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
        <el-table-column prop="pic" label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.row.pic"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <div class="scope_item">{{ scope.row.name }}</div>
            <div class="scope_item">
              品牌：{{ scope.row.brand_name }}
            </div></template
          >
        </el-table-column>
        <el-table-column
          prop="product_sn"
          label="价格/货号"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <div class="scope_item">价格：{{ scope.row.price }}</div>
            <div class="scope_item">
              货号：{{ scope.row.product_sn }}
            </div></template
          >
        </el-table-column>
        <el-table-column
          prop="publish_status"
          label="标签"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <div class="scope_item">
              上架：<el-switch
                @change="changeSwitch(scope.row)"
                v-model="scope.row.publish_status"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </div>
            <div class="scope_item">
              新品：<el-switch
                @change="changeSwitch(scope.row)"
                v-model="scope.row.new_status"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </div>
            <div class="scope_item">
              推荐：<el-switch
                @change="changeSwitch(scope.row)"
                v-model="scope.row.recommand_status"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center" width="100">
        </el-table-column>
        <el-table-column prop="stock" label="库存" align="center" width="100">
          <template slot-scope="scope">
            <!-- <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="toSKU(scope.row)"
            ></el-button> -->
            {{ scope.row.stock }}
          </template>
        </el-table-column>
        <el-table-column prop="sale" label="销量" align="center" width="100">
        </el-table-column>
        <el-table-column
          prop="verify_status"
          label="审核状态"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <div class="scope_item" v-if="scope.row.verify_status">
              审核通过
            </div>
            <div class="scope_item" v-else>未审核</div>
            <!-- <div class="scope_item">审核详细</div> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <div class="btn_box">
              <el-button @click="toEdit(scope.row.id)">编辑</el-button>
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
    <el-dialog
      title="编辑货品信息"
      :visible.sync="editSkuInfo.dialogVisible"
      width="40%"
    >
      <span>商品货号：</span>
      <span>{{ editSkuInfo.productSn }}</span>
      <el-input
        placeholder="按sku编号搜索"
        v-model="editSkuInfo.keyword"
        size="small"
        style="width: 50%; margin-left: 20px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearchEditSku"
        ></el-button>
      </el-input>
      <el-table
        style="width: 100%; margin-top: 20px"
        :data="editSkuInfo.stockList"
        border
      >
        <el-table-column label="SKU编号" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sku_code"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in editSkuInfo.productAttr"
          :label="item.name"
          :key="item.id"
          align="center"
        >
          <template slot-scope="scope">
            {{ getProductSkuSp(scope.row, index) }}
          </template>
        </el-table-column>
        <el-table-column label="销售价格" width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="商品库存" width="80" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBrandList } from "@/api/product/brand"
import { saveOrUpdateProduct, pageQuery, deleteById, } from "@/api/product/list"
import { pageQueryStock, saveOrUpdateStock } from "@/api/product/stock"
import { getAllCategory } from "@/api/product/category"
export default {
  name: "List",
  data () {
    return {
      editSkuInfo: {
        dialogVisible: false,
        productSn: ""
      },
      formInline: {
        name: '',
        product_sn: '',
        product_category_id: '',
        brand_id: '',
        publish_status: '',
        verify_status: ''
      },
      options: [],
      brand: [],
      category: [],
      tableData: [],
      stockData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0
    };
  },
  computed: {},
  watch: {
    params: {
      handler (newValue) {
        this.getProductData()
      },
      deep: true
    }
  },
  methods: {
    async getBrandList () {
      let res = await getBrandList()
      this.brand = res.data
    },
    async pageQueryStock (id) {
      let res = await pageQueryStock({
        pageNum: 1,
        pageSize: 1000,
        product_id: id
      })
      this.editSkuInfo.stockList = res.data
      console.log(res.data);
    },
    async getProductData () {
      let temp = { ...this.formInline, ...this.params }
      let res = await pageQuery(temp)
      this.tableData = res.data
      this.total = res.total
    },
    // 获取商品分类
    async getAllCategory () {
      let option = []
      let childrenOption = []
      let res = await getAllCategory()
      res.data.forEach(item => {
        if (item.parent_id == 0) {
          option.push(item)
        } else {
          childrenOption.push(item)
        }
      });
      option = option.map((item) => {
        return { value: item.id, label: item.name, children: [], obj: item }
      })
      childrenOption = childrenOption.map((item) => {
        return { value: item.id, label: item.name, obj: item }
      })
      option.forEach((i) => {
        childrenOption.forEach((item) => {
          if (item.obj.parent_id == i.obj.id) {
            i.children.push(item)
          }
        })
      })
      this.options = option
      //   this.category = res.data
    },
    // 分页
    handleSizeChange (val) {
      this.params.pageSize = val
      this.params.pageNum = 1
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    toAdd () {
      this.$router.push({ path: "/product/addproduct" })
    },
    // 删除
    toDelete (id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteById({ id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getProductData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    toEdit (id) {
      this.$router.push({ path: "/product/addproduct", query: { id } })
    },
    // 搜索
    toSearch () {
      this.params.pageNum = 1
      this.getProductData()
    },
    toSKU (row) {
      this.editSkuInfo.dialogVisible = true
      this.editSkuInfo.productSn = row.product_sn
      this.pageQueryStock(row.id)
    },
    handleSearchEditSku () {
      //   fetchSkuStockList(this.editSkuInfo.productId, { keyword: this.editSkuInfo.keyword }).then(response => {
      //     this.editSkuInfo.stockList = response.data;
      //   });
    },
    handleEditSkuConfirm () { },
    // 重置
    toReset () {
      this.formInline = {
        name: '',
        product_sn: '',
        product_category_id: '',
        brand_id: '',
        publish_status: '',
        verify_status: ''
      }
      this.getProductData()
    },
    handleChange (value) {
      if (value.length > 0) {
        this.formInline.product_category_id = value.pop()
      }
    },
    async changeSwitch (row) {
      let params = { ...row }
      for (let i in params) {
        if (params[i] === "" || params[i] === null) {
          delete params[i]
        }
      }
      let res = await saveOrUpdateProduct(params)
      this.$message({
        message: '恭喜你，修改成功！',
        type: 'success'
      });
    },
  },
  created () {
    this.getBrandList()
    this.getProductData()
    this.getAllCategory()
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
    .table {
      .scope_item {
        margin: 14px 0;
      }
      .btn_box {
        display: flex;
        margin: 14px 0;
      }
    }
  }
}
</style>