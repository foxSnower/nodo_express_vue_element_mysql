<template>
  <el-form-item :label="label" :prop="prop" :rules="rules">
    <el-radio-group class="ht-group" v-model.trim='currentValue' @change="handleChange" :disabled="disabled">
      <el-radio v-for="(item,index) in filterOptionList" :key="index" :label="item.lable?item.lable:item">{{item.value?item.value:item}}</el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
export default {
  name: "HRadio",
  data() {
    return {
      currentValue:
        this.value === undefined || this.value === null ? "" : this.value
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
      default: "64"
    },
    placeholder: String,
    disabled: Boolean,
    rules: [Object, Array],
    optionList: Array,
    props: Object
  },
  watch: {
    value(cur) {
      this.currentValue = cur;
    }
  },
  methods: {
    handleChange(val) {
      this.$emit("change", val);
      this.$emit("input", this.currentValue);
      this.$emit("update:name", this.getName);
    }
  },
  computed: {
    placeholderName() {
      return "请选择" + this.label;
    },
    getName() {
      let name;
      let filterOptionList = this.filterOptionList;
      filterOptionList.forEach(x => {
        if (x.value == this.currentValue) {
          name = x.lable;
        }
      });
      return name;
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

<style lang="scss" scoped>
.ht-group {
  position: relative;
  top: 2px;
  left: 10px;
}
</style>

