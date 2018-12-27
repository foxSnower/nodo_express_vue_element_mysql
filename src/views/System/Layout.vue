<template>
  <!-- <el-main> -->
    <HAside></HAside>
  <!-- </el-main> -->
</template>

<script>
export default {
  data() {
    return {
      backTop: false,
      asideWidth: '200px',
      isCollapse: false,
      menuList: [
        {
          title: '111',
          childern: [
            {
              title: '231',
              url: '/12'
            }
          ]
        }
      ]
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

