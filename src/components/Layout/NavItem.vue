<template>
    <div>
        <label v-for="(item,index) in navList" :key="index">
            <el-submenu v-if="item.children && item.children.length > 0" :index="String(index)" :key="item.id">
                <template slot="title">
                    <i class="fa" :class="item.icon"></i>
                    <span slot="title">{{ item.title }}</span>
                </template>
                <!-- 递归组件 -->
                <NavItem :navList="item.children"></NavItem>
            </el-submenu>
            <el-menu-item v-else :index="'/'+item.url" :key="item.id">
                <i class="fa" :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
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
