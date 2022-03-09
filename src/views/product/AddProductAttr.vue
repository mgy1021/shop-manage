<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-12-07 13:52:04
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 11:09:16
-->
<template>
  <div class="app-container">
    <div class="content-box">
      <div class="from_box">
        <el-form
          label-position="right"
          ref="form"
          :model="form"
          label-width="150px"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item label="分类名称：" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="上级分类：">
            <el-select
              v-model="form.parent_id"
              placeholder="请选择商品分类"
              clearable
            >
              <el-option label="无上级分类" :value="0"></el-option>
              <el-option
                v-for="item in parent_category"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量单位：">
            <el-input v-model="form.product_unit"></el-input>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
          <el-form-item label="是否显示：">
            <el-radio-group v-model="form.show_status">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否显示在导航栏：">
            <el-radio-group v-model="form.nav_status">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分类图标：">
            <el-input v-model="form.icon"></el-input>
          </el-form-item>
          <el-form-item label="关键字：">
            <el-input v-model="form.keywords"></el-input>
          </el-form-item>
          <el-form-item label="分类描述：">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label-width="45%">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="toReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/user"
import { pageQueryCategory, saveOrUpdate, queryOneById } from "@/api/product/category"
export default {
  data () {
    return {
      form: {
        name: '',
        parent_id: 0,
        level: 0,
        product_count: 0,
        product_unit: "",
        nav_status: 0,
        show_status: 0,
        sort: 0,
        icon: '',
        keywords: '',
        description: ""
      },
      parent_category: [],
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ]
      }
    };
  },
  computed: {},
  methods: {
    // async register () {
    //   let res = await register({ username: "mg", password: 123456, image_code: "6fyv" })
    //   console.log(res);
    // }
    onSubmit () {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          if (this.form.parent_id) {
            this.form.level = 1
          }
          let res = await saveOrUpdate(this.form)
          //   console.log(res, "添加");
          this.$message({
            message: res.message,
            type: 'success'
          });
          //   跳转页面
          this.$router.push({ path: "/product/productcategory" })
        } else {
          const h = this.$createElement;
          this.$notify({
            title: '注意：',
            message: h('i', { style: 'color: #304156' }, '分类名称未填写，必须填写分类名称才能完成提交！')
          });
          return false;
        }
      });
    },
    // 获取上级分类
    async getProductCategory () {
      let res = await pageQueryCategory({ pageNum: 1, pageSize: 1000, parent_id: 0 })
      //   console.log(res);
      this.parent_category = res.data
    },
    async getEditObj () {
      let res = await queryOneById({ id: this.$route.query.id })
      //   console.log(res);
      this.form = res.data
    },
    toReset () {
      this.form = {
        name: '',
        parent_id: 0,
        level: 0,
        product_count: 0,
        product_unit: "",
        nav_status: 0,
        show_status: 0,
        sort: 0,
        icon: '',
        keywords: '',
        description: ""
      }
    }
  },
  created () {
    // this.register()
    this.getProductCategory()
    if (this.$route.query.id) {
      this.getEditObj()
      console.log(this.$route.query);
    }
  },
  mounted () { }
};
</script>
<style lang="scss" scoped>
.content-box {
  //   height: 500px;
  /* background: turquoise; */
  width: 64%;
  margin: 0 auto;
  border: 1px solid #ebeef5;
  border-radius: 3px;
  padding: 40px;
  .from_box {
    margin: 15px 30px;
    .el-form {
      margin-top: 40px;
      .btn_box {
        width: 50%;
        margin: 0 auto;
      }
    }
  }
}
</style>