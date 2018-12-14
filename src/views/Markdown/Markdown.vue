<template>
  <div class="editor">
    <!-- <transition name="el-zoom-in-center"> -->
    <div class="menu-box">
      <div class="menu" :style="{width:showMenu?'250px':0}" v-if="showMenu">
        <div v-for="(item,index) in getMarkdowList" :key="index">
          <span>{{item.markdown_title}}.md</span>
          <span class="time">{{item.creat_time|filterTime}}</span>
        </div>

      </div>
      <div class="switch" @click="showMenu=!showMenu"><i class="iconfont icon-jiantouarrowheads3"></i></div>
    </div>

    <!-- </transition> -->
    <mavon-editor class="mavon" :ishljs="true" v-model="value" @save="handleSave" />
    <!-- <mavon-editor :ishljs = "true"  :toolbarsFlag="false"  :subfield="false" default_open="preview" v-model="value" /> -->
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
export default {
  name: 'markDown',
  data() {
    return {
      showMenu: true,
      value: '# asdsad',
      getMarkdowList: []
    };
  },
  filters: {
    filterTime(val) {
      return val.substr(5, 5);
    }
  },
  mounted() {
    this.getMarkdow();
  },
  methods: {
    getMarkdow() {
      this.$api.getMarkdown({}).then(res => {
        this.getMarkdowList = res.data;
        this.value = this.getMarkdowList[0].markdown_value;
      });
    },
    handleSave(val) {
      console.log(val);
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
    .menu {
      width: 250px;
      padding: 15px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
      margin-right: 10px;
      .time {
        font-size: 12px;
        color: #ccc;
        float: right;
      }
    }
    .switch {
      position: absolute;
      width: 40px;
      height: 20px;
      right: -40px;
      top: 50%;
      margin-top: -10px;
      z-index: 9999;
    }
  }

  .mavon {
    width: 100%;
    // margin-left: 250px;
  }
}
</style>


