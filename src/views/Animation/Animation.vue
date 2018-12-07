<template>
  <el-container>
    <el-header>
      <ThemePicker></ThemePicker>
    </el-header>
    <el-main>
      <div class="f-item">
        <div class="animation-box">
          <div class="animation" :class="curAnimationName" :style="curTransitionCode">
            <!-- <img src="@assets/logo (2).png" alt="动画原件"> -->
            <video src="@assets/video.mp4" controls="controls">
              your browser does not support the video tag
            </video>
            <span class="drag" v-drag="drag"></span>
            <el-button class="f-item" type="primary" circle @click.stop="drag.left=150">dianji </el-button>
          </div>
        </div>
      </div>
      <div class="right-main">
        <el-row class="f-flex">
          <el-button class="f-item" type="primary" circle @click.stop="tabName='1'" :disabled="tabName=='1'">动画库</el-button>
          <el-button class="f-item" type="primary" circle @click.stop="tabName='2'" :disabled="tabName=='2'">变形&过渡</el-button>
        </el-row>
        <transition-group name="el-zoom-in-center">
          <div v-if="tabName=='1'" key="1">
            <el-popover class="popover" placement="bottom" width="400" trigger="click">
              <el-button type="text" icon="iconfont icon-copy-" class="copy-btn" @click.stop="copyText" title="点击复制"></el-button>
              <el-input id="copyText" type="textarea" rows="30" v-model="animationCode"></el-input>
              <el-button class="foot-btn" type="primary" @click="executeCode(animationCode)">执行代码</el-button>
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
          <div v-if="tabName=='2'" key="2">
            <div class="config" style="text-align:center">
              <el-button type="primary" circle @click="executeCode(transitionCode)">动画预览</el-button>
              <el-button type="warning" circle @click="reset">重 置</el-button>
            </div>
            <div class="config">
              <label>显示方式</label>
              <el-radio v-model="params.type" label="2D">2D</el-radio>
              <el-radio v-model="params.type" label="3D">3D</el-radio>
            </div>
            <template v-if="params.type=='2D'">
              <div class="config">
                <label>旋转</label>
                <el-input v-model.number="initCode.rotate">
                  <template slot="append">deg</template>
                </el-input>
                <el-slider :min="-360" :max="360" v-model="initCode.rotate" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>X轴缩放</label>
                <el-input v-model.number="initCode.scaleX/10">
                  <template slot="append">倍</template>
                </el-input>
                <el-slider :min="-5.0" :max="5.0" v-model="initCode.scaleX" :show-tooltip="false" :format-tooltip="(val)=>{return val/10}"></el-slider>
              </div>
              <div class="config">
                <label>Y轴缩放</label>
                <el-input v-model.number="initCode.scaleY/10">
                  <template slot="append">倍</template>
                </el-input>
                <el-slider :min="-5.0" :max="5.0" v-model="initCode.scaleY" :show-tooltip="false" :format-tooltip="(val)=>{return val/10}"></el-slider>
              </div>
              <div class="config">
                <label>X轴位移</label>
                <el-input v-model.number="initCode.translateX">
                  <template slot="append">px</template>
                </el-input>
                <el-slider :min="-500" :max="500" v-model="initCode.translateX" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>Y轴位移</label>
                <el-input v-model.number="initCode.translateY">
                  <template slot="append">px</template>
                </el-input>
                <el-slider :min="-500" :max="500" v-model="initCode.translateY" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>X轴倾斜</label>
                <el-input v-model.number="initCode.skewX">
                  <template slot="append">deg</template>
                </el-input>
                <el-slider :min="-180" :max="180" v-model="initCode.skewX" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>Y轴倾斜</label>
                <el-input v-model.number="initCode.skewY">
                  <template slot="append">deg</template>
                </el-input>
                <el-slider :min="-180" :max="180" v-model="initCode.skewY" :show-tooltip="false"></el-slider>
              </div>
              <el-table class="config" :data="matrix" style="width: 100%">
                <el-table-column label="矩阵变形-matrix(a,c,e,b,d,f)c,e值用正弦或余弦值表示">
                  <el-table-column label="参数a" min-width="60">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.a"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="参数b" min-width="60">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.b"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="参数c" min-width="60">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.c"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="参数d" min-width="60">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.d"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="参数e" min-width="60">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.e"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="参数f" min-width="60">
                    <template slot-scope="scope">
                      <el-input v-model.number="scope.row.f"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <div class="config" style="margin-top:5px;">
                <label>变形原点</label>
                <el-input v-model.number="initCode.originX">
                  <template slot="append">%</template>
                </el-input>
                <el-input v-model.number="initCode.originY">
                  <template slot="append">%</template>
                </el-input>
              </div>
              <div class="config">
                <label>过渡属性</label>
                <el-input value="all" readonly="readonly"> </el-input>
              </div>
              <div class="config">
                <label>过渡时间</label>
                <el-input v-model.number="initCode.duration"> <template slot="append">s</template></el-input>
              </div>
              <div class="config">
                <label>延迟时间</label>
                <el-input v-model.number="initCode.delay"> <template slot="append">s</template></el-input>
              </div>
              <div class="config">
                <label>过渡效果</label>
                <el-row>
                  <el-button type="text" @click.stop="changeAnimate(x)">ease</el-button>
                  <el-button type="text" @click.stop="changeAnimate(x)">linear</el-button>
                  <el-button type="text" @click.stop="changeAnimate(x)">ease-in</el-button>
                  <el-button type="text" @click.stop="changeAnimate(x)">ease-out</el-button>
                  <el-button type="text" @click.stop="changeAnimate(x)">ease-in-out</el-button>
                  <!-- <el-button type="text" @click.stop="changeAnimate(x)">cubic-bezier(0.000, 0.635, 0.655, 0.270)</el-button> -->
                  <el-popover class="popover" placement="bottom" width="200" trigger="click">
                    <div class="mod_cubic_dialog">
                      <div class="hd">
                        <p>贝塞尔曲线工具</p>
                      </div>
                      <div class="inner">
                        <figure>
                          <canvas id="curve" width="200" height="450" style="cursor: pointer;">
                          </canvas>
                        </figure>
                        <select name="presets" id="presets" style="display:none;">
                          <option value="0.5, 0.25, 0.5, 0.75" selected="selected">custom
                          </option>
                        </select>
                      </div>
                    </div>
                    <el-button slot="reference" type="text" circle id="cubic">cubic-bezier(0.000, 0.020, 0.690, 0.065)</el-button>
                  </el-popover>
                </el-row>
              </div>
            </template>
            <template v-if="params.type=='3D'">
              <div class="config">
                <label>透视</label>
                <el-input v-model.number="initCode.perspective">
                  <template slot="append">px</template>
                </el-input>
                <el-slider :min="0" :max="1000" v-model="initCode.perspective" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>X轴旋转</label>
                <el-input v-model.number="initCode.rotateX">
                  <template slot="append">deg</template>
                </el-input>
                <el-slider :min="-360" :max="360" v-model="initCode.rotateX" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>Y轴旋转</label>
                <el-input v-model.number="initCode.rotateY">
                  <template slot="append">deg</template>
                </el-input>
                <el-slider :min="-360" :max="360" v-model="initCode.rotateY" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>Z轴旋转</label>
                <el-input v-model.number="initCode.rotateZ">
                  <template slot="append">deg</template>
                </el-input>
                <el-slider :min="-360" :max="360" v-model="initCode.rotateZ" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>X轴缩放</label>
                <el-input v-model.number="initCode.scaleX/10">
                  <template slot="append">倍</template>
                </el-input>
                <el-slider :min="-5.0" :max="5.0" v-model="initCode.scaleX" :show-tooltip="false" :format-tooltip="(val)=>{return val/10}"></el-slider>
              </div>
              <div class="config">
                <label>Y轴缩放</label>
                <el-input v-model.number="initCode.scaleY/10">
                  <template slot="append">倍</template>
                </el-input>
                <el-slider :min="-5.0" :max="5.0" v-model="initCode.scaleY" :show-tooltip="false" :format-tooltip="(val)=>{return val/10}"></el-slider>
              </div>
              <div class="config">
                <label>Z轴缩放</label>
                <el-input v-model.number="initCode.scaleZ/10">
                  <template slot="append">倍</template>
                </el-input>
                <el-slider :min="-5.0" :max="5.0" v-model="initCode.scaleZ" :show-tooltip="false" :format-tooltip="(val)=>{return val/10}"></el-slider>
              </div>
              <div class="config">
                <label>X轴位移</label>
                <el-input v-model.number="initCode.translateX">
                  <template slot="append">px</template>
                </el-input>
                <el-slider :min="-500" :max="500" v-model="initCode.translateX" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>Y轴位移</label>
                <el-input v-model.number="initCode.translateY">
                  <template slot="append">px</template>
                </el-input>
                <el-slider :min="-500" :max="500" v-model="initCode.translateY" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>Z轴位移</label>
                <el-input v-model.number="initCode.translateZ">
                  <template slot="append">px</template>
                </el-input>
                <el-slider :min="-500" :max="500" v-model="initCode.translateZ" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>X轴倾斜</label>
                <el-input v-model.number="initCode.skewX">
                  <template slot="append">deg</template>
                </el-input>
                <el-slider :min="-180" :max="180" v-model="initCode.skewX" :show-tooltip="false"></el-slider>
              </div>
              <div class="config">
                <label>Y轴倾斜</label>
                <el-input v-model.number="initCode.skewY">
                  <template slot="append">deg</template>
                </el-input>
                <el-slider :min="-180" :max="180" v-model="initCode.skewY" :show-tooltip="false"></el-slider>
              </div>
            </template>
            <div class="config">
              <pre>{{transitionCode}}</pre>
            </div>
          </div>
        </transition-group>
      </div>
    </el-main>

  </el-container>
