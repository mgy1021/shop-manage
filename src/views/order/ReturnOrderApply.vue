<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-11 16:23:10
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-12 15:04:58
-->
<template>
  <div class="app-container">
    <div class="outer">
      <el-card shadow="never" class="order_content">
        <div class="ReturnOrderBox_head">退货商品</div>
        <div>
          <el-table :data="ReturnOrderData" border style="width: 100%">
            <el-table-column
              prop="product_pic"
              label="商品图片"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                <el-image
                  style="width: 80px; height: 80px"
                  :src="scope.row.product_pic"
                  fit="cover"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column
              prop="product_name"
              label="商品名称"
              width="180"
              align="center"
            >
            </el-table-column>
            <el-table-column label="价格/货号" align="center">
              <template slot-scope="scope">
                <div class="scope_item">
                  价格：{{ `￥${scope.row.product_price}` }}
                </div>
                <div class="scope_item">
                  货号：{{ `No.${scope.row.product_id}` }}
                </div></template
              >
            </el-table-column>
            <el-table-column prop="product_attr" label="属性" align="center">
            </el-table-column>
            <el-table-column prop="product_count" label="数量" align="center">
            </el-table-column>
            <el-table-column prop="address" label="小计" align="center">
              <template slot-scope="scope">
                {{
                  `￥${(
                    scope.row.product_price * scope.row.product_count
                  ).toFixed(2)}`
                }}</template
              >
            </el-table-column>
          </el-table>
        </div>
        <div class="total_money">
          <div>
            <span>合计：</span
            ><span style="color: red">{{
              `￥${(
                ReturnOrderData[0].product_price *
                ReturnOrderData[0].product_count
              ).toFixed(2)}`
            }}</span>
          </div>
        </div>
      </el-card>
      <el-card shadow="never" class="order_content">
        <div class="ReturnOrderBox_head">服务单信息</div>
        <div>
          <div class="order_table tablestyle">
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">服务单号</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">{{ ReturnOrder.id }}</div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">申请状态</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  <el-tag type="info" v-if="ReturnOrder.status == 0"
                    >待处理</el-tag
                  >
                  <el-tag type="warning" v-if="ReturnOrder.status == 1"
                    >退货中</el-tag
                  >
                  <el-tag type="success" v-if="ReturnOrder.status == 2"
                    >已完成</el-tag
                  >
                  <el-tag type="danger" v-if="ReturnOrder.status == 3"
                    >已拒绝</el-tag
                  >
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">订单编号</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ ReturnOrder.order_sn }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">申请时间</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ ReturnOrder.create_time | timeFormat }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">用户账号</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ ReturnOrder.member_username }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">联系人</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ ReturnOrder.return_name }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">联系电话</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ ReturnOrder.return_phone }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">退货原因</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ ReturnOrder.reason }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">问题描述</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ ReturnOrder.description }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div
                  class="grid-content first-col-bg"
                  style="line-height: 100px; height: 100px"
                >
                  凭证图片
                </div></el-col
              >
              <el-col :span="18"
                ><div
                  class="grid-content"
                  style="line-height: 100px; height: 100px"
                >
                  <el-image
                    v-for="(item, index) in ReturnOrder.proof_pics"
                    :key="index"
                    style="
                      width: 80px;
                      height: 80px;
                      margin-top: 10px;
                      margin-right: 10px;
                    "
                    :src="item"
                    fit="cover"
                  ></el-image></div
              ></el-col>
            </el-row>
          </div>
          <div class="order_table tablestyle">
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">订单金额</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  ￥ {{ ReturnOrder.product_real_price }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">
                  确认退款金额
                </div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  <el-row>
                    <el-col :span="1">￥</el-col>
                    <el-col :span="6">
                      <el-input
                        :disabled="ReturnOrder.status != 0"
                        placeholder="请输入退款金额"
                        v-model="ReturnOrder.return_amount"
                      >
                      </el-input>
                    </el-col>
                  </el-row></div
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">选择收货点</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  <el-select
                    v-model="ReturnOrder.company_address_id"
                    placeholder="请选择"
                    @change="addressChange"
                    :disabled="ReturnOrder.status != 0"
                  >
                    <el-option
                      v-for="item in companyAddress"
                      :key="item.id"
                      :label="item.address_name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select></div
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">收货人姓名</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ companyAddressOjb.name }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">所在区域</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{
                    `${companyAddressOjb.province} ${companyAddressOjb.city} ${companyAddressOjb.region}`
                  }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">详细地址</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ companyAddressOjb.detail_address }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">联系电话</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ companyAddressOjb.phone }}
                </div></el-col
              >
            </el-row>
          </div>
          <!-- 处理操作 -->
          <div class="order_table tablestyle" v-if="ReturnOrder.status != 0">
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">处理人员</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ ReturnOrder.handle_man }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">处理时间</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ ReturnOrder.handle_time | timeFormat }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">处理备注</div></el-col
              >
              <el-col :span="18"
                ><div class="grid-content">
                  {{ ReturnOrder.handle_note }}
                </div></el-col
              >
            </el-row>
          </div>
          <div class="order_table tablestyle">
            <el-row v-if="ReturnOrder.status == 1">
              <el-col :span="6"
                ><div
                  class="grid-content first-col-bg"
                  style="line-height: 60px; height: 60px"
                >
                  收货备注
                </div></el-col
              >
              <el-col :span="18">
                <div
                  class="grid-content"
                  style="line-height: 60px; height: 60px"
                >
                  <el-input
                    style="width: 190px"
                    placeholder="收货备注"
                    v-model="ReturnOrder.receive_note"
                  >
                  </el-input></div
              ></el-col>
            </el-row>
            <el-row v-if="ReturnOrder.status == 0">
              <el-col :span="6"
                ><div
                  class="grid-content first-col-bg"
                  style="line-height: 60px; height: 60px"
                >
                  处理备注
                </div></el-col
              >
              <el-col :span="18"
                ><div
                  class="grid-content"
                  style="line-height: 60px; height: 60px"
                >
                  <el-input
                    style="width: 190px"
                    placeholder="处理备注"
                    v-model="ReturnOrder.handle_note"
                  >
                  </el-input></div
              ></el-col>
            </el-row>
          </div>
          <div class="order_table tablestyle" v-if="ReturnOrder.status == 2">
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">收货人员</div></el-col
              >
              <el-col :span="18">
                <div class="grid-content">
                  {{ ReturnOrder.receive_man }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">收货时间</div></el-col
              >
              <el-col :span="18">
                <div class="grid-content">
                  {{ ReturnOrder.receive_time | timeFormat }}
                </div></el-col
              >
            </el-row>
            <el-row>
              <el-col :span="6"
                ><div class="grid-content first-col-bg">收货备注</div></el-col
              >
              <el-col :span="18">
                <div class="grid-content">
                  {{ ReturnOrder.receive_note }}
                </div></el-col
              >
            </el-row>
          </div>
        </div>
        <div class="btn-box" v-if="ReturnOrder.status == 1">
          <div style="margin: 0 auto; width: 80px">
            <el-button type="primary" @click="toConfirmReceipt"
              >确认收货</el-button
            >
          </div>
        </div>
        <div class="btn-box" v-if="ReturnOrder.status == 0">
          <div style="margin: 0 auto; width: 200px">
            <el-button type="primary" @click="toConfirmReturn"
              >确认退货</el-button
            >
            <el-button type="danger" @click="toRejectReturn"
              >拒绝退货</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { queryOneById, saveOrUpdateReturnOrders } from "@/api/order/returnOrders"
import { queryAllCompanyAddress, queryOneCompanyAddress } from "@/api/order/companyAddress"
import moment from "moment"
export default {
  data () {
    return {
      ReturnOrderData: [],
      ReturnOrder: {
        company_address_id: ""
      },
      companyAddress: [],
      companyAddressOjb: {}
    };
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  filters: {
    timeFormat (time) {
      if (!time) {
        return ""
      }
      return moment(time).format("YYYY-MM-DD HH:mm:ss")
    },
  },
  methods: {
    async queryOneById () {
      let res = await queryOneById({ id: this.id })
      this.ReturnOrderData = [res.data]
      this.ReturnOrder = res.data
      console.log(this.ReturnOrder);
      this.ReturnOrder.proof_pics = res.data.proof_pics.split(",")
      if (!this.ReturnOrder.return_amount) {
        this.ReturnOrder.return_amount = 0
      }
      let result = await queryOneCompanyAddress({ id: res.data.company_address_id })
      this.companyAddressOjb = result.data
    },
    async queryAllCompanyAddress () {
      let res = await queryAllCompanyAddress()
      this.companyAddress = res.data
    },
    // 当收货地址发生变化时
    addressChange (value) {
      let obj = this.companyAddress.filter((item) => {
        return item.id == value
      })
      this.companyAddressOjb = obj.pop()
    },
    // 确认退货
    toConfirmReturn () {
      this.$confirm('是否要执行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { id, handle_note, company_address_id, return_amount, } = this.ReturnOrder
        let temp = { id, return_amount, company_address_id, handle_man: "操作用户", handle_note, status: 1, handle_time: moment(Date()).format("YYYY-MM-DD HH:mm:ss") }
        let res = await saveOrUpdateReturnOrders(temp)
        console.log(res);
        this.$message({
          type: 'success',
          message: '退货成功!'
        });
        this.queryOneById()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退货操作'
        });
      });
    },
    // 拒绝退货
    toRejectReturn () {
      this.$confirm('是否要执行拒绝退货操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { id, handle_note, } = this.ReturnOrder
        // 此时的操作员为该登录账户
        let temp = { id, handle_man: "操作用户", handle_note, status: 3, handle_time: moment(Date()).format("YYYY-MM-DD HH:mm:ss") }
        let res = await saveOrUpdateReturnOrders(temp)
        this.$message({
          type: 'success',
          message: '拒绝退货成功!'
        });
        this.queryOneById()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消拒绝退货操作'
        });
      });
    },
    // 确认收货
    toConfirmReceipt () {
      this.$confirm('是否要执行确认收货操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { id, receive_note, } = this.ReturnOrder
        let temp = { id, receive_note, status: 2, receive_man: this.companyAddressOjb.name, receive_time: moment(Date()).format("YYYY-MM-DD HH:mm:ss") }
        let res = await saveOrUpdateReturnOrders(temp)
        this.$message({
          type: 'success',
          message: '确认收货成功!'
        });
        this.queryOneById()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确认收货操作'
        });
      });
    }
  },
  created () {
    this.queryOneById()
    this.queryAllCompanyAddress()
  },
  mounted () {

  }
};
</script>
<style lang="scss" scoped>
.outer {
  padding: 30px 120px;
  .order_status {
    padding: 0 20px;
  }
  .order_content {
    margin-top: 20px;
    .ReturnOrderBox_head {
      margin-bottom: 20px;
    }
    .order_table {
      margin-bottom: 20px;
    }
    .total_money {
      margin: 20px;
      float: right;
    }
  }
}

.grid-content {
  min-height: 36px;
  line-height: 36px;
  border-bottom: #ebeef5 1px solid;
  border-right: #ebeef5 1px solid;
  padding: 0 10px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.tablestyle {
  border-top: #ebeef5 1px solid;
  border-left: #ebeef5 1px solid;
  font-size: 14px;
  color: #606266;
  .first-col-bg {
    background: #f2f6fc;
  }
}
</style>