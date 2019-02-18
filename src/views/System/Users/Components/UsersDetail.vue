<template>
  <el-dialog title="账号详情" :visible.sync="dialogVisible" width="800px">
    <div class="box-card">
      <div class="title">基本信息</div>
      <div class="cont">
        <div class="f-clear">
          <div class="f-item">
            <p>商铺名称：<i>{{baseInfo.shop_name}}</i></p>
          </div>
          <div class="f-item">
            <p>主推商品：<i>{{baseInfo.goods_name}}</i></p>
          </div>
          <div class="f-item">
            <p>商铺地址：<i>{{baseInfo.shop_address}}</i></p>
          </div>
          <div class="f-item">
            <p>店长姓名：<i>{{baseInfo.shop_manager}}</i></p>
          </div>
          <div class="f-item">
            <p>店长电话：<i>{{baseInfo.shop_phone}}</i></p>
          </div>
          <div class="f-item">
            <p>店长身份证：<i>{{baseInfo.shop_IDCard}}</i></p>
          </div>
          <div class="f-item">
            <p>商铺状态：<el-tag type="primary" size="medium ">{{baseInfo.shop_status|shop_status}}</el-tag>
            </p>
          </div>
          <div class="f-item1">
            <p>最后一次修改人账号：<i>{{baseInfo.modify_name|filterNull}}</i></p>
          </div>
          <div class="f-item1">
            <p>最后一次修改时间：<i>{{baseInfo.modify_time}}</i></p>
          </div>
        </div>
        <el-table :data="accountList" border style="width: 100%">
          <el-table-column prop="user_name" label="账号" width="180"></el-table-column>
          <el-table-column prop="user_password" label="密码" width="180"></el-table-column>
          <el-table-column prop="mark" label="备注"></el-table-column>
        </el-table>
      </div>
      <div class="title">商品信息列表</div>
      <div class="cont">
        <el-row style="margin-bottom:20px">
          <el-tag type="primary">上架商品总量：0</el-tag>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="商品编号" width="180"></el-table-column>
          <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
          <el-table-column prop="name" label="库存" width="180"></el-table-column>
          <el-table-column prop="name" label="价格" width="180"></el-table-column>
          <el-table-column prop="name" label="已售出数量" width="180"></el-table-column>
          <el-table-column prop="name" label="参与的活动" width="180"></el-table-column>
        </el-table>
        <!-- <HPage :total="total" :currentPage.sync="currentPage" :pageSize.sync="pageSize" @getData="getData"></HPage> -->
      </div>
      <div class="title">出单记录</div>
      <div class="cont">
        <el-row style="margin-bottom:20px">
          <el-tag type="primary">总线上出单量：0</el-tag>
          <el-tag type="primary">线上支付量：0</el-tag>
          <el-tag type="primary">线下支付量：0</el-tag>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="单号" width="180"></el-table-column>
          <el-table-column prop="name" label="销售商品" width="180"></el-table-column>
          <el-table-column prop="address" label="金额"></el-table-column>
        </el-table>
      </div>
      <div class="title">提现记录</div>
      <div class="cont">
        <el-row style="margin-bottom:20px">
          <el-tag type="primary">余额：0</el-tag>
          <el-tag type="primary">可提现：0</el-tag>
          <el-tag type="primary">已提现：0</el-tag>
          <el-popover placement="top-start" title="手续费  0.1%" width="250" trigger="hover">
            <p solt="content">提现费用 = 提现金额 * 手续费</p>
            <p solt="content">提现费用 <=1000 元，手续费=1 元</p> <p solt="content">手续费至多 20 元</p>
            <el-tag type="primary" slot="reference">提现费用：0</el-tag>
          </el-popover>
        </el-row>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="提现单号" width="180"></el-table-column>
          <el-table-column prop="name" label="提现金额" width="180"></el-table-column>
          <el-table-column prop="address" label="提现时间"></el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      baseInfo: {},
      accountList:[],
      shopInfo: [],
      tableData: []
    };
  },
  components: {
    HPage: () => import('@components/HPage')
  },
  methods: {
    showDetail(row) {
      this.dialogVisible = true;
      this.getData(row.shop_id);
    },
    getData(shop_id) {
      this.getShop(shop_id);
      this.getSubAccount(shop_id);
    },
    getShop(shop_id) {
      this.$api
        .getShop({
          shop_id
        })
        .then(res => {
          this.baseInfo = res.data;
        });
    },
    getSubAccount(shop_id) {
      this.$api
        .getSubAccount({
          shop_id
        })
        .then(res => {
          this.accountList = res.data;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  border: 1px solid #dcdfe6;
  .title,
  .cont {
    margin: 8px;
    padding: 15px;
  }
  .title {
    border-bottom: 1px solid #dcdfe6;
  }
  .cont {
    line-height: 1;
    p {
      // padding-left: 30px;
      padding-bottom: 10px;
      margin-right: 20px;
      > i {
        font-style: normal;
        color: #888;
      }
    }
    .f-item,
    .f-item1 {
      float: left;
      overflow: hidden;
    }
  }
}
</style>
