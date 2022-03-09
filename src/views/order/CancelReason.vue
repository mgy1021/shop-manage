<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-07 22:10:21
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-11 15:19:22
-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div><el-button @click="toAdd">添加</el-button></div>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-table :data="orderReturnReasonData" border style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="编号"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="name" label="原因类型" align="center">
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="120" align="center">
        </el-table-column>
        <el-table-column prop="status" label="是否可用" align="center">
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
        <el-table-column
          prop="create_time"
          label="添加时间"
          width="180"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.create_time | timeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" size="mini"
              >编辑</el-button
            >
            <el-button size="mini" @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
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
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          label="原因类型："
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序：" :label-width="formLabelWidth">
          <el-input v-model="form.sort" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
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
import { pageQueryOrderReturnReason, saveOrUpdateReturnReason, deleteById } from "@/api/order/CancelReason";
import moment from "moment"
export default {
  data () {
    return {
      orderReturnReasonData: [],
      params: {
        pageNum: 1,
        pageSize: 8
      },
      total: 0,
      form: {
        sort: 0
      },
      dialogFormVisible: false,
      formLabelWidth: "100px",
      title: "添加退货原因",
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      }
    };
  },
  computed: {},
  watch: {
    params: {
      handler () {
        this.pageQueryOrderReturnReason()
      },
      deep: true
    }
  },
  methods: {
    async pageQueryOrderReturnReason () {
      let res = await pageQueryOrderReturnReason(this.params)
      this.orderReturnReasonData = res.data
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
    // 添加
    toAdd () {
      this.title = "添加退货原因"
      this.dialogFormVisible = true
      this.form = { sort: 0 }
    },
    handleEdit (row) {
      this.title = "编辑退货原因"
      this.dialogFormVisible = true
      this.form = row
    },
    // 提交
    toSubmit () {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          this.form.create_time = moment(Date()).format("YYYY-MM-DD HH:mm:ss")
          let res = await saveOrUpdateReturnReason(this.form)
          console.log(res);
          this.$message({
            message: `${this.title}成功！`,
            type: 'success'
          });
          this.dialogFormVisible = false
          this.pageQueryOrderReturnReason()
        } else {
          const h = this.$createElement;

          this.$notify({
            title: '添加失败',
            message: h('i', { style: 'color: teal' }, '必须填写原因类型')
          });
          return false;
        }
      });
    },
    // 删除
    handleDelete (id) {
      this.$confirm('此操作将永久删除该退货原因, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await deleteById({ id })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.pageQueryOrderReturnReason()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async toChangeSwitch (row) {
      row.create_time = moment(row.create_time).format("YYYY-MM-DD HH:mm:ss")
      let res = await saveOrUpdateReturnReason(row)
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
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
  created () {
    this.pageQueryOrderReturnReason()
  },
  mounted () { }
};
</script>
<style scoped>
.box-card {
  margin-bottom: 20px;
}
.box-card-addbox {
  display: flex;
  justify-content: space-between;
  line-height: 30px;
}
</style>