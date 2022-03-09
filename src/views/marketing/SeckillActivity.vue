<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-13 11:41:32
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-23 11:41:06
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
                ><el-form-item label="活动名称:">
                  <el-input
                    clearable
                    v-model="formInline.title"
                    placeholder="活动名称"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8"></el-col>
              <el-col :span="8"></el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div>
          <!-- <el-button>秒杀时间段列表</el-button> -->
          <el-button @click="toAdd">添加活动</el-button>
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
        <el-table-column prop="title" label="活动标题" align="center">
        </el-table-column>
        <el-table-column
          prop="first_letter"
          label="活动状态"
          align="center"
          width="140"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="
                moment(Date()).format('X') <
                moment(scope.row.start_date).format('X')
              "
              type="warning"
              >活动未开始</el-tag
            >
            <el-tag
              v-else-if="
                moment(Date()).format('X') >
                moment(scope.row.end_date).format('X')
              "
              type="info"
              >活动已结束</el-tag
            >
            <el-tag v-else type="success">活动正在进行中</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="开始时间"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.start_date | TimeFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="factory_status"
          label="结束时间"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            {{ scope.row.end_date | TimeFormat }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="线上/线下"
          align="center"
          width="100"
        >
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
              <el-button type="text" @click="toSetProduct(scope.row.id)"
                >设置商品</el-button
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
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="活动标题:"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input
            clearable
            placeholder="活动标题"
            v-model="form.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="开始时间:"
          :label-width="formLabelWidth"
          prop="start_date"
        >
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.start_date"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="结束时间:"
          :label-width="formLabelWidth"
          prop="end_date"
        >
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="form.end_date"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线:" :label-width="formLabelWidth">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">上线</el-radio>
            <el-radio :label="0">下线</el-radio>
          </el-radio-group>
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
import { pageQuerySeckillActivity, deleteById, saveOrUpdateSeckillActivity } from "@/api/marketing/seckillActivity"
import moment from 'moment';

export default {
  data () {
    return {
      moment,
      formInline: {
        title: null,
      },
      tableData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      dialogFormVisible: false,
      form: {
        title: null,
        start_date: "",
        end_date: "",
        status: 0
      },
      title: "添加活动",
      formLabelWidth: "150px",
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        start_date: [
          { required: true, message: '请选择开始日期', trigger: 'blur' },
        ],
        end_date: [
          { required: true, message: '请选择结束日期', trigger: 'blur' },
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
        title: null
      }
      this.pageQuerySeckillActivityData()
    },
    async pageQuerySeckillActivityData () {
      let temp = {
        ...this.params,
        ...this.formInline
      }
      let res = await pageQuerySeckillActivity(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    toSearch () {
      this.params.pageNum = 1
      this.pageQuerySeckillActivityData()
    },
    // 删除
    toDelete (id) {
      this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQuerySeckillActivityData()
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
      this.title = "添加活动"
      this.form = {
        title: null,
        start_date: "",
        end_date: "",
        status: 0
      }
      this.dialogFormVisible = true
    },
    toSubmit () {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (this.title == "添加活动") {
            this.form.create_time = moment(Date()).format("YYYY-MM-DD HH:mm:ss")
          } else {
            this.form.start_date = moment(this.form.start_date).format("YYYY-MM-DD HH:mm:ss")
            this.form.end_date = moment(this.form.end_date).format("YYYY-MM-DD HH:mm:ss")
            this.form.create_time = moment(this.form.create_time).format("YYYY-MM-DD HH:mm:ss")
          }
          let res = await saveOrUpdateSeckillActivity(this.form)
          this.dialogFormVisible = false
          this.pageQuerySeckillActivityData()
          this.$message({
            message: this.title == "添加活动" ? '恭喜你，成功添加活动！' : '恭喜你，成功修改活动信息！',
            type: 'success'
          });
        } else {
          this.$notify({
            title: '警告',
            message: '填写活动信息不规范，请重新输入！',
            type: 'warning'
          });
          return false;
        }
      });
    },
    // 编辑
    toEdit (row) {
      this.title = "编辑活动"
      this.form = { ...row }
      this.form.start_date = moment(this.form.start_date).format("YYYY-MM-DD HH:mm:ss")
      this.form.end_date = moment(this.form.end_date).format("YYYY-MM-DD HH:mm:ss")
      this.form.create_time = moment(this.form.create_time).format("YYYY-MM-DD HH:mm:ss")
      this.dialogFormVisible = true
    },
    async toChangeSwitch (row) {
      let temp = { ...row }
      temp.start_date = moment(temp.start_date).format("YYYY-MM-DD HH:mm:ss")
      temp.end_date = moment(temp.end_date).format("YYYY-MM-DD HH:mm:ss")
      temp.create_time = moment(temp.create_time).format("YYYY-MM-DD HH:mm:ss")
      let res = await saveOrUpdateSeckillActivity(temp)
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
    },
    toSetProduct (id) {
      this.$router.push({ path: "/marketing/ActivityTimeProductList", query: { id } })
    }
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQuerySeckillActivityData()
      },
      deep: true
    }
  },
  created () {
    this.pageQuerySeckillActivityData()
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

::v-deep .el-dialog {
  .el-input {
    width: 280px;
  }
}
</style>