<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-08 19:43:47
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 09:10:27
-->
<template>
  <div class="app-container">
    <div class="outer">
      <div class="order_status">
        <el-steps :active="orderStatus" align-center finish-status="success">
          <el-step
            title="提交订单"
            :description="orderDetailsData.create_time | timeFormat"
          ></el-step>
          <el-step
            title="支付订单"
            :description="orderDetailsData.payment_time | timeFormat"
          ></el-step>
          <el-step
            title="平台发货"
            :description="orderDetailsData.delivery_time | timeFormat"
          ></el-step>
          <el-step
            title="确认收货"
            :description="orderDetailsData.receive_time | timeFormat"
          ></el-step>
          <el-step
            title="完成评价"
            :description="orderDetailsData.comment_time | timeFormat"
          ></el-step>
        </el-steps>
      </div>
      <el-card shadow="never" class="order_content">
        <div class="order_content_head">
          <div style="color: #f56c6c">
            <i class="iconfont">&#xe710;</i>
            当前订单状态：{{ orderDetailsData.status | orderStatus }}
          </div>
          <div>
            <!-- <el-button size="mini">删除订单</el-button>
            <el-button size="mini">备注订单</el-button> -->
          </div>
        </div>
        <div class="order_content_body">
          <!-- 基本信息 -->
          <div class="order_content_body_table">
            <div class="order_content_body_table_head">
              <i class="iconfont">&#xe640;</i> 基本信息
            </div>
            <div class="order_content_body_table_body">
              <el-row class="el-row-odd">
                <el-col :span="4"
                  ><div class="grid-content">订单编号</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">发货单流水号</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">用户账号</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">支付方式</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">订单来源</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">订单类型</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="4"
                  ><div class="grid-content el-col-even">
                    {{ orderDetailsData.order_sn }}
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content el-col-even">暂无</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content el-col-even">
                    {{ orderDetailsData.member_username }}
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content el-col-even">
                    <div v-if="orderDetailsData.pay_type == 0">未支付</div>
                    <div v-if="orderDetailsData.pay_type == 1">支付宝</div>
                    <div v-if="orderDetailsData.pay_type == 2">微信</div>
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content el-col-even">
                    {{
                      orderDetailsData.source_type == 0 ? "PC订单" : "APP订单"
                    }}
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content el-col-even">
                    {{
                      orderDetailsData.order_type == 0 ? "正常订单" : "秒杀订单"
                    }}
                  </div></el-col
                >
              </el-row>
              <el-row class="el-row-odd">
                <el-col :span="4"
                  ><div class="grid-content">配送方式</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">物流单号</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">自动确认收货时间</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">订单可获优币</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">订单可得成长值</div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content">活动信息</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="4"
                  ><div class="grid-content el-col-even">
                    {{
                      orderDetailsData.delivery_company
                        ? orderDetailsData.delivery_company
                        : "暂无"
                    }}
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content el-col-even">
                    {{
                      orderDetailsData.delivery_sn
                        ? orderDetailsData.delivery_sn
                        : "暂无"
                    }}
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content el-col-even">
                    {{
                      orderDetailsData.auto_confirm_day
                        ? `${orderDetailsData.auto_confirm_day}天`
                        : "暂无"
                    }}
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content el-col-even">
                    {{
                      orderDetailsData.integration
                        ? orderDetailsData.integration
                        : "暂无"
                    }}
                  </div></el-col
                >
                <el-col :span="4"
                  ><div class="grid-content el-col-even">
                    {{
                      orderDetailsData.growth ? orderDetailsData.growth : "暂无"
                    }}
                  </div></el-col
                >
                <el-col :span="4">
                  <el-popover
                    ref="popover"
                    placement="right"
                    title="活动信息"
                    width="200"
                    trigger="hover"
                    :content="
                      orderDetailsData.promotion_info
                        ? orderDetailsData.promotion_info
                        : '暂无'
                    "
                  >
                  </el-popover>
                  <div
                    style="
                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                      width: 90%;
                      margin-left: 10%;
                    "
                    class="grid-content el-col-even"
                    v-popover:popover
                  >
                    {{
                      orderDetailsData.promotion_info
                        ? orderDetailsData.promotion_info
                        : "暂无"
                    }}
                  </div></el-col
                >
              </el-row>
            </div>
          </div>
          <!-- 收货人信息 -->
          <div class="order_content_body_table">
            <div class="order_content_body_table_head">
              <i class="iconfont">&#xe640;</i> 收货人信息
            </div>
            <div class="order_content_body_table_body">
              <el-row class="el-row-odd">
                <el-col :span="6"
                  ><div class="grid-content">收货人</div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content">手机号码</div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content">邮政编码</div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content">收货地址</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    {{
                      orderDetailsData.receiver_name
                        ? orderDetailsData.receiver_name
                        : "暂无"
                    }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    {{
                      orderDetailsData.receiver_phone
                        ? orderDetailsData.receiver_phone
                        : "暂无"
                    }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    {{
                      orderDetailsData.receiver_post_code
                        ? orderDetailsData.receiver_post_code
                        : "暂无"
                    }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    <!-- {{
                      orderDetailsData.receiver_province
                        ? orderDetailsData.receiver_province
                        : ""
                    }} -->
                    {{
                      `${orderDetailsData.receiver_province} ${orderDetailsData.receiver_city} ${orderDetailsData.receiver_region} ${orderDetailsData.receiver_detail_address}`
                    }}
                  </div></el-col
                >
              </el-row>
            </div>
          </div>
          <!-- 商品信息 -->
          <div class="order_content_body_table">
            <div class="order_content_body_table_head">
              <i class="iconfont">&#xe640;</i> 商品信息
            </div>
            <div>
              <el-table :data="orderItemsData" border style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="60"
                  align="center"
                >
                </el-table-column>
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
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="scope_item">{{ scope.row.product_name }}</div>
                    <div class="scope_item">
                      品牌：{{ scope.row.product_brand }}
                    </div></template
                  >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="价格/货号"
                  width="120"
                  align="center"
                >
                  <template slot-scope="scope">
                    <div class="scope_item">
                      价格：{{ scope.row.product_price }}
                    </div>
                    <div class="scope_item">
                      货号：{{ scope.row.product_sn }}
                    </div></template
                  >
                </el-table-column>
                <el-table-column
                  prop="product_attr"
                  label="属性"
                  width="120"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.row.product_attr | attrList }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="product_quantity"
                  label="数量"
                  width="120"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="product_price"
                  label="小计"
                  width="120"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.row | money }}
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="total_money">
              <div>
                <span>合计：</span
                ><span style="color: red">{{
                  orderItemsData | totalMonney
                }}</span>
              </div>
            </div>
          </div>
          <!-- 费用信息 -->
          <div style="margin-top: 60px" class="order_content_body_table">
            <div class="order_content_body_table_head">
              <i class="iconfont">&#xe640;</i> 费用信息
            </div>
            <div class="order_content_body_table_body">
              <el-row class="el-row-odd">
                <el-col :span="6"
                  ><div class="grid-content">商品合计</div></el-col
                >
                <el-col :span="6"><div class="grid-content">运费</div></el-col>
                <el-col :span="6"
                  ><div class="grid-content">优惠卷</div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content">积分抵扣</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    {{ orderItemsData | totalMonney }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    {{ `￥${orderDetailsData.freight_amount}` }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    {{ orderItemsData | coupon_amount }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    {{ orderItemsData | integration_amount }}
                  </div></el-col
                >
              </el-row>
              <el-row class="el-row-odd">
                <el-col :span="6"
                  ><div class="grid-content">活动优惠</div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content">折扣金额</div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content">订单总金额</div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content">应付款金额</div></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    {{ orderItemsData | promotion_amount }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    {{ `-￥${orderDetailsData.discount_amount}` }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div class="grid-content el-col-even">
                    {{ orderItemsData | totalMonney }}
                  </div></el-col
                >
                <el-col :span="6"
                  ><div style="color: red" class="grid-content el-col-even">
                    {{ orderItemsData | payable_amount(orderDetailsData) }}
                  </div></el-col
                >
              </el-row>
            </div>
          </div>
          <!-- 操作信息 -->
          <div class="order_content_body_table" style="margin-bottom: 20px">
            <div class="order_content_body_table_head">
              <i class="iconfont">&#xe640;</i> 操作信息
            </div>
            <div>
              <el-table
                :data="orderOperateHistoryData"
                border
                style="width: 100%"
              >
                <el-table-column
                  prop="operate_man"
                  label="操作者"
                  width="140"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  label="操作时间"
                  align="center"
                  width="140"
                >
                  <template slot-scope="scope">
                    {{ scope.row.create_time | timeFormat }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="order_status"
                  label="订单状态"
                  width="140"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.row.order_status | orderStatus }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="付款状态"
                  width="140"
                  align="center"
                >
                  <template slot-scope="scope">
                    {{ scope.row.order_status | paymentStatus }}
                  </template>
                </el-table-column>
                <el-table-column label="发货状态" width="140" align="center">
                  <template slot-scope="scope">
                    {{ scope.row.order_status | deliverStatus }}
                  </template>
                </el-table-column>
                <el-table-column prop="note" label="备注" align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { queryOneById } from "@/api/order/orderList"
