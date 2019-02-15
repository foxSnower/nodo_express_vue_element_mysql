<template>
  <div class="login_bg">
    <div class="login_mark"></div>
    <div class="login_form">
      <div class="login_lf">
        <img src="@assets/logo.png">
      </div>
      <div class="login_rt">
        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRule" label-width="100px" size="medium" hide-required-asterisk>
          <el-form-item label="账户" prop="user_name">
            <el-input v-model.trim="loginForm.user_name" maxLength="20"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="user_password">
            <el-input v-model.trim="loginForm.user_password" maxLength="20"></el-input>
          </el-form-item>
          <el-form-item style="text-align:right">
            <el-button width="180px" type="primary" @click="login">登 录</el-button>
            <el-button width="180px" type="primary" @click="getToken">测试token</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <div class="login_gif" id="scrollBackground" style="">
    </div> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        user_name: null,
        user_password: null
      },
      loginFormRule: {
        user_name: [{ required: true, message: '账户不能为空', trigger: 'blur' }],
        user_password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    };
  },
  mounted() {
    // window.onload = function() {
    //   var scrollBackground = {
    //     object: document.getElementById('scrollBackground'),
    //     endTop: 3657,
    //     nowTop: 0
    //   };
    //   var scrollInterval = setInterval(function() {
    //     scrollBackground.nowTop = scrollBackground.nowTop != scrollBackground.endTop ? scrollBackground.nowTop + 1 : 0;
    //     scrollBackground.object.style.backgroundPosition = '0px -' + scrollBackground.nowTop + 'px';
    //   }, 50);
    // };
  },
  methods: {
    login() {
      let loginForm = this.loginForm;
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          this.$api
            .login({
              user_name: loginForm.user_name,
              user_password: loginForm.user_password
            })
            .then(res => {
              this.$cookie.set(this.$GLOBAL.TOKEN, res.data, { expires: this.$GLOBAL.TOKENTIME / 2 + 'm' });
              this.$cookie.set(this.$GLOBAL.REFRESHTOKEN, res.data, { expires: this.$GLOBAL.TOKENTIME + 'm' });
              this.$router.push('Index');
              this.$message.success(res.msg);
            });
        }
      });
    },
    getToken() {
      this.$api.getToken().then(res => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.login_bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url('~@assets/login_bg.jpg') no-repeat;
  background-size: cover;
  .login_mark {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
  .login_form {
    width: 800px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -400px;
    margin-top: -150px;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 20px #fff;
    text-align: center;
    .login_lf {
      position: relative;
      width: 40%;
      height: 100%;
      float: left;
      &:after {
        content: '';
        position: absolute;
        height: 50%;
        width: 2px;
        right: 0;
        top: 50%;
        margin-top: -25%;
        background: #ef8e6b;
        background: linear-gradient(transparent, #ef8e6b, transparent);
      }
      img {
        position: absolute;
        width: 180px;
        height: 25%;
        top: 50%;
        left: 50%;
        margin-left: -90px;
        margin-top: -12.5%;
      }
    }
    .login_rt {
      position: relative;
      float: left;
      width: 60%;
      height: 100%;
      .el-form {
        position: absolute;
        width: 80%;
        left: 50%;
        margin-left: -45%;
        margin-top: 80px;
      }
    }

    /deep/ .el-form-item__label {
      color: #ef8e6b;
    }
  }
}
.login_gif {
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 0;
  // bottom: 0;
  height: 150px;
  background: url('~@assets/login_bg.jpg') no-repeat;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: initial;
  background-position: 0px -1925px;
  background-repeat: no-repeat no-repeat;
  z-index: 2;
}
</style>





