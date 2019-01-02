<template>
  <div>
    <el-row>
      <el-button type="primary" icon="el-icon-plus" @click="edit('add')"> 新增信息</el-button>
    </el-row>
    <el-table border stripe :data="tableData" ref="myTable" v-loading="loading" highlight-current-row>
      <el-table-column fixed label="序号" align="center" type="index" width="55"></el-table-column>
      <el-table-column fixed label="商店信息" min-width="150">
        <template slot-scope="scope">
          <div class="table-cont">
            <p>{{ scope.row.shop_name }}</p>
            <p>{{ scope.row.goods_name }}</p>
            <p>{{ scope.row.shop_address }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="店长信息" min-width="150">
        <template slot-scope="scope">
          <div class="table-cont">
            <p>{{ scope.row.shop_manager }}</p>
            <p>{{ scope.row.shop_phone }}</p>
            <p>{{ scope.row.shop_IDCard}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作记录" min-width="150">
        <template slot-scope="scope">
          <div class="table-cont">
            <p>{{ scope.row.modify_name|filterNull }}</p>
            <p>{{ scope.row.modify_time|filterNull }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag type="primary">{{scope.row.shop_status|shop_status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button size='mini' type='text'>
            <i class="el-icon-edit"></i> 修改</el-button>
          <el-button v-if="scope.row.shop_status!='3'"  size='mini' type='text'>
            <i class="el-icon-delete"></i> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <HPage :total="total" :currentPage.sync="currentPage" :pageSize.sync="pageSize" @getData="getData"></HPage>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="800px">
      <el-form :model="params" ref="form" label-width="120px" size="small">
        <HInput class="f-item2" label="商店名称" v-model="params.shop_name"></HInput>
        <HInput class="f-item2" label="主推商品 " v-model="params.goods_name"></HInput>
        <HInput class="f-item2" label="商店地址" v-model="params.shop_address"></HInput>
        <HInput class="f-item2" label="店长名称" v-model="params.shop_manager"></HInput>
        <HInput class="f-item2" label="手机号码" v-model="params.shop_phone"></HInput>
        <HInput class="f-item2" label="身份证号" v-model="params.shop_IDCard"></HInput>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      // 当前分页
      currentPage: 1,
      // 每页显示条数
      pageSize: 10,
      // 分页总数
      total: 0,
      dialogVisible: false,
      dialogTitle: '',
      dialogDisabled: false,
      tableData: [],
      params: {}
    };
  },

  components: {
    HInput: () => import('@components/HInput'),
    HSelect: () => import('@components/HSelect'),
    HPage: () => import('@components/HPage')
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.getShop({}).then(res => {
        this.tableData = res.data;
      });
    },
    //编辑
    edit(type, row) {
      this.dialogVisible = true;
      if (type === 'add') {
        this.dialogTitle = '新增用户';
        this.dialogDisabled = false;
        for (let i in this.params) {
          this.params[i] = null;
        }
      }
      if (type === 'edit') {
        this.dialogTitle = '编辑用户';
        this.dialogDisabled = true;
        this.params = Object.assign({}, row);
      }
    },
    //编辑
    editShop(params, callback) {
      this.$api.editShop(params).then(res => {
        return callback(res);
      });
    },
    //删除
    delShop(params, callback) {
      this.$api.delShop({ shop_id: params.shop_id }).then(res => {
        return callback(res);
      });
    },
    //保存
    save() {
      let params = this.params;
      if (!params.shop_id) {
        params.shop_id = null;
      }
      this.editShop(params, res => {
        this.$message.success(res.msg);
        this.dialogVisible = false;
        this.getData();
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
