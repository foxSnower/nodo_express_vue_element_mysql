<template>
  <div>
    <el-button type="primary" size="small" @click="editEffect('add')">新增</el-button>
    <el-table :data="filterEffectAllList" size="small" border style="margin-top:10px;">
      <el-table-column fixed="left" type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="effect_name" label="动画名称" width="100"></el-table-column>
      <el-table-column prop="effect_type_name" label="类型名称" width="100"></el-table-column>
      <el-table-column prop="effect_type_code" label="类型编码" width="100"></el-table-column>
      <el-table-column prop="effect_detail" label="代码" min-width="800"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editEffect('edit',scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteEffect(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form :model="params" ref="form" label-width="120px" size="small">
        <HSelect label="动画名称" v-model="params.effect_id" :name.sync="params.effect_name" :optionList="filterEffectList" :props="{label:'effect_name',value:'effect_id'}" :disabled="dialogDisabled"></HSelect>
        <HInput v-if="params.effect_id==='other'" label="新增动画名称" v-model="params.effect_name"></HInput>
        <HInput label="类型名称" v-model="params.effect_type_name"></HInput>
        <HInput label="类型编码" v-model="params.effect_type_code"></HInput>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "",
      dialogDisabled: false,
      //动画大类
      effectList: [],
      //动画列表
      effectAllList: [],
      // 动画Json数据
      animateJson: {},
      //参数
      params: {
        effect_id: null,
        effect_name: null,
        effect_type_id: null,
        effect_type_code: null,
        effect_type_name: null
      }
    };
  },
  watch: {
    dialogVisible: function(cur, old) {
      if (cur) {
        this.getAnimate();
      }
    }
  },
  components: {
    HInput: () => import("@components/HInput"),
    HSelect: () => import("@components/HSelect")
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.getAnimateAll();
      this.getAnimateJson();
    },
    //获取动画大类
    getAnimate() {
      this.$api.getAnimate({}).then(res => {
        this.effectList = res.data;
      });
    },
    //获取动画列表
    getAnimateAll() {
      this.$api.getAnimateAll({}).then(res => {
        this.effectAllList = res.data;
      });
    },
    //获取动画Json数据
    getAnimateJson() {
      this.$api.getAnimateJson({}).then(res => {
        this.animateJson = res;
      });
    },
    //新增动画
    editAnimate(params, callback) {
      this.$api.editAnimate(params).then(res => {
        return callback(res);
      });
    },
    //删除动画
    deleteAnimate(params, callback) {
      this.$api
        .deleteAnimate({ effect_type_id: params.effect_type_id })
        .then(res => {
          return callback(res);
        });
    },
    //编辑
    editEffect(type, row) {
      this.dialogVisible = true;
      if (type === "add") {
        this.dialogTitle = "新增动画";
        this.dialogDisabled = false;
        for (let i in this.params) {
          this.params[i] = null;
        }
      }
      if (type === "edit") {
        this.dialogTitle = "编辑动画";
        this.dialogDisabled = true;
        this.params = Object.assign({}, row);
      }
    },
    //删除
    deleteEffect(row) {
      this.$confirm("删除后,将失去此信息,是否继续？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "是",
        cancelButtonText: "否",
        callback: action => {
          if (action === "confirm") {
            this.deleteAnimate(row, res => {
              this.$message.success(res.msg);
              this.getData();
            });
          }
        }
      });
    },
    //保存
    save() {
      let params = this.params;
      this.editAnimate(params, res => {
        this.$message.success(res.msg);
        this.dialogVisible = false;
        this.getData();
      });
    }
  },
  computed: {
    //增加其他选项
    filterEffectList() {
      let effectList = this.effectList;
      effectList.push({
        effect_id: "other",
        effect_name: "其他"
      });
      return effectList;
    },
    //获取动画的主要代码
    filterEffectAllList() {
      let effectAllList = this.effectAllList;
      let animateJson = this.animateJson;
      effectAllList.forEach(x => {
        let effect_type_code = x.effect_type_code;
        this.$set(
          x,
          "effect_detail",
          JSON.stringify(animateJson[effect_type_code])
        );
      });
      return effectAllList;
    }
  }
};
</script>

