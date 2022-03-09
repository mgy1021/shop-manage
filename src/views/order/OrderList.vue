<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-12-07 13:50:09
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 09:14:46
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
          <el-form
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            label-position="right"
          >
            <el-row>
              <el-col :span="8"
                ><el-form-item label="输入搜索:">
                  <el-input
                    clearable
                    v-model="formInline.order_sn"
                    placeholder="订单编号"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="收货人:" label-width="72px">
                  <el-input
                    clearable
                    v-model="formInline.receiver_name"
                    placeholder="收货人姓名/手机号码"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="提交时间:">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="formInline.create_time"
                    type="date"
                    placeholder="请选择时间"
                  >
                  </el-date-picker> </el-form-item
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"
                ><el-form-item label="订单状态:">
                  <el-select
                    v-model="formInline.status"
                    placeholder="全部"
                    clearable
                  >
                    <el-option
                      :label="item.name"
                      v-for="item in orderStatus"
                      :key="item.id"
                      :value="item.id"
                    ></el-option>
                  </el-select> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="订单分类:">
                  <el-select
                    clearable
                    v-model="formInline.order_type"
                    placeholder="全部"
                  >
                    <el-option label="秒杀订单" :value="1"></el-option>
                    <el-option label="正常订单" :value="0"></el-option>
                  </el-select> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="订单来源:">
                  <el-select
                    clearable
                    v-model="formInline.source_type"
                    placeholder="全部"
                  >
                    <el-option label="PC订单" :value="0"></el-option>
                    <el-option label="APP订单" :value="1"></el-option>
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
      </div>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table class="table" :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>
        <el-table-column prop="id" label="编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="order_sn" label="订单编号" align="center">
        </el-table-column>
        <el-table-column
          prop="product_sn"
          label="提交时间"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.create_time | timeFormat }}</template
          >
        </el-table-column>
        <el-table-column
          prop="member_username"
          label="用户账号"
          align="center"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="total_amount"
          label="订金金额"
          align="center"
          width="110"
        >
          <template slot-scope="scope">
            {{ scope.row.total_amount | money }}
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="支付方式"
          align="center"
          width="110"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.pay_type == 0">未支付</span>
            <span v-else-if="scope.row.pay_type == 1">支付宝</span>
            <span v-else-if="scope.row.pay_type == 2">微信</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="source_type"
          label="订单来源"
          align="center"
          width="110"
        >
          <template slot-scope="scope">
            {{ scope.row.source_type == 0 ? "PC订单" : "APP订单" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          align="center"
          width="110"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0" type="warning">待付款</el-tag>
            <el-tag v-if="scope.row.status == 1" type="warning">待发货</el-tag>
            <el-tag v-if="scope.row.status == 2">已发货</el-tag>
            <el-tag v-if="scope.row.status == 3" type="success">已完成</el-tag>
            <el-tag v-if="scope.row.status == 4" type="info">已关闭</el-tag>
            <el-tag v-if="scope.row.status == 5" type="danger">无效订单</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="toLookOrderDetails(scope.row)"
              >查看订单</el-button
            >
            <el-button
              v-if="scope.row.status == 4"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除订单</el-button
            >
            <el-button
              v-if="scope.row.status == 0"
              size="mini"
              @click="handleCloseOrder(scope.row)"
              >关闭订单</el-button
            >
            <el-button
              v-if="scope.row.status == 1"
              size="mini"
              @click="handleDelivery(scope.row)"
              >订单发货</el-button
            >
            <!-- <el-button
              v-if="scope.row.status == 2 || scope.row.status == 3"
              size="mini"
              @click="handleOrderTracking(scope.row.id)"
              >订单跟踪</el-button
            > -->
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
    <el-dialog
      title="发货列表"
      :visible.sync="dialogTableVisible"
      width="70%"
      @closed="toCloseDialog"
    >
      <el-table :data="deliveryList" border>
        <el-table-column
          property="order_sn"
          label="订单编号"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column
          property="receiver_name"
          label="收货人"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          property="receiver_phone"
          label="手机号码"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column
          property="receiver_post_code"
          label="邮政编码"
          align="center"
          width="110"
        ></el-table-column>
        <el-table-column property="address" label="收货地址" align="center">
          <template slot-scope="scope">
            {{
              `${scope.row.receiver_province} ${scope.row.receiver_city} ${scope.row.receiver_region} ${scope.row.receiver_detail_address}`
            }}
          </template>
        </el-table-column>
        <el-table-column
          property="address"
          label="配送方式"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.delivery_company"
              clearable
              placeholder="请选择物流公司"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          property="address"
          label="物流单号"
          align="center"
          width="140"
        >
          <template slot-scope="scope">
            <el-input
              placeholder="物流单号"
              v-model="scope.row.delivery_sn"
              clearable
            >
            </el-input>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="toDelivery">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 关闭订单模态框 -->
    <el-dialog title="关闭订单" :visible.sync="closeOrderVisible" width="30%">
      <el-form :model="closeOrder">
        <el-form-item label="操作备注：" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="closeOrder.textarea"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeOrderVisible = false">取 消</el-button>
        <el-button type="primary" @click="toCloseOrder">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageQueryOrderList, deleteById, saveOrUpdate } from "@/api/order/orderList"
import { saveOrUpdateOperate } from "@/api/order/orderOperateHistory"
import moment from "moment"
export default {
  name: "List",
  data () {
    return {
      formInline: {
        create_time: '',
        order_sn: '',
        order_type: '',
        receiver_name: '',
        status: '',
        source_type: ''
      },
      brand: [],
      category: [],
      tableData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      orderStatus: [
        {
          id: 0,
          name: "待付款"
        },
        {
          id: 1,
          name: "待发货"
        },
        {
          id: 2,
          name: "已发货"
        },
        {
          id: 3,
          name: "已完成"
        },
        {
          id: 4,
          name: "已关闭"
        },
      ],
      dialogTableVisible: false,
      //   关闭订单模态框
      closeOrderVisible: false,
      //   关闭订单模态框表单
      closeOrder: { textarea: '' },
      submitObj: {},
      deliveryList: [],
      options: [
        { id: 0, name: "顺丰快递" },
        { id: 1, name: "圆通快递" },
        { id: 2, name: "中通快递" },
        { id: 3, name: "韵达快递" },
      ],
      formLabelWidth: '100px'
    };
  },
  computed: {},
  watch: {
    params: {
      handler (newValue) {
        this.getOrderListData()
      },
      deep: true
    }
  },
  filters: {
    money (value) {
      return `￥ ${value}`
    },
    timeFormat (value) {
      return moment(value).format("YYYY-MM-DD HH:mm:ss")
    }
  },
  methods: {
    async getOrderListData () {
      let temp = { ...this.formInline, ...this.params }
      let res = await pageQueryOrderList(temp)
      //   console.log(res, "分页");
      this.tableData = res.data
      this.total = res.total
    },
    // 分页
    handleSizeChange (val) {
      this.params.pageSize = val
      this.params.pageNum = 1
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    // 删除
    handleDelete (id) {
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
        this.getOrderListData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 搜索
    toSearch () {
      this.params.pageNum = 1
      this.getOrderListData()
    },
    // 重置
    toReset () {
      this.formInline = {
        create_time: '',
        order_sn: '',
        order_type: '',
        receiver_name: '',
        status: '',
        source_type: ''
      },
        this.getOrderListData()
    },
    // 关闭模态框
    toCloseDialog () {
      this.deliveryList = []
    },
    // 查看订单
    toLookOrderDetails (row) {
      this.$router.push({ path: "/order/OrderDetail", query: { id: row.id } })
    },
    // 订单发货
    handleDelivery (row) {
      this.deliveryList.push(row)
      this.dialogTableVisible = true
    },
    // 发货
    toDelivery () {
      // this.dialogTableVisible = false
      this.$confirm('是否进行发货操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let obj = this.deliveryList[0]
        if (!obj.delivery_company) {
          alert("物流公司不能为NULL")
          return
        }
        if (!obj.delivery_sn) {
          alert("物流编号不能为NULL")
          return
        }
        obj.status = 2
        obj.delivery_time = moment(Date()).format("YYYY-MM-DD HH:mm:ss")
        obj.create_time = moment(obj.create_time).format("YYYY-MM-DD HH:mm:ss")
        obj.payment_time = moment(obj.payment_time).format("YYYY-MM-DD HH:mm:ss")
        for (let key in obj) {
          if (obj[key] === null) {
            delete obj[key]
          }
        }
        let res = await saveOrUpdate(obj)
        let operateObj = { order_id: obj.id, operate_man: '后台管理员', create_time: moment(Date()).format("YYYY-MM-DD HH:mm:ss"), order_status: 2, note: "完成发货" }
        let result = await saveOrUpdateOperate(operateObj)
        this.getOrderListData()
        this.dialogTableVisible = false
        this.$message({
          type: 'success',
          message: '发货成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发货'
        });
      });
    },
    // 显示关闭订单模态框
    handleCloseOrder (row) {
      this.submitObj = row
      this.closeOrderVisible = true
    },
    // 关闭订单
    async toCloseOrder () {
      let obj = { id: this.submitObj.id, status: 4 }
      let res = await saveOrUpdate(obj)
      this.$message({
        type: 'success',
        message: '关闭订单成功!'
      });
      let operateObj = { order_id: this.submitObj.id, operate_man: '后台管理员', create_time: moment(Date()).format("YYYY-MM-DD HH:mm:ss"), order_status: 4, note: this.closeOrder.textarea }
      let result = await saveOrUpdateOperate(operateObj)
      this.getOrderListData()
      this.closeOrderVisible = false
    }
  },
  created () {
    this.getOrderListData()
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
}
</style>