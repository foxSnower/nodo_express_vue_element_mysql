<template>
  <div class="editor">
    <div class="menu-box">
      <div class="menu" :style="{width:showMenu?'280px':0}" v-if="showMenu">
        <div class="list" :class="{active:item.markdown_id==curMark.markdown_id}" v-for="(item,index) in getMarkdowList" :key="index" @click="selectList(item)" @contextmenu.prevent="contextmenu($event,item)">
          <span class="title"><i class="iconfont icon-markdown"></i>{{item.markdown_title}}.md</span>
          <span class="time">{{item.creat_time|filterTime}}</span>
        </div>
      </div>
      <el-button type="primary" class="btn-menu" :class="{'btn-add':showBtn}" icon="el-icon-plus" circle title="新建文档" @click="addMd();showBtn=false"></el-button>
      <el-button type="primary" class="btn-menu" :class="{'btn-con-menu':showBtn}" icon="el-icon-view" circle title="隐藏列表" @click="showMenu=!showMenu;showBtn=false"></el-button>
      <el-button type="primary" class="btn-menu btn-set" icon="el-icon-setting" circle title="设置" @click="showBtn=!showBtn"></el-button>
    </div>
    <mavon-editor ref=md class="mavon" :ishljs="true" @imgAdd="imgAdd" v-model="curMark.markdown_value" @save="handleSave()" />
    <!--Right Click Menu-->
    <el-card class="box-card" :style="{left:conMenuPos.left,top:conMenuPos.top}" v-if="showRightClick">
      <div slot="header" class="clearfix" @click="addMd()">
        <el-button type="text" icon="el-icon-circle-plus-outline">新建文档</el-button>
      </div>
      <div class="text" @click="resetMd(params)">
        <el-button type="text" icon="iconfont icon-no-zhongmingming">重命名</el-button>
      </div>
      <div class="text" @click="deleteMd(params)">
        <el-button type="text" icon="el-icon-delete">删除</el-button>
      </div>
    </el-card>
    <!-- 新建 or 修改文件名称 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form :model="params" ref="form" label-width="120px">
        <el-form-item label="文件名称">
          <el-input type="text" v-model="params.markdown_title">
            <template slot="suffix">.md</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveMd(params)">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import axios from 'axios';
import 'mavon-editor/dist/css/index.css';
export default {
  name: 'markDown',
  data() {
    return {
      showBtn: false,
      showMenu: true,
      showRightClick: false,
      conMenuPos: {
        left: 0,
        top: 0
      },
      curMark: {
        markdown_value: ''
      },
      getMarkdowList: [],

      dialogVisible: false,
      dialogTitle: '新增文件',
      params: {}
    };
  },
  filters: {
    filterTime(val) {
      if (val) {
        return val.substr(5, 5);
      } else {
        return '';
      }
    }
  },
  mounted() {
    let _vm = this;
    window.onload = function() {
      //再次点击，菜单消失
      document.onclick = function() {
        _vm.showRightClick = false;
      };
    };
    this.getMarkdow();
  },
  methods: {
    getMarkdow() {
      this.$api.getMarkdown({}).then(res => {
        this.getMarkdowList = res.data;
        if (!this.curMark.markdown_id) {
          this.curMark = Object.assign({}, this.getMarkdowList[0]);
        }
      });
    },
    //右键菜单
    contextmenu(e, item) {
      var event = e || window.event;
      //显示菜单/菜单定位
      this.showRightClick = true;
      this.$set(this.conMenuPos, 'left', event.pageX + 'px');
      this.$set(this.conMenuPos, 'top', event.pageY + 'px');
      this.params = Object.assign({}, item);
    },
    //新建文档
    addMd() {
      this.params = {};
      this.dialogVisible = true;
      this.dialogTitle = '新增文件';
    },
    //重命名
    resetMd() {
      this.dialogVisible = true;
      this.dialogTitle = '修改文件';
    },
    //保存新建的文档
    saveMd(params) {
      this.$api.editMarkdown(params).then(res => {
        //区分是新增还是修改
        if (!params.markdown_id) {
          params.markdown_id = res.data;
        }
        this.curMark = Object.assign({}, params);
        this.dialogVisible = false;
        this.params = {};
        this.getMarkdow();
      });
    },
    //删除文档
    deleteMd(params) {
      this.$api
        .delMarkdown({
          markdown_id: params.markdown_id
        })
        .then(res => {
          this.$message.success('删除成功');
          this.getMarkdow();
        });
    },
    //点击菜单
    selectList(item) {
      let curMark = this.curMark;
      //点击为当前md,返回
      if (curMark.markdown_id == item.markdown_id) return false;
      let getMarkdowList = this.getMarkdowList;
      let modifyContent = null;
      try {
        getMarkdowList.forEach((x, index) => {
          if (x.markdown_id == curMark.markdown_id) {
            modifyContent = x;
            throw 'x';
          }
        });
      } catch (error) {}
      if (curMark.markdown_value != null && modifyContent.markdown_value != curMark.markdown_value) {
        this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '放弃修改'
        })
          .then(() => {
            this.handleSave(() => {
              this.curMark = Object.assign({}, item);
            });
          })
          .catch(action => {
            if (action === 'cancel') {
              this.curMark = Object.assign({}, item);
            }
          });
      } else {
        this.curMark = Object.assign({}, item);
      }
    },
    //添加图片
    imgAdd(pos, file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('fileList', file);
      this.$api.uploadFile(formdata).then(res => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        this.$refs.md.$img2Url(pos, res.data);
      });
    },
    //保存
    handleSave(fn) {
      let param = this.curMark;
      this.$api.editMarkdown(param).then(res => {
        this.$message.success('保存成功');
        this.getMarkdow();
        if (fn) {
          fn();
        }
      });
    }
  },
  components: {
    mavonEditor
  }
};
</script>

