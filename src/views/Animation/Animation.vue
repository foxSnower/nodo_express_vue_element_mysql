<template>
  <el-container>
    <el-header>CSS3 Animation</el-header>
    <el-main>
      <div class="f-item">
        <div class="animation-box">
          <div class="animation" :class="curAnimationName">
            <img src="@assets/logo.png" alt="动画原件">
          </div>
        </div>
      </div>
      <div class="main">

        <el-row style="text-align:center">
          <el-button type="primary" circle @click.stop="showCode()">查看代码</el-button>
        </el-row>
        <div v-for="(item,index) in filterEffectAllList" :key="index">
          <div class="title">{{item.effect_name}}</div>
          <el-row>
            <el-button type="primary" circle v-for="(x,idX) in effectAllList" :key="idX" v-if="item.effect_id==x.effect_id" @click.stop="changeAnimate(x)">{{x.effect_type_name}}</el-button>
          </el-row>
        </div>
        <div>
          <p>以上实例来源于：<span class="f-warn">http://www.shouce.ren/example/show/s/6869</span></p>
          <p>相关链接1：<span class="f-warn"> http://www.runoob.com/css3tool</span></p>
          <p>相关链接2：<span class="f-warn">https://www.css88.com/tool/css3Preview/</span></p>
        </div>
      </div>
    </el-main>
    <el-dialog :visible.sync="dialogVisible" width="600px">
      <el-button type="text" icon="iconfont icon-copy-" class="copy-btn" @click.stop="copy" data-clipboard-target="#target" title="点击复制"></el-button>
      <pre>{{animationCode}}</pre>
      <!-- <el-input id="target" type="textarea" rows="30" v-model="animationCode"> 
      </el-input>-->

    </el-dialog>
  </el-container>
</template>

<script>
import Clipboard from "clipboard";
import cssbeautify from "cssbeautify";
require("./animation.css");
export default {
  data() {
    return {
      //动画列表
      effectAllList: [],
      // 动画Json数据
      animateJson: {},
      //当前动画
      curAnimationName: "",
      dialogVisible: false,
      animationCode: ""
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
    },
    //点击动效
    changeAnimate(row) {
      if (row.effect_type_code) {
        this.curAnimationName = row.effect_type_code;
        this.setAnimationCode(row.effect_type_code);
        setTimeout(() => {
          this.curAnimationName = "";
        }, 1000);
      }
    },
    //编写代码
    setAnimationCode(code) {
      let detail = "";
      let animationCode = "";
      let animateJson = this.animateJson;

      for (let i in animateJson) {
        if (i === code) {
          detail = animateJson[i];
        }
      }
      let _webkit = detail.keyframes;
      let _moz = _webkit.replace(/-webkit-/g, "-moz-");
      animationCode = `
          #animation{
            -webkit-animation:${code} 1s .2s ease both;
            -moz-animation:${code} 1s .2s ease both;
          }
          ${_webkit}
          ${_moz}
        `;
      animationCode = cssbeautify(animationCode, { indent: "  " });
      this.animationCode = animationCode;
    },
    showCode() {
      this.dialogVisible = true;
    },
    copy() {
      var clipboard = new Clipboard(".copy-btn");
      clipboard.on("success", e => {
        debugger;
        this.$message.success("复制成功"); //这里你如果引入了elementui的提示就可以用，没有就注释即可
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        debugger;
        // 不支持复制
        console.log("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
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
  width: 400px;
  background: #f2f2f2;
  padding: 10px;
  z-index: 1;
}
.animation-box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .animation {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    margin-left: -150px;
    margin-top: -150px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.title {
  padding: 5px 0;
  margin-bottom: 5px;
}

/deep/ .el-button--small.is-circle {
  padding: 5px;
  margin-bottom: 5px;
  margin-left: 0;
  margin-right: 10px;
}
.copy-btn {
  position: absolute;
  top: 10px;
  left: 20px;
}
</style>
