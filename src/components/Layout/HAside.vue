<template>
  <el-aside :width="asideWidth">
    <el-menu router default-active="onRoutes" background-color="#545c64" text-color="#bbc0c6" active-text-color="activeColor" :collapse="isCollapse">
      <NavItem :navList="navList"></NavItem>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      asideWidth: '250px',
      isCollapse:false,
      navList:[{
        title:'12',
        children:[{
          title:'12'
        }]
      }]
    };
  },
  components: {
    NavItem: () => import('./NavItem')
  }
};
</script>