</template>

<script>
import Clipboard from 'clipboard';
import cssbeautify from 'cssbeautify';
import ThemePicker from '@components/theme-picker';
import HRadio from '@components/HRadio';
import HInput from '@components/HInput';

require('./animation.css');
require('./jquery.js');
//贝塞尔曲线工具
require('./bezier.js');

export default {
  data() {
    return {
      //
      drag: {},
      tabName: '2',
      //动画列表
      effectAllList: [],
      // 动画Json数据
      animateJson: {},
      //当前动画
      curAnimationName: '',
      dialogVisible: false,
      animationCode: '',
      transitionCode: '',
      //当前过渡动画
      curTransitionCode: '',
      //过渡动画参数
      initCode: {
        rotate: 0,
        scaleX: 0,
        scaleY: 0,
        translateX: 0,
        translateY: 0,
        skewX: 0,
        skewY: 0,
        originX: 50,
        originY: 50,
        duration: 0.5,
        delay: 0.5
      },
      matrix: [{ a: 1, b: 1, c: 0, d: 0, e: 0, f: 0 }],
      params: {
        type: '2D'
      }
    };
  },
  components: {
    ThemePicker,
    HRadio,
    HInput
  },
  watch: {
    initCode: {
      handler: function(cur) {
        for (let i in cur) {
          if (cur[i] == null || cur[i] == '') {
            cur[i] = 0;
          }
        }
        this.setTransitionCode1(cur);
        //还原matrix
        // this.matrix.forEach(x => {
        //   x.a = 1;
        //   x.b = 1;
        //   x.c = 0;
        //   x.d = 0;
        //   x.e = 0;
        //   x.f = 0;
        // });
      },
      deep: true
    },
    matrix: {
      handler: function(cur) {
        let newArray = [];
        cur.forEach(x => {
          for (let i in x) {
            newArray.push(x[i]);
          }
        });
        let newStr = newArray.join(',');
        this.setTransitionCode2(newStr, 'matrix');
        //还原initCode
        // this.$set(this.initCode,'rotate',0);
        // this.$set(this.initCode,'scaleX',0);
        // this.$set(this.initCode,'scaleY',0);
        // this.$set(this.initCode,'translateX',0);
        // this.$set(this.initCode,'translateY',0);
        // this.$set(this.initCode,'skewX',0);
        // this.$set(this.initCode,'skewY',0);
      },
      deep: true
    }
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
      this.curAnimationName = '';
      if (row.effect_type_code) {
        setTimeout(() => {
          this.curAnimationName = row.effect_type_code;
          this.setAnimationCode(row.effect_type_code);
        }, 10);
      }
    },
    //编写代码
    setAnimationCode(code) {
      let detail = '';
      let animationCode = '';
      let animateJson = this.animateJson;

      for (let i in animateJson) {
        if (i === code) {
          detail = animateJson[i];
        }
      }
      let _webkit = detail.keyframe;
      let _moz = _webkit.replace(/-webkit-/g, '-moz-');
      animationCode = `
          .${this.curAnimationName}{
            -webkit-animation:${code} 1s .2s ease both;
            -moz-animation:${code} 1s .2s ease both;
          }
          ${_webkit}
          ${_moz}
        `;
      animationCode = cssbeautify(animationCode, { indent: '  ' });
      this.animationCode = animationCode;
    },
    //编写过渡代码 通过initCode
    setTransitionCode1(initCode) {
      let rotate = initCode.rotate !== 0 ? 'rotate(' + initCode.rotate + 'deg)' : '';
      let scaleX = initCode.scaleX !== 0 ? 'scaleX(' + initCode.scaleX + ')' : '';
      let scaleY = initCode.scaleY !== 0 ? 'scaleY(' + initCode.scaleY + ')' : '';
      let translateX = initCode.translateX !== 0 ? 'translateX(' + initCode.translateX + 'px)' : '';
      let translateY = initCode.translateY !== 0 ? 'translateY(' + initCode.translateY + 'px)' : '';
      let skewX = initCode.skewX !== 0 ? 'skewX(' + initCode.skewX + 'deg)' : '';
      let skewY = initCode.skewY !== 0 ? 'skewY(' + initCode.skewY + 'deg)' : '';
      let transformOrigin = initCode.originX !== 50 || initCode.originY != 50 ? 'transform-origin: ' + initCode.originX + '% ' + initCode.originY + '% 0px;' : '';
      let transitionCode = `
        .run{
          transform: ${rotate} ${scaleX} ${scaleY} ${translateX} ${translateY} ${skewX} ${skewY};
          ${transformOrigin}
        }
        .run{
          -webkit-transition-property:all;
          -webkit-transition-duration:${initCode.duration}s;
          -webkit-transition-delay:${initCode.delay}s;
          -webkit-transition-timing-function:cubic-bezier(0.000, 0.020, 0.070, 0.790);
        }`;
      transitionCode = cssbeautify(transitionCode, { indent: '  ' });
      this.transitionCode = transitionCode;
      this.curTransitionCode = `transform: ${rotate} ${scaleX} ${scaleY} ${translateX} ${translateY} ${skewX} ${skewY};${transformOrigin}`;
    },
    //编写过渡代码 matrix
    setTransitionCode2(matrix) {
      let initCode = this.initCode;
      let transformOrigin = initCode.originX !== 50 || initCode.originY != 50 ? 'transform-origin: ' + initCode.originX + '% ' + initCode.originY + '% 0px;' : '';
      let transitionCode = `
        .run{
          transform:matrix(${matrix});
          ${transformOrigin}
        }
        .run{
          -webkit-transition-property:all;
          -webkit-transition-duration:${initCode.duration}s;
          -webkit-transition-delay:${initCode.delay}s;
          -webkit-transition-timing-function:cubic-bezier(0.000, 0.020, 0.070, 0.790);
        }`;
      transitionCode = cssbeautify(transitionCode, { indent: '  ' });
      this.transitionCode = transitionCode;
      this.curTransitionCode = ` transform:matrix(${matrix});${transformOrigin}`;
    },
    //复制代码
    copyText() {
      let _copy = document.getElementById('copyText');
      _copy.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      this.showTextarea = true;
      this.$message.success('已复制好，可贴粘。');
    },
    //执行代码
    executeCode(_code) {
      let _style = document.createElement('style');
      let node = document.createTextNode(_code);
      let _body = document.getElementsByTagName('body')[0];
      let child = document.getElementsByTagName('style');
      //删除已有的 HTML 元素
      let length = child.length;
      for (let i = 0; i < length; i++) {
        if (child[i].getAttribute('flag') == 'animation') {
          _body.removeChild(child[i]);
        }
      }
      //创建新的 HTML 元素
      _style.setAttribute('flag', 'animation');
      _style.appendChild(node);
      _body.appendChild(_style);
      let _name = _code.substring(1, _code.indexOf(' {'));

      //记录当前过渡动画
      let curTransitionCode = this.curTransitionCode;
      this.curAnimationName = '';
      this.curTransitionCode = '';
      setTimeout(() => {
        this.curAnimationName = _name;
        this.curTransitionCode = curTransitionCode;
      }, 10);
    },
    //查看代码
    showCode() {
      this.dialogVisible = true;
    },
    //重置
    reset() {}
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
  text-align: right;
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
  overflow: auto;
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
    .drag {
      position: absolute;
      color: rgb(108, 21, 21);
      z-index: 9;
      left: 0px;
      top: 268px;
      background: red;
      border-radius: 30px;
      width: 30px;
      height: 30px;
    }
  }
}
.title {
  padding: 5px 0;
  margin-bottom: 5px;
}

/deep/ .el-button--small.is-circle,
.el-button--small.el-button--text {
  padding: 5px;
  margin-bottom: 5px;
  margin-left: 0;
  margin-right: 8px;
}
.foot-btn {
  float: right;
  margin: 20px 0 10px;
}
.popover {
  display: block;
  text-align: center;
}
/deep/ .el-table--small th,
/deep/.el-table--small td {
  padding: 3px 0;
}

/deep/ .config {
  overflow: hidden;
  margin: 2px 0;
  .el-input--small .el-input__inner,
  .el-input-group__append {
    padding: 5px;
    width: 40px;
    text-align: center;
  }

  label {
    width: 70px;
    display: inline-block;
    text-align: right;
    padding-right: 10px;
    vertical-align: middle;
    height: 32px;
    line-height: 32px;
    float: left;
  }
  .el-input {
    width: 80px;
    float: left;
  }
  .el-slider {
    width: 200px;
    float: left;
    margin-left: 20px;
    top: -3px;
    position: relative;
  }
}

.mod_cubic_dialog {
  width: 250px;
  height: 500px;
}

pre {
  word-break: break-all;
  white-space: pre-wrap;
}
</style>
