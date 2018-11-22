<template>
  <el-form-item :label='label' :prop="prop" :rules="rules">
    <el-select v-model="currentValue" :placeholder="placeholderName" @change="handleChange">
      <el-option v-for="(item,index) in filterOptionList" :key="index" :label="item.lable" :value="item.value"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  name: 'HtSelect',
  data() {
    return {
      currentValue: this.value === undefined || this.value === null ? '' : this.value
    };
  },
  props: {
    label: String,
    value: [String, Number, Boolean],
    filterable: {
      type: Boolean,
      default: false
    },
    prop: String,
    maxlength: {
      type: String,
      default: '64'
    },
    placeholder: String,
    disabled: Boolean,
    rules: [Object, Array],
    optionList: Array,
    props: Object
  },
  mounted() {
    this.$nextTick(() => {
      this.currentValue = this.value;
    });
  },
  methods: {
    handleChange(val) {
      this.$emit('change', val);
      this.$emit('input', this.currentValue);
      this.$emit('update:name', this.getName);
    },
  },
  computed: {
    placeholderName() {
      return '请选择' + this.label;
    },
    getName() {
      let name;
      let filterOptionList = this.filterOptionList;
      filterOptionList.forEach(x => {
        if (x.value == this.currentValue) {
          name = x.lable
        }
      });
      console.log(name);
      
      return name
    },
    filterOptionList() {
      let optionList = this.optionList;
      if (this.props == null) {
        return optionList;
      } else {
        let lable = this.props.label;
        let value = this.props.value;
        optionList.forEach(x => {
          x.lable = x[lable];
          x.value = x[value];
        });
        return optionList;
      }
    }
  }
};
</script>

