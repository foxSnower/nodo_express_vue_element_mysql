<template>
  <div class="login_bg">
    <div class="login_mark"></div>
    <div class="login_form">
      <div class="login_lf">
        <img src="@assets/logo.png">
      </div>
      <div class="login_rt">
        <el-form ref="form" label-width="100px" size="medium">
          <el-form-item label="账号">
            <el-input v-model="user_name" maxLength="20"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="user_password" maxLength="20"></el-input>
          </el-form-item>
          <el-form-item style="text-align:right">
            <el-button width="180px" type="primary" @click="addUser">登 录</el-button>
            <!-- <el-button width="180px" type="primary" @click="$router.push('/AnimationForCss3')">CSS 3</el-button> -->
            <el-button width="180px" type="primary" @click="goRegister">注册</el-button>
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
      user_name: null,
      user_password: null
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
    addUser() {
      this.$api
        .addUser({
          user_name: this.user_name,
          user_password: this.user_password
        })
        .then(res => {
          console.log(res);
        });
      //  this.$api
      //   .addTest({
      //     name: this.user_name,
      //     price: this.user_password
      //   })
      //   .then(res => {
      //     console.log(res);
      //   });
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





