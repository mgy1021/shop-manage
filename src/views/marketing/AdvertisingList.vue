<!--
 * @Description: 广告列表
 * @Author: Mogy
 * @Date: 2022-02-13 11:47:53
 * @LastEditors: Mogy
 * @LastEditTime: 2022-02-25 22:45:02
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
                ><el-form-item label="广告名称:">
                  <el-input
                    clearable
                    v-model="formInline.name"
                    placeholder="广告名称"
                  ></el-input> </el-form-item
              ></el-col>
              <el-col :span="8">
                <el-form-item label="广告位置:">
                  <el-select
                    v-model="formInline.type"
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
    <el-card class="box-card">
      <div class="box-card-addbox">
        <div><i class="el-icon-tickets mr10px size18px"></i>数据列表</div>
        <div>
          <el-button @click="toAdd">添加广告</el-button>
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
        <el-table-column prop="name" label="广告名称" align="center">
        </el-table-column>
        <el-table-column
          prop="type"
          label="广告位置"
          align="center"
          width="120"
        >
          <template slot-scope="scope">
            {{ scope.row.type == 1 ? "app首页轮播" : "PC首页轮播" }}
          </template>
        </el-table-column>
        <el-table-column prop="pic" label="广告图片" align="center" width="150">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.pic"
              :preview-src-list="[scope.row.pic]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="start_time"
          label="时间"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <div style="margin-bottom: 10px">
              {{ moment(scope.row.start_time).format("YYYY-MM-DD HH:mm:ss") }}
            </div>
            <div>
              {{ moment(scope.row.end_time).format("YYYY-MM-DD HH:mm:ss") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="上线/下线" align="center" width="120">
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
          prop="click_count"
          label="点击次数"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="order_count"
          label="生成订单"
          align="center"
          width="120"
        >
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <div class="btn_box">
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
    <!-- 添加模态框 -->
    <el-dialog :title="title" :visible.sync="dialogTableVisible" top="5%">
      <el-form
        :model="addFormInline"
        :rules="rules"
        ref="ruleForm"
        class="demo-form-inline"
      >
        <el-form-item label="广告名称：" label-width="200px" prop="name">
          <el-input
            v-model="addFormInline.name"
            placeholder="广告名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="广告位置：" label-width="200px">
          <el-select
            clearable
            v-model="addFormInline.type"
            placeholder="请选择广告位置"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" label-width="200px" prop="start_time">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="addFormInline.start_time"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" label-width="200px" prop="end_time">
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="addFormInline.end_time"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上下线状态：" label-width="200px">
          <el-radio-group v-model="addFormInline.status">
            <el-radio :label="0">下线</el-radio>
            <el-radio :label="1">上线</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="广告图片：" label-width="200px">
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
        <el-form-item label="排序：" label-width="200px">
          <el-input v-model="addFormInline.sort" placeholder="排序"></el-input>
        </el-form-item>
        <el-form-item label="广告链接：" label-width="200px" prop="url">
          <el-input
            v-model="addFormInline.url"
            placeholder="广告链接"
          ></el-input>
        </el-form-item>
        <el-form-item label="广告备注：" label-width="200px">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addFormInline.note"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { pageQueryAdvertisingList, deleteById, saveOrUpdateAdvertisingList } from "@/api/marketing/AdvertisingList"
import moment from "moment"
import { uploadFileURL, showFileURL } from "@/utils/config"
import { getQiuNiuToken } from "@/api/config.js"

export default {
  data () {
    return {
      moment,
      formInline: {
        name: null
      },
      imageUrl: '',
      uploadFileURL,
      options: [
        {
          id: 0,
          name: 'PC首页轮播',
          value: 0
        },
        {
          id: 1,
          name: 'app首页轮播',
          value: 1
        }
      ],
      params: {
        pageNum: 1,
        pageSize: 5
      },
      addFormInline: {},
      total: 0,
      tableData: [],
      dialogTableVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
        ],
        start_time: [
          { required: true, message: '请选择开始时间', trigger: 'blur' }
        ],
        end_time: [
          { required: true, message: '请选择结束时间', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入广告链接', trigger: 'blur' }
        ]
      },
      title: '添加广告',
      uploadData: { key: '', token: '' },
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
    async pageQueryAdvertisingListData () {
      let temp = {
        ...this.params,
        ...this.formInline
      }
      let res = await pageQueryAdvertisingList(temp)
      this.tableData = res.data,
        this.total = res.total
    },
    toReset () {
      this.formInline = {
        name: null,
        recommend_status: null
      }
      this.pageQueryAdvertisingListData()
    },
    toSearch () {
      console.log(this.formInline);
      this.params.pageNum = 1
      this.pageQueryAdvertisingListData()
    },
    toAdd () {
      this.title = "添加广告"
      this.addFormInline = {}
      this.dialogTableVisible = true
      this.imageUrl = "";
    },
    async toChangeSwitch (row) {
      let temp = { ...row }
      temp.start_time = moment(temp.start_time).format("YYYY-MM-DD HH:mm:ss")
      temp.end_time = moment(temp.end_time).format("YYYY-MM-DD HH:mm:ss")
      let res = await saveOrUpdateAdvertisingList(temp)
      this.$message({
        message: '修改成功！',
        type: 'success'
      });
    },
    toDelete (id) {
      this.$confirm('此操作将取消推荐该广告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await deleteById({ id })
        this.pageQueryAdvertisingListData()
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
    // 提交添加
    toSubmit () {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          if (this.title == "编辑广告") {
            console.log(this.addFormInline, "add");
            this.addFormInline.start_time = moment(this.addFormInline.start_time).format("YYYY-MM-DD HH:mm:ss")
            this.addFormInline.end_time = moment(this.addFormInline.end_time).format("YYYY-MM-DD HH:mm:ss")
            let res = await saveOrUpdateAdvertisingList(this.addFormInline)
            this.dialogTableVisible = false
            this.pageQueryAdvertisingListData()
            this.$message({
              type: 'success',
              message: '编辑成功!'
            });
          } else {
            this.addFormInline.click_count = 0
            this.addFormInline.order_count = 0
            let res = await saveOrUpdateAdvertisingList(this.addFormInline)
            this.dialogTableVisible = false
            this.pageQueryAdvertisingListData()
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    toEdit (row) {
      this.title = "编辑广告"
      this.imageUrl = row.pic;
      this.addFormInline = { ...row }
      this.dialogTableVisible = true
    },
    //   图片上传成功的回调函数
    handleAvatarSuccess (res, file) {
      // console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      //   console.log(this.imageUrl);
      this.addFormInline.pic = showFileURL + `upload_pic_${file.name}`
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
    }
  },
  watch: {
    params: {
      handler (newValue) {
        this.pageQueryAdvertisingListData()
      },
      deep: true
    },
  },
  created () {
    this.pageQueryAdvertisingListData()
    // this.pageQuerySubject()
    this.getQiuNiuTokenData()
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
  .numbercolor {
    color: #409eff;
  }
  ::v-deep .el-dialog {
    .el-input {
      width: 300px;
    }
    .el-textarea {
      width: 300px;
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