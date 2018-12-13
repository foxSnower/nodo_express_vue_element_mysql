<template>
  <el-popover placement="bottom" width="400">
     <div>
       <div>东莞 15:45发布</div>
       <div class="f-flex">
         <p class="f-item"></p>
         <p class="f-item"></p>
         <p class="f-item"></p>
       </div>
        <div class="f-flex">
          <div class="f-item" v-for="(item,index) in weather.daily" :key="index">
             <p>{{item.date}}</p>
             <img :src="require('@assets/3d_180/'+item.code_day+'.png')" >
          </div>
         <!-- <div class="f-item">
           <p>今天</p>
           <p>今天</p>
           <p>今天</p>
           <p>今天</p>
         </div>
         <div class="f-item">2</div>
         <div class="f-item">3</div> -->
       </div>
     </div>

    <el-button type="text" slot="reference">hover 激活</el-button>
  </el-popover>

</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {
      weather: {}
    };
  },
  mounted() {
    this.$api
      .getWeather({
        location: 'dongguan'
      })
      .then(res => {
        this.weather = res.data;
      });
  }
};
</script>

<style lang="scss" scoped>
.f-item{
  text-align: center;
  img{
    width: 50px;
  }
}
</style>
