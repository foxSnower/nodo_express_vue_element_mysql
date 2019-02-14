<template>
  <div>
    <el-row>
      <el-button type="primary" icon="el-icon-plus" @click="edit('add')"> 新增信息</el-button>
    </el-row>
    <el-table border stripe :data="tableData" ref="myTable" v-loading="loading" highlight-current-row>
      <el-table-column fixed label="序号" align="center" type="index" width="55"></el-table-column>
      <el-table-column fixed label="商铺信息" min-width="150">
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
          <el-button size='mini' type='text' @click="edit('edit',scope.row)">
            <i class="el-icon-edit"></i> 修改</el-button>
          <el-button size='mini' type='text' @click="showDetail(scope.row)">
            <i class="el-icon-document"></i> 详情</el-button>
          <el-button v-if="scope.row.shop_status!='3'" size='mini' type='text' class="f-warn" @click="delShop(scope.row.shop_id)">
            <i class="el-icon-delete"></i> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <HPage :total="total" :currentPage.sync="currentPage" :pageSize.sync="pageSize" @getData="getData"></HPage>
    <UsersEdit ref="usersEdit" @getData="getData"></UsersEdit>
    <UsersDetail ref="usersDetail" @getData="getData"></UsersDetail>
  </div>
</template>

<script>
import { UsersRules } from '@/utils/rules.js';
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
      tableData: []
    };
  },
  components: {
    HPage: () => import('@components/HPage'),
    UsersEdit: () => import('./Components/UsersEdit'),
    UsersDetail: () => import('./Components/UsersDetail'),
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api
        .getShop({
          page: this.currentPage,
          limit: this.pageSize
        })
        .then(res => {
          this.total = res.data.count;
          this.tableData = res.data.data;
        });
    },
    //编辑
    edit(type, row) {
      this.$refs.usersEdit.edit(type, row);
    },
    showDetail(row){
      this.$refs.usersDetail.showDetail(row);
    },
    //删除
    delShop(shop_id) {
      this.$confirm('删除后,将失去此信息,是否继续？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '是',
        cancelButtonText: '否',
        callback: action => {
          if (action === 'confirm') {
            this.$api.delShop({ shop_id: shop_id }).then(res => {
              this.$message.success(res.msg);
              this.getData();
            });
          }
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
