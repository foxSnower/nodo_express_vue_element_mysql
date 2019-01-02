<template>
  <div>
    <label v-for="(item) in navList" :key="item.id">
      <el-submenu v-if="item.children && item.children.length > 0" :index="String(item.id)">
        <template slot="title">
          <i class="fa" :class="item.icon"></i>
          <span class="menu" slot="title">{{ item.title }}</span>
        </template>
        <NavItem :navList="item.children"></NavItem>
      </el-submenu>
      <el-menu-item v-else :index="item.url">
        <i class="fa" :class="item.icon"></i>
        <span class="menu" slot="title">{{ item.title }}</span>
      </el-menu-item>
    </label>
  </div>

</template>

<script>
export default {
  name: 'NavItem',
  props: ['navList'],
  mounted() {}
};
</script>

<style lang="scss" scoped>
.menu {
  padding-left: 8px;
}
/deep/ {
  .el-submenu__title,
  .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
}
</style>

