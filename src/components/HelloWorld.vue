<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <form>
      <el-input v-model="user_name" placeholder="名称" style="width:200px"></el-input>
      <el-input v-model="user_password" placeholder="价格" style="width:200px"></el-input>
      <el-button type="primary" @click="addUser">提交</el-button>
    </form>
    <form>
      <el-input v-model="name" placeholder="名称" style="width:200px"></el-input>
      <el-input v-model="price" placeholder="价格" style="width:200px"></el-input>
      <el-button type="primary" @click="addP">提交</el-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      user_name: null,
      user_password: null,
      name: null,
      price: null
    };
  },
  methods: {
    addUser() {
      var user_name = this.user_name;
      var user_password = this.user_password;
      this.$api
        .addUser({
          user_name,
          user_password
        })
        .then(res => {
          console.log(res);
        });
    },
    addP() {
      var name = this.name;
      var price = this.price;
      this.$api
        .addTest({
          name,
          price
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>