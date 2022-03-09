<!--
 * @Description: 
 * @Author: Mogy
 * @Date: 2021-12-07 13:52:04
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-28 13:19:45
-->
<template>
  <div class="app-container">
    <div class="content-box">
      <div class="from_box">
        <el-steps :align-center="true" :active="active" finish-status="success">
          <el-step title="填写商品信息"></el-step>
          <el-step title="填写商品促销"></el-step>
          <!-- <el-step title="填写商品属性"></el-step> -->
          <el-step title="选择商品关联"></el-step>
        </el-steps>
        <el-form
          v-show="active == 0"
          label-position="left"
          ref="formA"
          :model="form"
          label-width="80px"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item label="商品分类" prop="product_category_id">
            <el-cascader
              clearable
              v-model="form.product_category_id"
              :options="options"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="副标题" prop="sub_title">
            <el-input v-model="form.sub_title"></el-input>
          </el-form-item>
          <el-form-item label="商品品牌" prop="brand_id">
            <el-select
              v-model="form.brand_id"
              placeholder="请选择商品品牌"
              clearable
              @change="handleBrandChange"
            >
              <el-option
                v-for="item in brandData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品图片" prop="sub_title">
            <el-upload
              class="avatar-uploader"
              :action="uploadFileURL"
              :show-file-list="false"
              :data="uploadData"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="uploadError"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品介绍">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="商品货号">
            <el-input v-model="form.product_sn"></el-input>
          </el-form-item>
          <el-form-item label="商品售价">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价">
            <el-input v-model="form.original_price"></el-input>
          </el-form-item>
          <el-form-item label="商品库存">
            <el-input v-model="form.stock"></el-input>
          </el-form-item>
          <el-form-item label="计量单位">
            <el-input v-model="form.unit"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.weight"></el-input>
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="form.sort"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item> -->
          <div>
            <div style="margin: 12px calc(50% - 75px)">
              <el-button type="primary" @click="next"
                >下一步,填写商品促销</el-button
              >
            </div>
          </div>
        </el-form>
        <el-form
          v-if="active == 1"
          label-position="left"
          :model="form"
          label-width="100px"
        >
          <el-form-item label="赠送积分">
            <el-input v-model="form.gift_point"></el-input>
          </el-form-item>
          <el-form-item label="赠送成长值">
            <el-input v-model="form.gift_growth"></el-input>
          </el-form-item>
          <el-form-item label="积分购买限制">
            <el-input v-model="form.use_point_limit"></el-input>
          </el-form-item>
          <el-form-item label="预告商品">
            <el-switch
              v-model="form.preview_status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>
          <el-form-item label="商品上架">
            <el-switch
              v-model="form.publish_status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch>
          </el-form-item>
          <el-form-item label="商品推荐">
            <span style="margin-right: 10px">新品</span
            ><el-switch
              v-model="form.new_status"
              :active-value="1"
              :inactive-value="0"
            ></el-switch
            ><span style="margin: 0 10px">推荐</span
            ><el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="form.recommand_status"
            ></el-switch>
          </el-form-item>
          <el-form-item label="服务保证">
            <el-checkbox-group v-model="form.service_ids">
              <el-checkbox :label="1" name="type">无忧退货</el-checkbox>
              <el-checkbox :label="2" name="type">快速退款</el-checkbox>
              <el-checkbox :label="3" name="type">免费包邮</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="详细页标题">
            <el-input v-model="form.detail_title"></el-input>
          </el-form-item>
          <el-form-item label="详细页描述">
            <el-input v-model="form.detail_desc"></el-input>
          </el-form-item>
          <el-form-item label="商品关键字">
            <el-input v-model="form.keywords"></el-input>
          </el-form-item>
          <el-form-item label="商品备注">
            <el-input type="textarea" v-model="form.note"></el-input>
          </el-form-item>
          <el-form-item label="选择优惠方式">
            <el-radio-group
              v-model="form.promotion_type"
              style="margin-bottom: 30px"
            >
              <el-radio-button :label="0">无优惠</el-radio-button>
              <el-radio-button :label="1">特惠促销</el-radio-button>
              <!-- <el-radio-button :label="2">会员价格</el-radio-button> -->
              <el-radio-button :label="3">阶梯价格</el-radio-button>
              <el-radio-button :label="4">满减价格</el-radio-button>
            </el-radio-group>
            <div v-if="form.promotion_type == 1" style="width: 70%">
              <div style="margin: 0 10px 10px 10px">
                <span>开始时间：</span>
                <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="form.promotion_start_time"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </div>
              <div class="mg10px">
                <span>结束时间：</span>
                <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="form.promotion_end_time"
                  type="datetime"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </div>
              <div class="mg10px">
                <span>促销价格：</span>
                <el-input
                  style="width: 220px"
                  v-model="form.promotion_price"
                ></el-input>
              </div>
            </div>
            <!-- <div v-else-if="form.promotion_type == 2" style="width: 70%">
              <div style="margin: 0 10px 10px 10px">
                <span>黄金会员：</span>
                <el-input style="width: 220px" v-model="form.name"></el-input>
              </div>
              <div class="mg10px">
                <span>白金会员：</span>
                <el-input style="width: 220px" v-model="form.name"></el-input>
              </div>
              <div class="mg10px">
                <span>钻石会员：</span>
                <el-input style="width: 220px" v-model="form.name"></el-input>
              </div>
            </div> -->
            <div v-else-if="form.promotion_type == 3" style="width: 70%">
              <el-table :data="gradientPriceData" border style="width: 100%">
                <el-table-column prop="count" label="数量" align="center">
                  <template slot-scope="scope">
                    <el-input
                      placeholder="请输入数量"
                      v-model="scope.row.count"
                      clearable
                    >
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="discount"
                  label="折扣"
                  width="120"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input
                      placeholder="请输入折扣"
                      v-model="scope.row.discount"
                      clearable
                    >
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click="toAddGradientPrice(scope.row)"
                      type="text"
                      size="small"
                      >添加</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="toDeleteGradientPrice(scope.$index, scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else-if="form.promotion_type == 4" style="width: 70%">
              <el-table :data="fullMinusData" border style="width: 100%">
                <el-table-column prop="date" label="满" align="center">
                  <template slot-scope="scope">
                    <el-input
                      placeholder="满"
                      v-model="scope.row.full_price"
                      clearable
                    >
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="减"
                  width="120"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input
                      placeholder="减"
                      v-model="scope.row.reduce_price"
                      clearable
                    >
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click="toAddFullMinus(scope.row)"
                      type="text"
                      size="small"
                      >添加</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="toDeleteFullMinus(scope.$index, scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-form-item>
          <div>
            <div class="btn_box">
              <el-button @click="preStep">上一步,填写商品信息</el-button>
              <el-button type="primary" @click="next"
                >下一步,选择商品关联</el-button
              >
            </div>
          </div>
        </el-form>
        <!-- <el-form
          v-if="active == 2"
          label-position="left"
          :model="form"
          label-width="100px"
        >
          <el-form-item label="属性类型">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品参数">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品相册">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="规格参数">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="商品推荐">
            <span style="margin-right: 10px">新品</span
            ><el-switch v-model="form.delivery"></el-switch
            ><span style="margin: 0 10px">推荐</span
            ><el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="服务保证">
            <el-checkbox-group v-model="form.type">
              <el-checkbox :label="1" name="type">无忧退货</el-checkbox>
              <el-checkbox :label="2" name="type">快速退款</el-checkbox>
              <el-checkbox :label="3" name="type">免费包邮</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="详细页标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="详细页描述">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品关键字">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="商品备注">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <div>
            <div class="btn_box">
              <el-button @click="preStep">上一步,填写商品促销</el-button>
              <el-button type="primary" @click="next"
                >下一步,填写商品关联</el-button
              >
            </div>
          </div>
        </el-form> -->
        <el-form
          v-if="active == 2"
          label-position="left"
          ref="form"
          :model="form"
          label-width="100px"
        >
          <div style="margin-bottom: 30px">
            <el-row>
              <el-col :span="3">
                <div>关联专题：</div>
              </el-col>
              <el-col :span="21">
                <el-transfer
                  :titles="['待选择', '已选择']"
                  filterable
                  :filter-method="filterMethod"
                  filter-placeholder="请输入专题名称"
                  v-model="sujectIds"
                  :data="data"
                >
                </el-transfer>
              </el-col>
            </el-row>
          </div>
          <!-- <div style="margin: 20px 0">
            <el-row>
              <el-col :span="3">
                <div>关联优选：</div>
              </el-col>
              <el-col :span="21">
                <el-transfer
                  filterable
                  :filter-method="filterMethod"
                  filter-placeholder="请输入城市拼音"
                  v-model="value"
                  :data="data"
                >
                </el-transfer>
              </el-col>
            </el-row>
          </div> -->
          <div class="btn_box">
            <el-button @click="preStep">上一步,填写商品促销</el-button>
            <el-button type="primary" @click="onSubmit"
              >完成，提交商品</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/user"
