<!--
 * @Description: 优惠卷历史
 * @Author: Mogy
 * @Date: 2022-02-26 13:35:56
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-26 15:51:39
-->
<template>
  <div class="app-container">
    <div class="outer">
      <div class="order_content_body_table">
        <div class="order_content_body_table_head">
          <i class="iconfont">&#xe640;</i> 优惠劵信息
        </div>
        <div class="order_content_body_table_body">
          <el-row class="el-row-odd">
            <el-col :span="4"><div class="grid-content">名称</div></el-col>
            <el-col :span="4"
              ><div class="grid-content">优惠劵类型</div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content">可使用的商品</div></el-col
            >
            <el-col :span="4"><div class="grid-content">使用门槛</div></el-col>
            <el-col :span="4"><div class="grid-content">面值</div></el-col>
            <el-col :span="4"><div class="grid-content">状态</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"
              ><div class="grid-content el-col-even">
                {{ couponDetailsData.name }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content el-col-even">
                <div v-if="couponDetailsData.type == 0">全场赠券</div>
                <div v-if="couponDetailsData.type == 1">会员赠券</div>
                <div v-if="couponDetailsData.type == 2">购物赠券</div>
                <div v-if="couponDetailsData.type == 3">注册赠券</div>
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content el-col-even">
                {{ couponDetailsData.use_type }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content el-col-even">
                <div v-if="couponDetailsData.min_point == 0">无门槛</div>
                <div v-else>
                  {{ `满${couponDetailsData.min_point}元可用` }}
                </div>
              </div>
            </el-col>
            <el-col :span="4"
              ><div class="grid-content el-col-even">
                {{ `${couponDetailsData.amount}元` }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content el-col-even">
                <div
                  v-if="
                    moment(Date()).format('X') <
                    moment(couponDetailsData.start_time).format('X')
                  "
                >
                  未能使用
                </div>
                <div
                  v-else-if="
                    moment(Date()).format('X') >
                    moment(couponDetailsData.end_time).format('X')
                  "
                >
                  已过期
                </div>
                <div v-else>可使用</div>
              </div></el-col
            >
          </el-row>
          <el-row class="el-row-odd">
            <el-col :span="4"><div class="grid-content">有效期</div></el-col>
            <el-col :span="4"><div class="grid-content">总发行量</div></el-col>
            <el-col :span="4"><div class="grid-content">已领取</div></el-col>
            <el-col :span="4"><div class="grid-content">待领取</div></el-col>
            <el-col :span="4"><div class="grid-content">已使用</div></el-col>
            <el-col :span="4"><div class="grid-content">未使用</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="4"
              ><div class="grid-content el-col-even" style="font-size: 12px">
                {{
                  `${moment(couponDetailsData.start_time).format(
                    "YYYY-MM-DD"
                  )} 至 ${moment(couponDetailsData.end_time).format(
                    "YYYY-MM-DD"
                  )}`
                }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content el-col-even">
                {{ couponDetailsData.publish_count }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content el-col-even">
                {{ couponDetailsData.receive_count }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content el-col-even">
                {{
                  couponDetailsData.publish_count -
                  couponDetailsData.receive_count
                }}
              </div></el-col
            >
            <el-col :span="4"
              ><div class="grid-content el-col-even">
                {{ couponDetailsData.use_count }}
              </div></el-col
            >
            <el-col :span="4">
              <div class="grid-content el-col-even"></div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-card class="box-card" shadow="hover">
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
            >
              <el-row>
                <el-col :span="8"
                  ><el-form-item label="订单编号:">
                    <el-input
                      clearable
                      v-model="formInline.order_sn"
                      placeholder="订单编号"
                    ></el-input> </el-form-item
                ></el-col>
                <el-col :span="8">
                  <el-form-item label="使用状态:">
                    <el-select
                      v-model="formInline.use_status"
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
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="coupon_code"
          label="优惠码"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="member_nickname"
          label="领取会员"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="领取方式"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.get_type == 0">后台赠送</div>
            <div v-if="scope.row.get_type == 1">主动获取</div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="领取时间" align="center">
          <template slot-scope="scope">
            {{ moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column
          prop="use_status"
          label="当前状态"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.use_status == 0">未使用</el-tag>
            <el-tag v-if="scope.row.use_status == 1" type="info">已使用</el-tag>
            <el-tag v-if="scope.row.use_status == 2" type="danger"
              >已过期</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="use_time" label="使用时间" align="center">
          <template slot-scope="scope">
            {{
              scope.row.use_time
                ? moment(scope.row.use_time).format("YYYY-MM-DD HH:mm:ss")
                : "--"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="order_sn" label="订单编号" align="center">
          <template slot-scope="scope">
            {{ scope.row.order_sn ? scope.row.order_sn : "--" }}
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
    </div>
  </div>
</template>

<script>
import { queryOneByCouponId } from "@/api/marketing/CouponList"
import { pageQueryCouponHistoryList } from "@/api/marketing/couponHistory"

import moment from "moment"
export default {
  data () {
    return {
      moment,
      tableData: [],
      couponDetailsData: {},
      formInline: {
        name: null
      },
      options: [
        {
          id: 0,
          name: "未使用",
          value: 0
        },
        {
          id: 1,
          name: "已使用",
          value: 1
        },
        {
          id: 2,
          name: "已过期",
          value: 2
        }
      ],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0
    };
  },
  computed: {
    coupon_id () {
      return this.$route.query.coupon_id
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
    async getcouponDetailsData () {
      let res = await queryOneByCouponId({ id: this.coupon_id })
      console.log(res);
      this.couponDetailsData = res.data
    },
    async pageQueryCouponHistoryListData () {
      let temp = {
        ...this.params,
        ...this.formInline
      }
      let res = await pageQueryCouponHistoryList(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    toReset () {
      this.formInline = {
        order_sn: null,
        use_status: null
      }
      this.pageQueryCouponHistoryListData()
    },
    toSearch () {
      console.log(this.formInline);
      this.params.pageNum = 1
      this.pageQueryCouponHistoryListData()
    },
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryCouponHistoryListData()
      },
      deep: true
    },
  },
  created () {
    this.getcouponDetailsData()
    this.pageQueryCouponHistoryListData()
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
  .order_content_body_table {
    margin-top: 20px;
    color: #606266;
    font-size: 14px;
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
  .box-card {
    margin: 20px 0;
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