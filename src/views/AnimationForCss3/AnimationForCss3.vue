<template>
  <div>
    <el-button type="primary" size="small" @click="dialogVisible=true">新增</el-button>
    <el-table :data="tableData" size="small" border style="width: 900px;margin-top:10px;">
      <el-table-column fixed="left" type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="effect_id" label="大类ID" width="180">
      </el-table-column>
      <el-table-column prop="effect_name" label="大类名称" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small">新增效果</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增大类" :visible.sync="dialogVisible" width="500px">
      <el-form ref="form" label-width="100px" size="small">
        <!-- <el-form-item label="效果类型">
          <el-input v-model="effect_name"></el-input>
        </el-form-item> -->
        <HInput label="效果类型" v-model="effect_name"></HInput>
        <HSelect label="效果类型" v-model="effect_name" :name.sync="name" :optionList="effectList" :props="{label:'effect_name',value:'effect_id'}"></HSelect>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      effect_name: '11',
      name: '',
      tableData: [
        {
          effect_id: '1',
          effect_name: '基本效果',
          effect_type: [
            {
              effect_type_id: '1',
              effect_type_code: 'flash',
              effect_type_name: '闪光灯'
            }
          ]
        },
        {
          effect_id: '3',
          effect_name: '基本效果',
          effect_type: [
            {
              effect_type_id: '1',
              effect_type_code: 'flash',
              effect_type_name: '闪光灯'
            }
          ]
        }
      ],

      effectList: []
    };
  },
  components: {
    HInput: () => import('@components/HInput'),
    HSelect: () => import('@components/HSelect')
  },
  mounted() {
    this.selectAnimate();
  },
  methods: {
    selectAnimate() {
      this.$api.selectAnimate({}).then(res => {
        this.effectList = res.data;
      });
    }
  }
};
</script>

