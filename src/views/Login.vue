<template>
  <div class="login_bg">
    <div class="login_mark"></div>
    <div class="login_form">
      <div class="login_lf">
        <img src="@assets/logo.png">
      </div>
      <div class="login_rt">
        <el-form ref="form" label-width="100px" label-color="#ccc">
          <el-form-item label="账号">
            <el-input v-model="user_name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="user_password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="addUser">登 录</el-button>
        </el-form>
      </div>
    </div>
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
  methods: {
    addUser() {
      this.$api.addUser({
        user_name:this.user_name,
        user_password:this.user_password
      }).then(res=>{
        console.log(res);
        
      })
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
        top:50%;
        margin-top: -25%;
        background: #ef8e6b;
        background: linear-gradient(transparent, #ef8e6b, transparent);
      }
      img {
        position: absolute;
        width: 180px;
        height:25%;
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
</style>





