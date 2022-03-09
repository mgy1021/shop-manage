<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-13 11:45:59
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 11:47:55
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
                ><el-form-item label="优惠卷名称:">
                  <el-input
                    clearable
                    v-model="formInline.name"
                    placeholder="优惠卷名称"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="优惠卷类型:">
                  <el-select
                    v-model="formInline.type"
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
              <el-col :span="8"> </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div>
          <el-button @click="toAdd">添加优惠卷</el-button>
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
        <el-table-column prop="name" label="优惠卷名称" align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="优惠卷类型"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.type == 0">全场赠券</div>
            <div v-if="scope.row.type == 1">会员赠券</div>
            <div v-if="scope.row.type == 2">购物赠券</div>
            <div v-if="scope.row.type == 3">注册赠券</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="pic"
          label="可使用商品"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.use_type == 0">全场通用</div>
            <div v-if="scope.row.use_type == 1">指定分类</div>
            <div v-if="scope.row.use_type == 2">指定商品</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="min_point"
          label="使用门槛"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.min_point">
              {{ `满￥${scope.row.min_point}元可用` }}
            </div>
            <div v-else>无门槛</div>
          </template>
        </el-table-column>
        <el-table-column label="面值" align="center" width="100">
          <template slot-scope="scope">
            {{ `${scope.row.amount}元` }}
          </template>
        </el-table-column>
        <el-table-column
          prop="platform"
          label="适用平台"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.platform == 0">全部</div>
            <div v-if="scope.row.platform == 1">移动</div>
            <div v-if="scope.row.platform == 2">PC</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_count"
          label="有效期"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <div>
              {{
                `${moment(scope.row.start_time).format("YYYY-MM-DD")}至${moment(
                  scope.row.end_time
                ).format("YYYY-MM-DD")}`
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_count"
          label="状态"
          align="center"
          width="100"
        >
          <template slot-scope="scope">
            <div
              v-if="
                moment(Date()).format('X') <
                moment(scope.row.start_time).format('X')
              "
            >
              未能使用
            </div>
            <div
              v-else-if="
                moment(Date()).format('X') >
                moment(scope.row.end_time).format('X')
              "
            >
              已过期
            </div>
            <div v-else>可使用</div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="order_count"
          label="状态"
          align="center"
          width="120"
        >
        </el-table-column> -->
        <el-table-column label="操作" width="140" align="center">
          <template slot-scope="scope">
            <div class="btn_box">
              <el-button type="text" @click="toLook(scope.row.id)"
                >查看</el-button
              >
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="优惠卷类型：" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择类型" clearable>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="优惠卷名称："
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="优惠码："
          :label-width="formLabelWidth"
          prop="code"
        >
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="适用平台：" :label-width="formLabelWidth">
          <el-select v-model="form.platform" placeholder="请选择平台" clearable>
            <el-option
              v-for="item in options2"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="总发行量："
          :label-width="formLabelWidth"
          prop="publish_count"
        >
          <el-input v-model="form.publish_count" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="面额："
          :label-width="formLabelWidth"
          prop="amount"
        >
          <el-input placeholder="请输入内容" v-model="form.amount">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="每人限领："
          :label-width="formLabelWidth"
          prop="per_limit"
        >
          <el-input placeholder="请输入内容" v-model="form.per_limit">
            <template slot="append">张</template>
          </el-input>
        </el-form-item>
        <el-form-item label="使用门槛：" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" v-model="form.min_point">
            <template slot="prepend">满</template>
            <template slot="append">元可用</template>
          </el-input>
        </el-form-item>
        <el-form-item label="有效期：" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="7">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form.start_time"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
            <el-col :span="2"><div style="text-align: center">至</div></el-col>
            <el-col :span="7">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form.end_time"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="可使用的商品：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.use_type" style="margin-bottom: 30px">
            <el-radio-button :label="0">全场通用</el-radio-button>
            <el-radio-button :label="1">指定分类</el-radio-button>
            <el-radio-button :label="2">指定商品</el-radio-button>
          </el-radio-group>
          <div v-if="form.use_type == 1" style="width: 70%">
            <div style="margin: 0 10px 10px 10px">
              <el-cascader
                clearable
                v-model="categoryItem"
                :options="options3"
                @change="handleChange"
              ></el-cascader>
              <el-button style="margin-left: 10px" @click="toAddGategory()"
                >添加</el-button
              >
            </div>
            <el-table :data="categoryData" border style="width: 100%">
              <el-table-column prop="name" label="分类名称" align="center">
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="toDeleteGategory(scope.row.id)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="form.use_type == 2" style="width: 70%">
            <div style="margin: 0 10px 10px 10px">
              <el-autocomplete
                clearable
                class="inline-input"
                v-model="search"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
              ></el-autocomplete>
              <el-button style="margin-left: 10px" @click="toAddProduct()"
                >添加</el-button
              >
            </div>
            <el-table :data="productData" border style="width: 100%">
              <el-table-column prop="name" label="产品名称" align="center">
              </el-table-column>
              <el-table-column prop="product_sn" label="货号" align="center">
              </el-table-column>
              <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click="toDeleteProduct(scope.row.id)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>
        <el-form-item
          label="可领取的日期："
          :label-width="formLabelWidth"
          class="date_style"
        >
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.enable_time"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="form.note"
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
import { pageQueryCouponList, deleteById, saveOrUpdateCouponList } from "@/api/marketing/CouponList"
import { saveOrUpdatecoupon_product_category_relationList } from "@/api/marketing/coupon_product_category_relation"
import { saveOrUpdatecoupon_product_relationList } from "@/api/marketing/coupon_product_relation"
import { pageQueryCategory } from "@/api/product/category"
import { pageQuery } from "@/api/product/list"

import moment from "moment"
export default {
  data () {
    return {
      formInline: {
        name: null
      },
      moment,
      categoryItem: {},
      productItem: {},
      search: "",
      options: [
        {
          id: 0,
          name: '全场赠券',
          value: 0
        },
        {
          id: 1,
          name: '会员赠券',
          value: 1
        },
        {
          id: 2,
          name: '购物赠券',
          value: 2
        },
        {
          id: 3,
          name: '注册赠券',
          value: 3
        }
      ],
      options2: [
        {
          id: 0,
          name: '全平台',
          value: 0
        },
        {
          id: 1,
          name: '移动平台',
          value: 1
        },
        {
          id: 2,
          name: 'PC平台',
          value: 2
        },
      ],
      options3: [],
      tableData: [],
      categoryData: [],
      productData: [],
      productAllData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      form: {
        use_count: 0,
        receive_count: 0,
        member_level: 0
      },
      dialogFormVisible: false,
      formLabelWidth: "180px",
      title: "添加优惠卷",
      rules: {
        name: [
          { required: true, message: '请输入优惠卷名称', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入优惠码', trigger: 'blur' },
        ],
        publish_count: [
          { required: true, message: '请输入发行量', trigger: 'blur' },
        ],
        amount: [
          { required: true, message: '请输入优惠卷面额', trigger: 'blur' },
        ],
        min_point: [
          { required: true, message: '请输入使用门槛', trigger: 'blur' },
        ],
      }
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
    toReset () {
      this.formInline = {
        name: null,
        recommend_status: null
      }
      this.pageQueryCouponListData()
    },
    toSearch () {
      console.log(this.formInline);
      this.params.pageNum = 1
      this.pageQueryCouponListData()
    },
    toAdd () {
      this.title = "添加优惠卷"
      this.form = {
        use_count: 0,
        receive_count: 0,
        member_level: 0,
        use_type: 0
      }
      this.dialogFormVisible = true
      this.imageUrl = "";
    },
    // 编辑
    toEdit (row) {
      this.title = "编辑优惠卷"
      this.form = { ...row }
      this.form.start_time = moment(this.form.start_time).format("YYYY-MM-DD")
      this.form.end_time = moment(this.form.end_time).format("YYYY-MM-DD")
      this.form.enable_time = moment(this.form.enable_time).format("YYYY-MM-DD HH:mm:ss")
      this.dialogFormVisible = true
    },
    async pageQueryCouponListData () {
      let temp = {
        ...this.params,
        ...this.formInline
      }
      let res = await pageQueryCouponList(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    toSubmit () {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (this.title == "编辑优惠卷") {
            this.form.start_time = moment(this.form.start_time).format("YYYY-MM-DD")
            this.form.end_time = moment(this.form.end_time).format("YYYY-MM-DD")
            this.form.enable_time = moment(this.form.enable_time).format("YYYY-MM-DD HH:mm:ss")
            this.form.member_level = 0
          } else {
            this.form.count = this.form.publish_count
          }
          let res = await saveOrUpdateCouponList(this.form)
          let insertId = res.data.insertId
          if (this.form.use_type == 1) {
            // 指定分类
            if (this.categoryData.length > 0) {
              this.categoryData.forEach(async (item) => {
                let temp = { coupon_id: insertId, product_category_id: item.id, product_category_name: item.name, parent_category_name: item.parent_id }
                console.log(temp);
                let res = await saveOrUpdatecoupon_product_category_relationList(temp)
              })
            }
          }
          if (this.form.use_type == 2) {
            // 指定商品
            if (this.productData.length > 0) {
              this.productData.forEach(async (item) => {
                let temp = { coupon_id: insertId, product_id: item.id, product_name: item.name, product_sn: item.product_sn }
                console.log(temp);
                let res = await saveOrUpdatecoupon_product_relationList(temp)
              })
            }
          }
          this.dialogFormVisible = false
          this.pageQueryCouponListData()
          this.$message({
            type: 'info',
            message: this.title == "编辑优惠卷" ? '修改成功!' : "添加成功!"
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 删除
    toDelete (id) {
      this.$confirm('此操作将永久删除该优惠卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQueryCouponListData()
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
    async getCategoryData () {
      let option = []
      let childrenOption = []
      let temp = {
        pageNum: 1,
        pageSize: 1000,
        // parent_id: this.parent_id
      }
      let res = await pageQueryCategory(temp)
      res.data.forEach(item => {
        if (item.parent_id == 0) {
          option.push(item)
        } else {
          childrenOption.push(item)
        }
      });
      option = option.map((item) => {
        return { value: item, label: item.name, children: [] }
      })
      childrenOption = childrenOption.map((item) => {
        return { value: item, label: item.name }
      })
      option.forEach((i) => {
        childrenOption.forEach((item) => {
          if (item.value.parent_id == i.value.id) {
            i.children.push(item)
          }
        })
      })
      this.options3 = option
    },
    handleChange (value) {
      if (value.length > 0) {
        this.categoryItem = value[1]
      }
    },
    toAddGategory () {
      this.categoryData.push(this.categoryItem)
      //   console.log(this.categoryData, "this.categoryData");
    },
    toAddProduct () {
      const queryString = this.search
      const temp = this.productAllData.filter((item) => {
        return item.name == queryString
      })
      if (temp.length > 0) {
        this.productData.push(temp.pop())
      }
    },
    toDeleteGategory (id) {
      this.categoryData = this.categoryData.filter((item) => {
        return item.id != id
      })
    },
    toDeleteProduct (id) {
      this.productData = this.productData.filter((item) => {
        return item.id != id
      })
    },
    querySearch (queryString, cb) {
      console.log(queryString, "queryString");
      var productAllData = this.productAllData.map((item) => {
        return { value: item.name }
      });
      var results = queryString ? productAllData.filter(this.createFilter(queryString)) : productAllData;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (item) => {
        return item.value.indexOf(queryString) === 0;
      };
    },
    async getProductData () {
      let temp = { pageNum: 1, pageSize: 1000 }
      let res = await pageQuery(temp)
      this.productAllData = res.data
    },
    toLook (id) {
      this.$router.push({ path: "/marketing/couponHistory", query: { coupon_id: id } })
    }
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryCouponListData()
      },
      deep: true
    },
  },
  created () {
    this.pageQueryCouponListData()
    this.getCategoryData()
    this.getProductData()
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
      width: 300px;
    }
    .el-textarea {
      width: 300px;
    }
    .el-date-editor {
      width: 157px;
    }
    .date_style .el-date-editor {
      width: 240px;
    }
    .el-cascader .el-input {
      width: 200px;
    }
    .el-autocomplete .el-input {
      width: 200px;
    }
  }
}
</style>