import { pageQuerySubject } from "@/api/marketing/subject"
import { pageQueryCategory } from "@/api/product/category"
import { pageQueryBrand } from "@/api/product/brand"
import { saveOrUpdateProduct, findOne } from "@/api/product/list"
import { saveOrUpdateSubjectProductRelation } from "@/api/marketing/subjectProductRelation"
import { saveOrUpdateProductLadder } from "@/api/product/product_ladder"
import { saveOrUpdateProductFullReduction } from "@/api/product/product_full_reduction"
import { uploadFileURL, showFileURL } from "@/utils/config"
import { getQiuNiuToken } from "@/api/config.js"

export default {
  data () {
    return {
      imageUrl: '',
      uploadFileURL,
      active: 0,
      options: [],
      brandData: [],
      categoryData: [],
      pic: null,
      gradientPriceData: [
        { count: 0, discount: 0 }
      ],  //梯度价格
      fullMinusData: [
        { full_price: 0, reduce_price: 0 }
      ],       //满减价格
      form: {
        product_category_id: '',
        name: '',
        sub_title: '',  //副标题
        brand_id: null,
        description: "", //商品描述
        product_sn: "",  //货号
        original_price: null, //市场价格
        price: null,                  // 售价
        stock: null,                  //库存
        unit: null,                   //单位
        weight: null,                 //重量
        sort: 0,                      //排序
        gift_point: null,             //赠送积分
        gift_growth: null,            //赠送成长值
        use_point_limit: null,        //积分使用限制
        preview_status: null,         //是否是预告商品
        publish_status: null,         //上架/下架
        service_ids: [],              //服务保证
        new_status: null,             //是否是新品
        recommand_status: null,       //推荐
        detail_title: null,           //详细页标题
        detail_desc: null,            //详细页描述
        keywords: null,               //商品关键字
        note: null,                   //备注
        promotion_type: 0              //优惠类型
      },
      uploadData: { key: '', token: '' },
      rules: {
        product_category_id: [
          { required: true, message: '请输入商品分类', trigger: 'change' },
        ],
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        sub_title: [
          { required: true, message: '请输入副标题', trigger: 'blur' },
        ],
        brand_id: [
          { required: true, message: '请选择品牌', trigger: 'change' },
        ]
      },
      radio: "无优惠",
      value1: "",
      data: [],
      sujectIds: [],
      filterMethod (query, item) {
        return item.label.indexOf(query) > -1;
      }
    };
  },
  computed: {
    proId () {
      return this.$route.query.id
    }
  },
  methods: {
    //   图片上传成功的回调函数
    handleAvatarSuccess (res, file) {
      // console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      //   console.log(this.imageUrl);
      this.form.pic = showFileURL + `upload_pic_${file.name}`
      //   console.log(showFileURL + `upload_pic_${file.name}`);
    },
    //   图片上传之前的回调函数
    beforeAvatarUpload (file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log(isLt2M);
      if (!isJPG) {
        console.log("test");
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        console.log("test");
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.uploadData.key = `upload_pic_${file.name}`;
      return isJPG && isLt2M;
    },
    uploadError (err, file, fileList) {
      console.log(err);
      this.$message({
        message: "上传出错，请重试！",
        type: "error",
        center: true
      });
    },
    async getQiuNiuTokenData () {
      let qiuniuData = await getQiuNiuToken()
      this.uploadData.token = qiuniuData.data.uploadToken
    },
    // 进度条下一步
    next () {
      if (this.active++ > 2) this.active = 0;
    },
    preStep () {
      if (this.active-- < 0) this.active = 0;
    },
    onSubmit () {
      console.log(this.$refs["form"]);
      this.$refs["formA"].validate(async (valid) => {
        console.log(valid);
        if (valid) {
          this.form.service_ids = this.form.service_ids.toString(",")
          //   console.log(this.form);
          if (this.active++ > 2) this.active = 0;
          for (let key in this.form) {
            if (this.form[key] === "" || this.form[key] === null) {
              delete this.form[key]
            }
          }
          let res = await saveOrUpdateProduct(this.form)
          let insertId = res.data.insertId
          //   console.log(this.sujectIds);
          console.log(this.gradientPriceData, "this.gradientPriceData");
          if (this.gradientPriceData.length > 0 && this.gradientPriceData[this.gradientPriceData.length - 1].count != 0) {
            this.gradientPriceData.forEach(async (item) => {
              let params = { product_id: insertId, count: item.count, discount: item.discount, price: this.form.price * item.count * item.discount }
              await saveOrUpdateProductLadder(params)
            })
          }
          if (this.fullMinusData.length > 0 && this.fullMinusData[this.fullMinusData.length - 1].full_price != 0) {
            this.fullMinusData.forEach(async (item) => {
              let params = { product_id: insertId, full_price: item.full_price, reduce_price: item.reduce_price }
              await saveOrUpdateProductFullReduction(params)
            })
          }
          if (this.sujectIds.length > 0) {
            this.sujectIds.forEach(async (item) => {
              let temp = {
                subject_id: item,
                product_id: insertId
              }
              await saveOrUpdateSubjectProductRelation(temp)
            })
          }
          if (this.proId) {
            this.$message({
              message: '修改商品成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '新增商品成功',
              type: 'success'
            });
          }
          this.$router.push({ path: "/product/productlist" })
        } else {
          this.$message.error('没有填写必填项');
          return false;
        }
      });
    },
    async pageQuerySubjectData () {
      let res = await pageQuerySubject({ pageNum: 1, pageSize: 1000 })
      const data = res.data.map(item => {
        return { label: item.title, key: item.id }
      })
      this.data = data
    },
    async getCategoryData () {
      let option = []
      let childrenOption = []
      let temp = {
        pageNum: 1,
        pageSize: 1000
      }
      let res = await pageQueryCategory(temp)
      this.categoryData = res.data
      res.data.forEach(item => {
        if (item.parent_id == 0) {
          option.push(item)
        } else {
          childrenOption.push(item)
        }
      });
      option = option.map((item) => {
        return { value: item.id, label: item.name, children: [], obj: item }
      })
      childrenOption = childrenOption.map((item) => {
        return { value: item.id, label: item.name, obj: item }
      })
      option.forEach((i) => {
        childrenOption.forEach((item) => {
          if (item.obj.parent_id == i.obj.id) {
            i.children.push(item)
          }
        })
      })
      this.options = option
      console.log(this.options);
    },
    async pageQueryBrandData () {
      let temp = {
        pageNum: 1,
        pageSize: 1000
      }
      let res = await pageQueryBrand(temp)
      this.brandData = res.data
    },
    handleChange (value) {
      if (value.length > 0) {
        this.form.product_category_id = value.pop()
        this.categoryData.forEach(item => {
          if (item.id == this.form.product_category_id) {
            this.form.product_category_name = item.name
          }
        })
      }
      console.log(this.form.product_category_id);
    },
    handleBrandChange (value) {
      this.brandData.forEach(item => {
        if (item.id == value) {
          this.form.brand_name = item.name
        }
      })
    },
    toAddGradientPrice () {
      this.gradientPriceData.push({ count: 0, discount: 0 })
    },
    toAddFullMinus () {
      this.fullMinusData.push({ full_price: 0, reduce_price: 0 })
    },
    toDeleteGradientPrice (id, row) {
      this.gradientPriceData = this.gradientPriceData.filter((item, index) => {
        return index != id
      })
    },
    toDeleteFullMinus (id, row) {
      this.fullMinusData = this.fullMinusData.filter((item, index) => {
        return index != id
      })
    },
    async findOne () {
      if (!this.proId) {
        return
      }
      let res = await findOne({ id: this.proId })
      this.form = res.data
      this.imageUrl = res.data.pic
    }
  },
  created () {
    this.pageQuerySubjectData()
    this.getCategoryData()
    this.pageQueryBrandData()
    this.findOne()
    this.getQiuNiuTokenData()
  },
  mounted () { }
};
</script>
<style lang="scss" scoped>
.content-box {
  //   height: 500px;
  /* background: turquoise; */
  width: 68%;
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

// 图片上传样式
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>