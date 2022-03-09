<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-05 12:10:21
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-07 10:28:52
-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div><el-button @click="toAddProductType">添加</el-button></div>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="编号" width="100" align="center">
        </el-table-column>
        <el-table-column prop="name" label="类型名称" align="center">
        </el-table-column>
        <el-table-column
          prop="attribute_count"
          label="属性数量"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="param_count"
          label="参数数量"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="zip" label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="toAttributeList(scope.row)"
              :disabled="disabled"
              >属性列表</el-button
            >
            <el-button size="mini" @click="toParamsList(scope.row)"
              >参数设置</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加类型" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          label="类型名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { pageQueryType, deleteById, saveOrUpdate } from "@/api/product/type"
export default {
  data () {
    return {
      tableData: [],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      total: 0,
      parent_id: 0,
      disabled: false,
      dialogFormVisible: false,
      form: {
        name: "",
        attribute_count: 0,
        param_count: 0
      },
      formLabelWidth: "100px",
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      }
    };
  },
  computed: {},
  methods: {
    toAddProductType () {
      this.form = {
        name: "",
        attribute_count: 0,
        param_count: 0
      }
      this.dialogFormVisible = true
    },
    //   分页
    handleSizeChange (val) {
      this.params.pageSize = val
      this.params.pageNum = 1
    },
    handleCurrentChange (val) {
      this.params.pageNum = val
    },
    // 分页查询
    async pageQueryType () {
      let res = await pageQueryType(this.params)
      console.log(res);
      this.tableData = res.data
      this.total = res.total
    },
    // 删除
    handleDelete (id) {
      this.$confirm('此操作将永久删除该商品类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(id);
        let res = await deleteById({ id })
        console.log(res);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        await this.pageQueryType()
        if (!this.tableData.length) {
          this.params.pageNum -= 1
          if (this.params.pageNum < 0) {
            this.params.pageNum = 1
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 新增
    onSubmit () {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          console.log(this.form);
          let res = await saveOrUpdate(this.form)
          //   更新页面
          this.pageQueryType()
          this.$message({
            message: '恭喜你，成功添加商品类型！',
            type: 'success'
          });
          this.dialogFormVisible = false
        } else {
          const h = this.$createElement;
          this.$notify({
            title: '注意：',
            message: h('i', { style: 'color: #304156' }, '类型名称未填写，必须填写类型名称才能完成提交！')
          });
          return false;
        }
      });
    },
    // 编辑
    handleEdit (row) {
      console.log(row);
      this.form = row
      this.dialogFormVisible = true
    },
    // 属性列表
    toAttributeList (row) {
      console.log(row.id);
      this.$router.push({ path: "/product/productAttrList", query: { aid: row.id, aname: row.name, type: 0 } })
    },
    toParamsList (row) {
      console.log(row.id);
      this.$router.push({ path: "/product/productAttrList", query: { aid: row.id, aname: row.name, type: 1 } })
    }
  },
  watch: {
    params: {
      handler () {
        this.pageQueryType()
      },
      deep: true
    }
  },
  created () {
    this.pageQueryType()
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