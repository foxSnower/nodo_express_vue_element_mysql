<template>
   <div>
        <label v-for="(item,index) in navList" :key="index">
            <el-submenu v-if="item.children && item.children.length > 0" :index="String(index)" :key="item.menu_id">
                <template slot="title">
                    <!-- <i class="fa" :class="item.icon"></i> -->
                    <span slot="title">{{ item.menu_title }}</span>
                </template>
                <!-- 递归组件 -->
                <NavItem :navList="item.children"></NavItem>
            </el-submenu>
            <el-menu-item v-else :index="item.menu_url" :key="item.menu_id">
                <!-- <i class="fa" :class="item.icon"></i> -->
                <span slot="title">{{ item.menu_title }}</span>
            </el-menu-item>
        </label>
    </div>
</template>

<script>
export default {
  name: 'NavItem',
  props:['navList'],
  mounted() {}
};
</script>

<style lang="scss" scoped>

</style>

