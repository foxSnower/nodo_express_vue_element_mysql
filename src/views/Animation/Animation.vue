<template>
  <el-container>
    <!-- http://www.runoob.com/css3tool https://www.css88.com/tool/css3Preview/ -->
    <!-- v-for="(item,index) in effectAllList" :key="index" -->
    <el-header>CSS3 Animation</el-header>
    <el-main>
      <div class="f-item">
        <div class="animation-box">
          <!-- <img src="@assets/login_bg.jpg" alt="动画原件"> -->
        </div>
      </div>
      <div class="main">
        <div v-for="(item,index) in filterEffectAllList" :key="index">
          <div class="title">{{item.effect_name}}</div>
          <el-row>
            <el-button type="primary" circle v-for="(x,idX) in effectAllList" :key="idX" v-if="item.effect_id==x.effect_id">{{x.effect_type_name}}</el-button>
          </el-row>
        </div>

      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //动画列表
      effectAllList: [],
      // 动画Json数据
      animateJson: {}
    };
  },
  mounted() {
    this.getData();
    this.getAnimateJson();
  },
  methods: {
    getData() {
      this.getAnimateAll();
    },
    //获取动画列表
    getAnimateAll() {
      this.$api.getAnimateAll({}).then(res => {
        this.effectAllList = res.data.data;
      });
    },
    //获取动画Json数据
    getAnimateJson() {
      this.$api.getAnimateJson({}).then(res => {
        this.animateJson = res;
      });
    }
  },
  computed: {
    filterEffectAllList() {
      let effectAllList = this.effectAllList;
      let newArray = [];
      let curId = [];
      effectAllList.forEach(x => {
        if (!newArray.length) {
          newArray.push({
            effect_id: x.effect_id,
            effect_name: x.effect_name
          });
          curId.push(x.effect_id);
        } else {
          let NotFound = curId.every(y => {
            return y !== x.effect_id;
          });
          if (NotFound) {
            newArray.push({
              effect_id: x.effect_id,
              effect_name: x.effect_name
            });
            curId.push(x.effect_id);
          }
        }
      });
      return newArray;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  width: 100%;
  display: flex;
  padding: 0;
  height: calc(100vh - 60px);
}
.f-item {
  flex: 1;
  position: relative;
}
.main {
  width: 500px;
  background: #f2f2f2;
}
.animation-box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    margin-left: -150px;
    margin-top: -150px;
  }
}
.title {
  padding: 10px;
  margin-bottom: 5px;
  border-bottom: 1px solid #eee;
}
/deep/ .el-button--small.is-circle{
  padding: 5px;
  margin-bottom: 5px;
}
</style>
