<template>
  <div class="login-container">
    <div class="title-container">
      <h3 class="title">电商后台管理系统</h3>
    </div>
    <el-form
      v-if="pageStatus"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-form-item style="border: none">
        <el-button
          size="medium"
          :loading="loading"
          style="
            width: 100%;
            background: #00b38a;
            color: #ffffff;
            margin: 0 auto;
          "
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form-item>

      <el-form-item style="border: none; text-align: right; margin-top: -12px">
        <el-button
          class="zhuce"
          type="text"
          style="color: #666; margin-right: 10px"
          @click.native.prevent="handleRegisterSwitch"
          >立即注册</el-button
        >
      </el-form-item>

      <!-- <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
    <el-form
      v-if="!pageStatus"
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="registerForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <div
        style="display: flex; justify-content: space-around; border: none"
        class="el-form-item"
      >
        <el-form-item
          prop="code"
          style="width: 240px; margin: 0; margin-left: -12px"
        >
          <span class="svg-container">
            <svg-icon icon-class="example" />
          </span>
          <el-input
            ref="code"
            v-model="registerForm.code"
            placeholder="Code"
            name="code"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>
        <el-image
          @click="toSwitchCodeImg"
          style="width: 100px; height: 47px"
          :src="codeImg"
          fit="fit"
        ></el-image>
      </div>
      <el-form-item style="border: none">
        <el-button
          size="medium"
          :loading="loading"
          style="
            width: 100%;
            background: #00b38a;
            color: #ffffff;
            margin: 0 auto;
          "
          @click.native.prevent="handleRegister"
          >注册</el-button
        >
      </el-form-item>

      <!-- <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span> password: any</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { register } from "@/api/user"
import { getCode } from "@/api/user"
import axios from "axios"
import moment from "moment"
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请填写用户名'))
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请填写密码'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length <= 0) {
        callback(new Error('请填写验证码'))
      } else {
        callback()
      }
    }

    return {
      moment,
      pageStatus: 1,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        code: ""
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请填写用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请填写密码' }]
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', message: '请填写用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请填写密码' }],
        code: [{ required: true, trigger: 'blur', message: '请填写验证码' }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      codeImg: `http://localhost:3000/passport/get_code/${moment(
        Date()
      ).format('X')}`
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  computed: {
  },
  methods: {
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 注册切换页面
    handleRegisterSwitch () {
      this.pageStatus = !this.pageStatus
    },
    handleRegister () {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const { username, password, code: image_code } = this.registerForm
          let res = await register({ username, password, image_code })
          this.loading = false
          this.pageStatus = !this.pageStatus
          this.$notify({
            title: '成功',
            message: '注册成功!',
            type: 'success'
          });
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    toSwitchCodeImg () {
      this.codeImg = `http://localhost:3000/passport/get_code/${moment(
        Date()
      ).format('X')}`
    },
    // async getCodeImg () {
    //   let res = await axios.get(moment(
    //     Date()
    //   ).format('X'))
    //   console.log(res);
    // }
  },
  created () {
    // this.getCodeImg()
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #ffffff;
$light_gray: #889aa4;
$cursor: #889aa4;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(75, 69, 69, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

<style lang="scss" scoped>
$bg: #ffffff;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  //   background-color: $bg;
  background-image: url("../../assets/login.jpg");
  background-size: cover;
  overflow: hidden;

  .login-form {
    border-radius: 10px;
    background-color: $bg;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 70px 35px;
    margin: 170px auto;
    overflow: hidden;
    .zhuce :hover {
      color: #31bfa9;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    top: 140px;
    .title {
      font-size: 40px;
      color: #ffffff;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
