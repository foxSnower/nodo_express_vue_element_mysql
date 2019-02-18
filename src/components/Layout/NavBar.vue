<template>
  <div>
    <el-menu-item-group v-for="item in navList" :key="item.menu_id">
      <template slot="title">{{item.menu_title}}</template>
      <NavItem :navList="item.children"></NavItem>
    </el-menu-item-group>
  </div>

</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      navList: []
    };
  },
  components: {
    NavItem: () => import('./NavItem')
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.getMenu().then(res=>{
        this.navList = res.data;
      })
    }
  }
};
</script>


