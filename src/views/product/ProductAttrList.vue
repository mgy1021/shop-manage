<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2022-02-05 12:10:21
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-07 10:32:53
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
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="id" label="编号" width="65" align="center">
        </el-table-column>
        <el-table-column prop="name" label="属性名称" align="center">
        </el-table-column>
        <el-table-column label="商品类型" width="120" align="center">
          <template>
            {{ productType }}
          </template>
        </el-table-column>
        <el-table-column
          prop="select_type"
          label="属性是否可选"
          width="120"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.select_type == 0">唯一</span>
            <span v-else-if="scope.row.select_type == 1">单选</span>
            <span v-else-if="scope.row.select_type == 2">多选</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="input_type"
          label="属性值的录入方式"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.input_type == 0 ? "手工录入" : "从列表中选取" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="input_list"
          label="可选值列表"
          width="280"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="100" align="center">
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
    <el-dialog
      title="添加商品属性"
      :visible.sync="dialogFormVisible"
      width="50%"
    >
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          label="属性名称："
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类型：" :label-width="formLabelWidth">
          <el-select
            v-model="form.product_attribute_category_id"
            placeholder="请选择商品类型"
            clearable
          >
            <el-option
              v-for="item in typeData"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类筛选样式：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.filter_type">
            <el-radio :label="0">普通</el-radio>
            <el-radio :label="1">颜色</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="能否进行检索：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.search_type">
            <el-radio :label="0">不需要检索</el-radio>
            <el-radio :label="1">关键字检索</el-radio>
            <el-radio :label="2">范围检索</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品属性关联：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.related_status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="属性是否可选：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.select_type">
            <el-radio :label="0">唯一</el-radio>
            <el-radio :label="1">单选</el-radio>
            <el-radio :label="2">复选</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="输入值的录入方式：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.input_type">
            <el-radio :label="0">手工录入</el-radio>
            <el-radio :label="1">从下面列表中选择</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="属性可选值列表："
          :label-width="formLabelWidth"
          prop="input_list"
        >
          <el-input v-model="form.input_list" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否支持手动新增：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.hand_add_status">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="排序属性："
          :label-width="formLabelWidth"
          prop="sort"
        >
          <el-input v-model="form.sort" autocomplete="off"></el-input>
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
import { pageQueryAttribute, saveOrUpdateAttribute, deleteById } from "@/api/product/attribute"
import { pageQueryType } from "@/api/product/type"
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
        product_attribute_category_id: null,
        filter_type: 0,
        search_type: 0,
        select_type: 0,
        input_type: 0,
        input_list: "",
        hand_add_status: 0,
        related_status: 0,
        sort: 0
      },
      formLabelWidth: "180px",
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
      },
      typeData: []
    };
  },
  computed: {
    type () {
      return this.$route.query.type
    },
    productType () {
      return this.$route.query.aname
    },
    aid () {
      return this.$route.query.aid
    },
  },
  methods: {
    async toAddProductType () {
      this.form = {
        name: "",
        product_attribute_category_id: null,
        filter_type: 0,
        search_type: 0,
        select_type: 0,
        input_type: 0,
        input_list: "",
        hand_add_status: 0,
        related_status: 0,
        sort: 0
      }
      let res = await pageQueryType({ pageNum: 1, pageSize: 1000 })
      this.typeData = res.data
      this.form.product_attribute_category_id = Number(this.aid)
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
    async pageQueryAttribute () {
      let temp = {
        ...this.params,
        type: this.type,
        product_attribute_category_id: this.aid
      }
      let res = await pageQueryAttribute(temp)
      console.log(res, "分页查询");
      this.tableData = res.data
      this.total = res.total
    },
    // 删除
    handleDelete (id) {
      this.$confirm('此操作将永久删除该商品属性, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // console.log(id);
        let res = await deleteById({ id })
        console.log(res);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        await this.pageQueryAttribute()
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
          this.form.type = this.type
          let result = await saveOrUpdateAttribute(this.form)
          console.log(result);
          //   更新页面
          this.pageQueryAttribute()
          this.$message({
            message: '恭喜你，成功添加商品属性！',
            type: 'success'
          });
          this.dialogFormVisible = false
        } else {
          const h = this.$createElement;
          this.$notify({
            title: '注意：',
            message: h('i', { style: 'color: #304156' }, '属性名称未填写，必须填写属性名称才能完成提交！')
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
    async getTypeData () {
      let res = await pageQueryType({ pageNum: 1, pageSize: 1000 })
      this.typeData = res.data
    }
  },
  watch: {
    params: {
      handler () {
        this.pageQueryAttribute()
      },
      deep: true
    }
  },
  created () {
    this.pageQueryAttribute()
    // console.log(this.$route.query);
    this.getTypeData()
    // this.productType = this.$route.query.name
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