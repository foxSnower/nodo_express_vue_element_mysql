<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
    <el-form :model="params" ref="form" :rules="rules" label-width="120px" size="small">
      <HInput class="f-item2" prop="shop_name" label="商店名称" v-model="params.shop_name"></HInput>
      <HInput class="f-item2" prop="goods_name" label="主推商品 " v-model="params.goods_name"></HInput>
      <HInput class="f-item2" prop="shop_address" label="商店地址" v-model="params.shop_address"></HInput>
      <HInput class="f-item2" prop="shop_manager" label="店长名称" v-model="params.shop_manager"></HInput>
      <HInput class="f-item2" prop="shop_phone" label="手机号码" v-model="params.shop_phone"></HInput>
      <HInput class="f-item2" prop="shop_IDCard" label="身份证号" v-model="params.shop_IDCard"></HInput>
      <HInput class="f-item2" prop="user_name" label="账号" v-model="params.user_name" disabled></HInput>
      <HInput class="f-item2" prop="password" label="密码" v-model="params.password"></HInput>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { UsersRules } from '@/utils/rules.js';
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: '',
      params: {},
      rules: UsersRules
    };
  },
  components: {
    HInput: () => import('@components/HInput'),
    HSelect: () => import('@components/HSelect')
  },
  watch: {
    'params.shop_phone': function(curVal) {
      this.$set(this.params, 'user_name', curVal);
    }
  },
  methods: {
    //编辑
    edit(type, row) {
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
      });
      if (type === 'add') {
        this.dialogTitle = '新增用户';
        for (let i in this.params) {
          this.params[i] = null;
        }
      }
      if (type === 'edit') {
        this.dialogTitle = '修改用户';
        this.params = Object.assign({}, row);
      }
    },
    //保存
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = this.params;
          if (!params.shop_id) {
            params.shop_id = null;
          }
          this.$api.editShop(params).then(res => {
            this.$message.success(res.msg);
            this.dialogVisible = false;
            this.$emit('getData');
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.f-item2 {
  float: left;
}
</style>
