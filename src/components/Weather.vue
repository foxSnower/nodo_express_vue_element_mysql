<template>
  <!-- <el-popover placement="bottom-end" width="300" class="popover"> -->
  <div class="popover" v-if="nowWeather">
    <div class="btn" @mouseover="showWeather=true" @mouseleave="showWeather=false">
      <p>东莞</p>
      <img :src="require('@assets/3d_180/'+nowWeather.code+'.png')">
      <p>{{nowWeather.temperature}}°</p>
    </div>
    <transition name="el-zoom-in-center">
      <div v-if="showWeather" class="weather">
        <div class="title">东莞<span>{{publishTime}}发布</span></div>
        <div class="now">
          <div>
            <img :src="require('@assets/3d_180/'+nowWeather.code+'.png')">
          </div>
          <div>
            <p class="temperature">{{nowWeather.temperature}}°</p>
            <p>{{nowWeather.text}}</p>
          </div>
          <div style="text-align:left;line-height: 1.5;">
            <p>{{nowWeather.text_day}}</p>
            <p>{{nowWeather.wind_direction}}</p>
            <p>风速：{{nowWeather.wind_speed}}m/s</p>
          </div>
        </div>
        <div class="f-flex">
          <div class="f-item3" v-for="(item,index) in dailyWeather.daily" :key="index">
            <p>{{item.date|filterDate(index)}}</p>
            <img :src="require('@assets/3d_180/'+item.code_day+'.png')">
            <p>{{item.text_day}}</p>
            <p v-html="`${item.low}°~${item.high}°`"></p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Weather',
  data() {
    return {
      cityInfo: '',
      weather: null,
      dailyWeather: {},
      showWeather: false
    };
  },
  filters: {
    filterDate(val, index) {
      if (index === 0) {
        return '今天';
      }
      if (index === 1) {
        return '明天';
      }
      if (index === 2) {
        return '后天';
      }
    }
  },
  mounted() {
    this.searchCity(cityInfo => {
      this.getWeather(cityInfo);
    });
  },
  methods: {
    searchCity(fn) {
      this.$api.searchCity({}).then(res => {
        this.cityInfo = res.data;
        fn(res.data);
      });
    },
    getWeather(cityInfo) {
      this.$api
        .getDailyWeather({
          location: cityInfo.id
        })
        .then(res => {
          this.dailyWeather = res.data;
        });
      this.$api
        .getWeather({
          location: cityInfo.id
        })
        .then(res => {
          this.weather = res.data;
        });
    }
  },
  computed: {
    nowWeather() {
      let weather = this.weather;
      let dailyWeather = this.dailyWeather;
      if (weather && dailyWeather.daily) {
        return Object.assign(dailyWeather.daily[0], weather.now);
      } else {
        return null;
      }
    },
    publishTime() {
      let weather = this.weather;
      let publishTime = '00:00';
      if (weather) {
        publishTime = weather.last_update.substr(11, 5);
      }
      return publishTime
    }
  }
};
</script>

<style lang="scss" scoped>
.popover {
  position: relative;
  color: #fff;
  .btn {
    overflow: hidden;
    font-size: 14px;
    p,
    img {
      float: left;
      padding-right: 15px;
    }
    img {
      height: 60px;
    }
  }
  .weather {
    position: absolute;
    left: 0;
    top: 50px;
    width: 350px;
    background: linear-gradient(#6f7c85, #919b9f);
    font-size: 14px;
    line-height: 2;
    z-index: 9;
    .title {
      padding: 10px 0 10px 20px;
      span {
        font-size: 12px;
        color: hsla(0, 0%, 100%, 0.6);
        padding-left: 10px;
      }
    }
    .now {
      overflow: hidden;
      padding: 0 20px;
      box-shadow: 0 1px rgba(255, 255, 255, 0.2);
      div {
        float: left;
        padding-right: 20px;
        text-align: center;
        .temperature {
          font-size: 48px;
          line-height: 1;
        }
        img {
          width: 80px;
        }
      }
    }
    .f-flex {
      padding: 10px 0;
    }
    .f-item3 {
      text-align: center;
      img {
        width: 40px;
        font-size: 0;
      }
      + .f-item3 {
        position: relative;
        &:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 1px;
          height: 100%;
          box-shadow: 1px 0 hsla(0, 0%, 100%, 0.2);
        }
      }
    }
  }
}
</style>
