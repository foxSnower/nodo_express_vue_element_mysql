<template>
  <div>
    <el-container>
      <el-header>
        <ThemePicker></ThemePicker>
      </el-header>
      <!-- <el-button type="text" icon="iconfont icon-sjiantou04-copy-copy" class="copy-btn"  title="点击"></el-button> -->
      <router-view />
    </el-container>
  </div>
</template>

<script>
import ThemePicker from '@components/theme-picker';
export default {
  name: 'Main',
  components: {
    ThemePicker
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #81b0f1;
  color: #333;
  text-align: right;
  line-height: 60px;
  .hang-tag{
        position: absolute;
    top: 60px;
    right: 0;
    z-index: 9;
  }
}
</style>
