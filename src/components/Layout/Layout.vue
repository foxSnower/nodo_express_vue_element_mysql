<template>
  <el-container>
    <HAside></HAside>
    <el-main>
      <!-- <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb> -->
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      backTop: false,
      asideWidth: '200px',
      isCollapse: false
    };
  },
  mounted() {
    let scrollObj = document.querySelector('.el-main');
    let scrollTop = 0;
    scrollObj.addEventListener('scroll', () => {
      scrollTop = scrollObj.scrollTop;
      if (scrollTop >= 800) {
        this.backTop = true;
      } else {
        this.backTop = false;
      }
    });
    const that = this;
    //获得窗口尺寸
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        that.fullWidth = window.fullWidth;
      })();
    };
    // console.log(this.navList);
  },
  components: {
    HAside: () => import('@components/Layout/HAside')
  },
  methods: {
    removeCurTag() {
      this.$refs.tags.handleCommand('closeCur');
    },
    // 返回顶部
    toBackTop() {
      let scrollObj = document.querySelector('.el-main');
      scrollObj.scrollTop = 0;
      console.log(1);
    }
  },
  computed: {
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 500px;
  height: calc(100vh - 60px);
}
</style>


