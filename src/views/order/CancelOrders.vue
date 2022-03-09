<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-07 10:35:12
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-22 11:59:07
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
                    v-model="formInline.id"
                    placeholder="服务单号"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="处理状态:">
                  <el-select
                    v-model="formInline.status"
                    placeholder="全部"
                    clearable
                  >
                    <el-option
                      :label="item.name"
                      v-for="item in status"
                      :key="item.id"
                      :value="item.id"
                    ></el-option>
                  </el-select> </el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="申请时间:">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="formInline.create_time"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker> </el-form-item
              ></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"
                ><el-form-item label="操作人员:">
                  <el-input
                    clearable
                    v-model="formInline.handle_man"
                    placeholder="操作人员姓名"
                  ></el-input></el-form-item
              ></el-col>
              <el-col :span="8"
                ><el-form-item label="处理时间:">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="formInline.handle_time"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker></el-form-item
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
        <el-table-column prop="id" label="服务单号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="create_time" label="申请时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.create_time | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="member_username"
          label="用户账号"
          align="center"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="return_amount"
          label="退款金额"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            {{ `￥${scope.row.return_amount}` }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="申请状态"
          align="center"
          width="150"
        >
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status == 0">待处理</el-tag>
            <el-tag type="warning" v-if="scope.row.status == 1">退货中</el-tag>
            <el-tag type="success" v-if="scope.row.status == 2">已完成</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 3">已拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="stock"
          label="处理时间"
          align="center"
          width="220"
        >
          <template slot-scope="scope">
            {{ scope.row.handle_time | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <div class="btn_box">
              <el-button @click="toLookDetails(scope.row.id)"
                >查看详细</el-button
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
  </div>
</template>

<script>
import { pageQueryreturnOrders, deleteById, saveOrUpdateReturnOrders } from "@/api/order/returnOrders"
import moment from "moment"
export default {
  data () {
    return {
      formInline: {
        id: null,
        status: null,
        create_time: null,
        handle_man: null,
        handle_time: null
      },
      tableData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      status: [
        {
          id: 0, name: "待处理"
        },
        {
          id: 1, name: "退货中"
        },
        {
          id: 2, name: "已完成"
        },
        {
          id: 3, name: "已拒绝"
        },
      ],
    };
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryreturnOrders()
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
        id: null,
        status: null,
        create_time: null,
        handle_man: null,
        handle_time: null
      },
        this.pageQueryreturnOrders()
    },
    // 条件查询
    toSearch () {
      this.params.pageNum = 1
      this.pageQueryreturnOrders()
    },
    // 分页
    handleSizeChange (val) {
      this.params.pageSize = val
      this.params.pageNum = 1
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    async pageQueryreturnOrders () {
      for (let key in this.formInline) {
        if (this.formInline[key] === null || this.formInline[key] === '') {
          delete this.formInline[key]
        }
      }
      let temp = {
        ...this.params,
        ...this.formInline
      }
      let res = await pageQueryreturnOrders(temp)
      this.tableData = res.data
      this.total = res.total
      console.log(res);

    },
    // 添加
    toAdd () {
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
    // 查看详细
    toLookDetails (id) {
      this.$router.push({ path: "/order/ReturnOrderApply", query: { id } })
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
    this.pageQueryreturnOrders()
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
    .numbercolor {
      color: #409eff;
    }
  }
  .el-date-editor {
    width: 190px;
  }
}
</style>