<style lang="scss" scoped>
.editor {
  margin: 20px;
  display: flex;
  .menu-box {
    position: relative;
    min-height: 300px;
    margin-right: 25px;
    .menu {
      position: relative;
      width: 250px;
      height: 100%;
      background: #fff;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      z-index: 1;
      .list {
        position: relative;
        padding: 12px 10px;
        cursor: pointer;
        background: url('~@assets/menu_bg.png') no-repeat;
        background-size: 60px 20px;
        background-position: bottom -4px right;
        &:hover,
        &.active {
          background-color: rgba(0, 0, 0, 0.05);
        }
        .title {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          line-height: 1.8;
          width: 80%;
          word-break: break-all;
        }
        .icon-markdown {
          font-size: 12px;
          margin: 0 5px;
          padding: 3px;
          border: 1px solid #7aaaea;
        }
      }
      .time {
        font-size: 12px;
        color: #ccc;
        position: absolute;
        right: 8px;
        top: 10px;
      }
    }
    .btn-menu {
      position: absolute;
      z-index: 2;
      top: 50%;
      left: -22px;
      margin-top: -22px;
      font-size: 24px;
      transition: all 0.2s ease;
      transform: translate(0, 0);
      opacity: 0;
      z-index: 1600;
      + .el-button {
        margin-left: 0;
      }
      &.btn-set {
        opacity: 1;
      }
      &.btn-add {
        opacity: 1;
        transform: translateY(-52px);
      }
      &.btn-con-menu {
        opacity: 1;
        transform: translate(44px, -22px);
      }
    }
    .switch {
      position: absolute;
      right: -20px;
      top: 50%;
      margin-top: -16px;
      &.shake {
      }
    }
  }

  .mavon {
    width: 100%;
    height: calc(100vh - 100px);
  }
  /deep/ {
    .markdown-body img {
      max-width: 50%;
    }
    .hljs {
      background: #eee;
    }
    .hljs-keyword {
      color: #e6a23c;
    }
    .hljs-function {
      color: #ce0c0c;
    }
    .markdown-body blockquote {
      color: #e6a23c;
      border-left: 0.25em solid #e6a23c;
    }
  }
  .box-card {
    position: absolute;
    width: 200px;
    z-index: 1600;
    .text {
      &:hover {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>


