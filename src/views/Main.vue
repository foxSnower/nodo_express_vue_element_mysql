<template>
  <div>
    <el-container>
      <el-header>
        <div class="header">
          <img class="logo" src="@assets/logo3.png">
          <Weather class=weather></Weather>
          <ThemePicker class="theme-pick"></ThemePicker>
        </div>
      </el-header>
      <router-view />
    </el-container>
  </div>
</template>

<script>
import ThemePicker from '@components/theme-picker';
import Weather from '@components/Weather';
export default {
  name: 'Main',
  components: {
    ThemePicker,
    Weather
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #81b0f1;
  color: #333;
  text-align: left;
  line-height: 60px;
  .header {
    position: relative;
    width: 100%;
    margin: 0 auto;
    .weather {
      float: left;
      padding-left: 20px;
    }
    .logo {
      height: 40px;
      padding: 10px 0;
      float: left;
    }
    .theme-pick {
      position: absolute;
      right: 0;
      top: 15px;
    }
  }
}
</style>
