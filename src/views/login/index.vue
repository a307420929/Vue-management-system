<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title"></h3>
      </div>

      <el-form-item prop="username">
        <span class="form-label">用户名</span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="form-label">密码</span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          @keyup.enter.native="handleLogin"
        />
        <!-- <span class="show-pwd" @click="showPwd"></span> -->
      </el-form-item>

      <el-form-item prop="vcode" class="vcode">
        <span class="form-label">验证码</span>
        <el-input ref="username" v-model="loginForm.vcode" placeholder="请输入验证码" type="text" />
        <span class="getVcode">获取验证码</span>
      </el-form-item>

      <div class="opt">
        <span>忘记密码?</span>
        <span>立即注册</span>
      </div>

      <el-button
        class="login"
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
      >登 录</el-button>
      <!-- 

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: any</span>
      </div>-->
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "111111",
        vcode: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$router.push({ path: "/" });
          // this.$store.dispatch('user/login', this.loginForm).then(() => {
          //   this.$router.push({ path: '/' })
          //   this.loading = false
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  position: relative;
  .el-input {
    display: inline-block;
    height: 52px;
    width: 70%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      height: 52px;

      color: #222222;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    width: 370px;
    height: 54px;
    margin: 0 auto 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    &.vcode {
      width: 250px;
      margin-left: 75px;
    }
    .getVcode {
      position: absolute;
      right: -120px;
      top: -1px;
      border-radius: 8px;
      width: 108px;
      height: 54px;
      background: #ffca4d;
      text-align: center;
      line-height: 54px;
      cursor: pointer;
    }
  }
  .opt {
    margin: 0 91px 0 83px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .login {
    position: absolute;
    bottom: 56px;
    margin: 0 75px;
    width: 370px;
    height: 54px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(34, 34, 34, 1);
    line-height: 25px;
    background: #FFCA4D;
    border:none;
    border-radius:8px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("../../assets/login_page/bg.jpg") no-repeat 100% 100%;
  // background-color: $bg;
  // overflow: hidden;

  .login-form {
    position: relative;
    top: 306px;
    width: 520px;
    height: 468px;
    background: #ffffff;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
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

  .form-label {
    padding: 6px 5px 6px 15px;
    color: #222222;
    width: 70px;
    display: inline-block;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    text-align: justify;
    text-align-last: justify;
  }

  .title-container {
    margin: 48px 100px 40px 100px;
    width: 100%;
    .title {
      display: inline-block;
      margin: 0;
      width: 319px;
      height: 28px;
      background: url("../../assets/login_page/title.png") no-repeat 100% 100%;
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
