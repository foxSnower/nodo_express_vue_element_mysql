<template>
  <div>
    <!-- <label v-for="(item) in navList" :key="item.id"> -->
      <!-- <el-submenu v-if="item.children && item.children.length > 0" :index="String(item.id)">
        <template slot="title">
          <i class="fa" :class="item.icon"></i>
          <span class="menu" slot="title">{{ item.title }}</span>
        </template>
        <NavItem :navList="item.children"></NavItem>
      </el-submenu>
      <el-menu-item v-else :index="item.url">
        <i class="fa" :class="item.icon"></i>
        <span class="menu" slot="title">{{ item.title }}</span>
      </el-menu-item> -->
      <el-menu-item-group  v-for="(item) in navList" :key="item.id">
        <template slot="title">{{item.title}}</template>
        <el-menu-item v-if="item.children && item.children.length > 0" index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    <!-- </label> -->
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

