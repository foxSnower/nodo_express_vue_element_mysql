<template>
  <el-header :style="'background:'+ themeColor">
    <div class="header">
      <!-- <img class="logo" src="@assets/logo3.png"> -->
      <Weather class="weather"></Weather>
      <ThemePicker class="theme-pick" :themeColor.sync="themeColor"></ThemePicker>
    </div>
  </el-header>
</template>                                                                                                                                                                                                                                                                     
<script>
import ThemePicker from '@components/theme-picker';
import Weather from '@components/Weather';
export default {
  name: 'HHeader',
  data(){
    return {
      themeColor:'#81b0f1'
    }
  },
  mounted(){
    this.$U.setLocalStorage('theme',this.$U.getLocalStorage('theme'));
    this.$store.commit('theme',this.$U.getLocalStorage('theme'));
  },
  watch:{
    themeColor:function(val){
      this.$U.setLocalStorage('theme',val);
      this.$store.commit('theme',val);
    }
  },
  components: {
    ThemePicker,
    Weather
  }
};
</script>


<style lang="scss" scoped>
.el-header {
  // background: linear-gradient(#81b0f1, #054774);
  color: #333;
  text-align: left;
  line-height: 60px;
  .header {
    position: relative;
    width: 100%;
    margin: 0 auto;
    .weather {
      position: relative;
      float: left;
      padding-left: 20px;
      &:before {
        content: '';
        position: absolute;
        left: 10px;
        top: 50%;
        width: 1px;
        height: 20px;
        background: rgba(255, 255, 255, 0.6);
        margin-top: -10px;
      }
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