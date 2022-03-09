<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-22 22:17:47
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-23 16:31:17
-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div><el-button @click="toAdd">添加秒杀时间段</el-button></div>
      </div>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <el-table class="table" :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50">
        </el-table-column>
        <el-table-column prop="id" label="编号" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="秒杀时间段名称" align="center">
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="每日开始时间"
          align="center"
          width="240"
        >
        </el-table-column>
        <el-table-column
          prop="end_time"
          label="每日结束时间"
          align="center"
          width="240"
        >
        </el-table-column>
        <el-table-column prop="status" label="启用" align="center" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="toChangeSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <div class="btn_box">
              <el-button type="text" @click="toActivityProduct(scope.row.id)"
                >商品列表</el-button
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="秒杀时间段名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="每日开始时间：" :label-width="formLabelWidth">
          <el-time-select
            v-model="form.start_time"
            :picker-options="{
              start: '00:00',
              step: '01:00',
              end: '24:00',
            }"
            placeholder="选择时间"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="每日结束时间：" :label-width="formLabelWidth">
          <el-time-select
            v-model="form.end_time"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00',
            }"
            placeholder="选择时间"
          >
          </el-time-select>
        </el-form-item>
        <el-form-item label="是否启用：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSubmitAdd">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pageQueryFlashPromotionSession, saveOrUpdateFlashPromotionSession, deleteById } from "@/api/marketing/flash_promotion_session"
import moment from "moment"
export default {
  data () {
    return {
      moment,
      tableData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      form: {},
      dialogFormVisible: false,
      formLabelWidth: "150px",
      title: "添加秒杀时间段"
    };
  },
  computed: {
    flash_promotion_id () {
      return this.$route.query.id
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
    async pageQueryFlashPromotionSessionData () {
      let temp = {
        ...this.params,
        ...this.formInline
      }
      let res = await pageQueryFlashPromotionSession(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    toActivityProduct (id) {
      this.$router.push({ path: "/marketing/ActivityProductList", query: { id, flash_promotion_id: this.flash_promotion_id } })
    },
    async toChangeSwitch (row) {
      let temp = { ...row }
      temp.create_time = moment(temp.create_time).format("YYYY-MM-DD HH:mm:ss")
      let res = await saveOrUpdateFlashPromotionSession(temp)
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
    },
    toAdd () {
      this.dialogFormVisible = true
      this.form = {
        name: "",
        start_time: null,
        end_time: null,
        status: 0
      }
    },
    async toSubmitAdd () {
      if (this.title == "添加秒杀时间段") {
        this.form.create_time = moment(Date()).format("YYYY-MM-DD HH:mm:ss")
      }
      let res = await saveOrUpdateFlashPromotionSession(this.form)
      this.dialogFormVisible = false
      this.pageQueryFlashPromotionSessionData()
      this.$message({
        message: this.title == "添加秒杀时间段" ? '恭喜你，成功添加秒杀时间段！' : '成功编辑秒杀时间段！',
        type: 'success'
      });
    },
    toDelete (id) {
      this.$confirm('此操作将删除该秒杀时间段, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQueryFlashPromotionSessionData()
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
    toEdit (row) {
      this.title = "编辑秒杀时间段"
      this.form = { ...row }
      this.form.create_time = moment(this.form.create_time).format("YYYY-MM-DD HH:mm:ss")
      console.log(this.form);
      this.dialogFormVisible = true
    },
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryFlashPromotionSessionData()
      },
      deep: true
    }
  },
  created () {
    this.pageQueryFlashPromotionSessionData()
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