import { findAllOrderItem } from "@/api/order/orderItem"
import { findAllOrderOperateHistory } from "@/api/order/orderOperateHistory"
import moment from "moment"
export default {
  data () {
    return {
      orderDetailsData: {},
      orderItemsData: [],
      orderOperateHistoryData: [],
    };
  },
  computed: {
    orderId () {
      return this.$route.query.id
    },
    orderStatus () {
      return this.orderDetailsData.status + 1
    }
  },
  filters: {
    timeFormat (time) {
      if (!time) {
        return ""
      }
      return moment(time).format("YYYY-MM-DD HH:mm:ss")
    },
    // 订单状态
    orderStatus (status) {
      if (status == 0) {
        return '待付款'
      }
      else if (status == 1) {
        return '待发货'
      }
      else if (status == 2) {
        return '已发货'
      }
      else if (status == 3) {
        return '已完成'
      }
      else if (status == 4) {
        return '已关闭'
      }
      else if (status == 5) {
        return '无效订单'
      }
    },
    // 付款状态
    paymentStatus (status) {
      if (status == 0) {
        return "待付款"
      }
      else if (status == 1 || status == 2 || status == 3) {
        return "已付款"
      }
      else if (status == 4) {
        return "已退款"
      }
    },
    // 发货状态
    deliverStatus (status) {
      if (status == 2 || status == 3 || status == 4) {
        return "已发货"
      }
      else if (status == 0 || status == 1 || status == 3) {
        return "未发货"
      }
    },
    attrList (value) {
      let str = ''
      let attrs = JSON.parse(value)
      let keys = []
      let values = []
      attrs.forEach((item) => {
        keys.push(item.key)
        values.push(item.value)
      })
      keys.forEach((item, index) => {
        if (index != keys.length - 1) {
          str += `${keys[index]}:${values[index]};`
        } else {
          str += `${keys[index]}:${values[index]}`
        }
      })
      return str
    },
    money (row) {
      let total = row.product_price * row.product_quantity
      return `￥${total}`
    },
    // 所有商品总金额
    totalMonney (value) {
      let totalMonney = 0
      value.forEach((item, index) => {
        totalMonney += item.product_price * item.product_quantity
      })
      return `￥${totalMonney}`
    },
    // 优惠卷分解金额计算
    coupon_amount (value) {
      let coupon_amount_total = 0
      value.forEach((item, index) => {
        coupon_amount_total += item.coupon_amount
      })
      return `-￥${coupon_amount_total.toFixed(2)}`
    },
    // 积分抵押金额计算
    integration_amount (value) {
      let integration_amount_total = 0
      value.forEach((item, index) => {
        integration_amount_total += item.integration_amount
      })
      return `-￥${integration_amount_total.toFixed(2)}`
    },
    // 活动优惠金额计算
    promotion_amount (value) {
      let promotion_amount_total = 0
      value.forEach((item, index) => {
        promotion_amount_total += item.promotion_amount
      })
      return `-￥${promotion_amount_total.toFixed(2)}`
    },
    // 应付金额计算
    payable_amount (value, orderDetailsData) {
      let payable_amount = 0
      let totalMonney = 0
      let integration_amount_total = 0
      let coupon_amount_total = 0
      let promotion_amount_total = 0
      value.forEach((item, index) => {
        coupon_amount_total += item.coupon_amount
        totalMonney += item.product_price * item.product_quantity
        integration_amount_total += item.integration_amount
        promotion_amount_total += item.promotion_amount
      })
      payable_amount = totalMonney - coupon_amount_total - integration_amount_total - promotion_amount_total - orderDetailsData.discount_amount + orderDetailsData.freight_amount
      return `￥${payable_amount}`
    }
  },
  methods: {
    async queryOneById () {
      let res = await queryOneById({ id: this.orderId })
      this.orderDetailsData = res.data
      //   console.log(this.orderDetailsData);
    },
    async findAllOrderItem () {
      let res = await findAllOrderItem({ order_id: this.orderId })
      this.orderItemsData = res.data
    },
    async findAllOrderOperateHistory () {
      let res = await findAllOrderOperateHistory({ order_id: this.orderId })
      this.orderOperateHistoryData = res.data
      //   console.log(this.orderOperateHistoryData);
    }
  },
  created () {
    this.queryOneById()
    this.findAllOrderItem()
    this.findAllOrderOperateHistory()
  },
  mounted () { }
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
    // border: 2px rosybrown solid;
    ::v-deep .el-card__body {
      padding: 0;
    }
    .order_content_head {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      height: 80px;
      line-height: 80px;
      background: #f2f6fc;
    }
    .order_content_body {
      padding: 0 20px;
      .order_content_body_table {
        margin-top: 20px;
        color: #606266;
        font-size: 14px;
        .order_content_body_table_head {
          margin-bottom: 20px;
        }
        .order_content_body_table_body {
          border: 1px solid #dcdfe6;
        }
        .total_money {
          margin: 20px;
          float: right;
          //   display: block;
        }
      }
    }
  }

  .el-row-odd {
    background: #f2f6fc;
  }
  .el-col {
    border: 1px solid #dcdfe6;
    padding: 10px 10px 11px 10px;
    // background: #d3dce6;
  }
  .el-col-even {
    height: 37px;
    box-sizing: border-box;
    width: 100%;
    line-height: 37px;
  }
  .grid-content {
    // border-radius: 4px;
    // min-height: 36px;
    text-align: center;
  }
  .row-bg {
    // padding: 10px 0;
    background-color: #f9fafc;
  }
}
.scope_item {
  margin: 14px 0;
}
</style>