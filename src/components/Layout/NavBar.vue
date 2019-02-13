<template>
  <div>
    <el-menu-item-group v-for="(item) in navList" :key="item.id">
      <template slot="title">{{item.title}}</template>
      <NavItem :navList="item.children"></NavItem>
    </el-menu-item-group>
  </div>

</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      navList: [
        {
          id: '1',
          icon: 'fa-database',
          title: '商品信息',
          children: [
            {
              id: '01',
              icon: 'fa-list-ul',
              spread: true,
              title: '商品信息管理',
              url: '/Users/UsersManagement'
            },
            {
              id: '01',
              icon: 'fa-list-ul',
              spread: true,
              title: '促销活动管理',
              url: '/Users/UsersManagement'
            }
          ]
        },
        {
          id: '1',
          icon: 'fa-database',
          title: '辅助账户管理',
          children: [
            {
              id: '01',
              icon: 'fa-list-ul',
              spread: true,
              title: '辅助账户管理',
              url: '/Users/UsersManagement'
            }
          ]
        },
        {
          id: '1',
          icon: 'fa-database',
          title: '用户管理',
          children: [
            {
              id: '01',
              icon: 'fa-list-ul',
              spread: true,
              title: '用户列表',
              url: '/Users/UsersList'
            }
          ]
        },
        {
          id: '2',
          icon: 'fa-database',
          title: '设置',
          children: [
            {
              id: '01',
              icon: 'fa-list-ul',
              spread: true,
              title: '修改密码',
              url: '/Setting/ModifyPassword'
            }
          ]
        }
      ]
    };
  },
  components: {
    NavItem: () => import('./NavItem')
  },
  mounted() {}
};
</script>


