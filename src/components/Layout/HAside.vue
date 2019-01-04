<template>
  <el-aside :width="isCollapse?'50px':'200px'">
    <el-button class="menu-btn" :class="{rotate:isCollapse}" size="medium" type="primary" icon="fa fa-bars" circle @click="isCollapse=!isCollapse"></el-button>
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
      asideWidth: '200px',
      isCollapse: false,
      navList: [
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
        }
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
.el-aside {
  position: relative;
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
  transition: all 0.2s;
  .el-menu {
    // height: calc(100vh - 60px);
    border-right: none;
  }
  .menu-btn {
    position: absolute;
    top: 50%;
    margin-top: -18px;
    right: -17px;
    z-index: 9;
    /deep/ .fa-bars {
      left: -8px;
      position: relative;
      transition: all 0.3s;
    }
    &.rotate {
      transform: rotate(-90deg);
      /deep/ .fa-bars {
        top: -8px;
        left: 0;
        position: relative;
        transition: all 0.3s;
      }
    }
  }
}
</style>


