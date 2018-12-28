<template>
  <el-aside :width="asideWidth">
    <el-menu router default-active="onRoutes" active-text-color="theme" :collapse="isCollapse">
      <NavItem :navList="navList"></NavItem>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  data() {
    return {
      asideWidth: '250px',
      isCollapse: false,
      navList: [
        {
          id: 'SIMS_M07',
          icon: 'fa-database',
          spread: true,
          title: ' 鸿保贷',
          url: '',
          children: [
            {
              id: 'SIMS_M0701',
              icon: 'fa-list-ul',
              spread: true,
              title: '鸿保接洽',
              url: 'HtCreditManagement/HtCreditList',
              children: [{ id: 'SIMS_M0702', icon: 'fa-list-ul', spread: true, title: '授信结果', url: 'Welcome' }]
            }
          ]
        },
        {
          id: 'SIMS_M01',
          icon: 'fa-credit-card',
          spread: true,
          title: '授信',
          url: '',
          children: [
            { id: 'SIMS_M0101', icon: 'fa-pencil-square-o', spread: true, title: '授信申请', url: 'SetGoods', children: [] },
            { id: 'SIMS_M0102', icon: 'fa-list-ul', spread: true, title: '授信管理', url: 'CreditManagement/CreditList', children: [] },
            { id: 'SIMS_M0103', icon: 'fa-hourglass', spread: true, title: '授信结果', url: 'CreditManagement/CreditResult', children: [] }
          ]
        },
        {
          id: 'SIMS_M02',
          icon: 'fa-envelope-o',
          spread: true,
          title: '用信',
          url: '',
          children: [{ id: 'SIMS_M0202', icon: 'fa-list-ul', spread: true, title: '用信管理', url: 'LetterManagement/LetterList', children: [] }]
        },
        {
          id: 'SIMS_M03',
          icon: 'fa-address-book-o',
          spread: true,
          title: '客户',
          url: '',
          children: [{ id: 'SIMS_M0301', icon: 'fa-list-ul', spread: true, title: '客户管理', url: 'CustomeManagement/CustomeList', children: [] }]
        },
        {
          id: 'SIMS_M04',
          icon: 'fa-building',
          spread: true,
          title: '分公司',
          url: '',
          children: [{ id: 'SIMS_M0401', icon: 'fa-list-ul', spread: true, title: '分公司信息管理', url: 'CompanyManagement/CompanyAccountList', children: [] }]
        },
        {
          id: 'SIMS_M05',
          icon: 'fa-cogs',
          spread: true,
          title: '抵押权人和债权人',
          url: '',
          children: [{ id: 'SIMS_M0501', icon: 'fa-list-ul', spread: true, title: '抵押权人和债权人配置', url: 'CreditorPledgeeManagement/CreditorPledgeeList', children: [] }]
        },
        {
          id: 'SIMS_M06',
          icon: 'fa-recycle ',
          spread: true,
          title: '业务转产管理',
          url: '',
          children: [{ id: 'SIMS_M0601', icon: 'fa-list-ul', spread: true, title: '业务转产管理', url: 'PrototypeManage/PrototypeManage', children: [] }]
        },
        { id: 'SIMS_M08', icon: 'fa-table', spread: true, title: '银行代扣限额表维护', url: 'DKBankManagement/DKBankManagement', children: [] }
      ]
    };
  },
  components: {
    NavItem: () => import('./NavItem')
  },
  computed: {
    theme() {
      return this.$store.state.app.theme;
    },
    // 首次进入页面时展开当前页面所属的菜单
    onRoutes() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: calc(100vh - 60px);
}
</style>


