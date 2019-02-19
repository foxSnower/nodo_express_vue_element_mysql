<template>
  <div class="box">
    <el-form :model="params" ref="form" :rules="rules" label-width="120px" size="small">
      <HInput prop="old_password" label="原密码" v-model="params.old_password"></HInput>
      <HInput prop="new_password" label="新密码 " v-model="params.new_password"></HInput>
      <HInput prop="new_password_sure" label="确定新密码" v-model="params.new_password_sure"></HInput>
      <el-button type="primary" @click="submit">提 交</el-button>
    </el-form>

  </div>

</template>

<script>
import { ModifyPasswordRules } from '@/utils/rules.js';
export default {
  data() {
    return {
      params: {},
      rules: ModifyPasswordRules
    };
  },
  components: {
    HInput: () => import('@components/HInput')
  },
  methods: {
    submit() {
      this.$api.modifyPassword(this.params).then(res => {
        this.$message.success('修改成功');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 500px;
  margin: 0 auto;
  text-align: right;
}
</style>

