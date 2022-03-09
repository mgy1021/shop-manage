<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-07 22:04:46
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-12 23:31:26
-->
<template>
  <div class="app-container">
    <div class="outer">
      <el-card shadow="never" class="order_content">
        <el-row class="row_style">
          <el-col :span="5" class="col_style"><div>秒杀订单超过:</div></el-col>
          <el-col :span="11" style="text-align: center"
            ><div>
              <el-input
                style="width: 260px; height: 40px"
                placeholder="请输入内容"
                v-model="form.flash_order_overtime"
              >
                <template slot="append">分</template>
              </el-input>
            </div></el-col
          >
          <el-col :span="8"><div>未付款，订单自动关闭</div></el-col>
        </el-row>
        <el-row class="row_style">
          <el-col :span="5" class="col_style"><div>正常订单超过:</div></el-col>
          <el-col :span="11" style="text-align: center"
            ><div>
              <el-input
                placeholder="请输入内容"
                v-model="form.normal_order_overtime"
                style="width: 260px; height: 40px"
              >
                <template slot="append">分</template>
              </el-input>
            </div></el-col
          >
          <el-col :span="8"><div>未付款，订单自动关闭</div></el-col>
        </el-row>
        <el-row class="row_style">
          <el-col :span="5" class="col_style"><div>发货超过:</div></el-col>
          <el-col :span="11" style="text-align: center"
            ><div>
              <el-input
                placeholder="请输入内容"
                v-model="form.confirm_overtime"
                style="width: 260px; height: 40px"
              >
                <template slot="append">天</template>
              </el-input>
            </div></el-col
          >
          <el-col :span="8"><div>未收货，订单自动完成</div></el-col>
        </el-row>
        <el-row class="row_style">
          <el-col :span="5" class="col_style"><div>订单完成超过:</div></el-col>
          <el-col :span="11" style="text-align: center"
            ><div>
              <el-input
                placeholder="请输入内容"
                v-model="form.finish_overtime"
                style="width: 260px; height: 40px"
              >
                <template slot="append">天</template>
              </el-input>
            </div></el-col
          >
          <el-col :span="8"><div>自动结束交易，不能申请售后</div></el-col>
        </el-row>
        <el-row class="row_style">
          <el-col :span="5" class="col_style"><div>订单完成超过:</div></el-col>
          <el-col :span="11" style="text-align: center"
            ><div>
              <el-input
                placeholder="请输入内容"
                v-model="form.comment_overtime"
                style="width: 260px; height: 40px"
              >
                <template slot="append">天</template>
              </el-input>
            </div></el-col
          >
          <el-col :span="8"><div>自动五星好评</div></el-col>
        </el-row>
        <div style="margin-top: 30px">
          <div style="width: 100px; margin: 0 auto">
            <el-button type="primary" size="medium" @click="toSubmit"
              >提交</el-button
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { queryOneById, saveOrUpdate } from "@/api/order/OrderSetup"
export default {
  data () {
    return {
      form: {
        flash_order_overtime: "",
        normal_order_overtime: "",
        confirm_overtime: "",
        finish_overtime: "",
        comment_overtime: ""
      }
    };
  },
  computed: {},
  methods: {
    async queryOneById () {
      let res = await queryOneById({ id: 1 })
      this.form = res.data
    },
    toSubmit () {
      this.$confirm('是否提交超时修改, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await saveOrUpdate(this.form)
        this.queryOneById()
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    }
  },
  created () {
    this.queryOneById()
  },
  mounted () { }
};
</script>
<style lang="scss" scoped>
.outer {
  padding: 30px 250px;
}
.row_style {
  height: 40px;
  line-height: 40px;
  margin: 20px;
  font-size: 14px;
  color: #606266;
}
.col_style {
  text-align: right;
}
.order_content {
  padding: 20px 0;
}
::v-deep .el-input__inner {
  height: 40px;
  line-height: 40px;
}
</style>