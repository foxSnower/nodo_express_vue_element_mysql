<template>
  <el-container>
    <el-header>CSS3 Animation
      <ThemePicker></ThemePicker>
    </el-header>
    <el-main>
      <div class="f-item">
        <div class="animation-box">
          <div class="animation" :class="curAnimationName">
            <img src="@assets/logo (2).png" alt="动画原件">
            <!-- <video src="@assets/video.mp4" controls="controls">
              your browser does not support the video tag
            </video> -->
          </div>
        </div>
      </div>
      <div class="right-main">
        <el-row class="f-flex">
          <el-button class="f-item" type="primary" circle>变形&过渡</el-button>
          <el-button class="f-item" type="primary" circle>动画库</el-button>
        </el-row>
        <el-popover class="popover" placement="bottom" width="400" trigger="click">
          <el-button type="text" icon="iconfont icon-copy-" class="copy-btn" @click.stop="copyText" title="点击复制"></el-button>
          <el-input id="copyText" type="textarea" rows="30" v-model="animationCode"></el-input>
          <el-button class="foot-btn" type="primary" @click="executeCode">执行代码</el-button>
          <el-button slot="reference" type="primary" circle @click.stop="showCode()">查看代码</el-button>
        </el-popover>
        <div v-for="(item,index) in filterEffectAllList" :key="index">
          <div class="title">{{item.effect_name}}</div>
          <el-row>
            <el-button type="text" v-for="(x,idX) in effectAllList" :key="idX" v-if="item.effect_id==x.effect_id" @click.stop="changeAnimate(x)">{{x.effect_type_name}}</el-button>
          </el-row>
        </div>
        <div>
          <p>以上实例来源于：<span class="f-warn">http://www.shouce.ren/example/show/s/6869</span></p>
          <p>相关链接1：<span class="f-warn"> http://www.runoob.com/css3tool</span></p>
          <p>相关链接2：<span class="f-warn">https://www.css88.com/tool/css3Preview/</span></p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Clipboard from "clipboard";
import cssbeautify from "cssbeautify";

import ThemePicker from "@components/theme-picker";
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
  components:{
    ThemePicker,
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
      this.curAnimationName = "";
      if (row.effect_type_code) {
        setTimeout(() => {
          this.curAnimationName = row.effect_type_code;
          this.setAnimationCode(row.effect_type_code);
        }, 10);
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
          .${this.curAnimationName}{
            -webkit-animation:${code} 1s .2s ease both;
            -moz-animation:${code} 1s .2s ease both;
          }
          ${_webkit}
          ${_moz}
        `;
      animationCode = cssbeautify(animationCode, { indent: "  " });
      this.animationCode = animationCode;
    },
    //复制代码
    copyText() {
      let _copy = document.getElementById("copyText");
      _copy.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.showTextarea = true;
      this.$message.success("已复制好，可贴粘。");
    },
    //执行代码
    executeCode() {
      let _code = this.animationCode;
      let _style = document.createElement("style");
      let node = document.createTextNode(_code);
      let _body = document.getElementsByTagName("body")[0];
      let child = document.getElementsByTagName("style");
      //删除已有的 HTML 元素
      let length = child.length;
      for (let i = 0; i < length; i++) {
        if (child[i].getAttribute("flag") == "animation") {
          _body.removeChild(child[i]);
        }
      }
      //创建新的 HTML 元素
      _style.setAttribute("flag", "animation");
      _style.appendChild(node);
      _body.appendChild(_style);
      let _name = _code.substring(1, _code.indexOf(" {"));
      this.curAnimationName = "";
      setTimeout(() => {
        this.curAnimationName = _name;
      }, 10);
    },
    //查看代码
    showCode() {
      this.dialogVisible = true;
    }
  },
  computed: {
    //整理动画的数据
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
  background-color: #81b0f1;
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
.right-main {
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
    img,
    video {
      width: 100%;
      height: 100%;
    }
  }
}
.title {
  padding: 5px 0;
  margin-bottom: 5px;
}

/deep/ .el-button--small.is-circle,.el-button--small.el-button--text {
  padding: 5px;
  margin-bottom: 5px;
  margin-left: 0;
  margin-right: 10px;
}
.foot-btn {
  float: right;
  margin: 20px 0 10px;
}
.popover {
  display: block;
  text-align: center;
}
</style>
