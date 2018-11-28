<template>
  <el-form-item :label='label' :prop="prop" :rules="rules">
    <el-input :type="type" :rows="rows" v-model.trim='currentValue' :maxlength="maxlength" :placeholder='placeholderName' @input="handleInput" @change="$emit('change')" :disabled="disabled" :value="currentValue">
      <template v-if="append" slot="append">{{append}}</template>
    </el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'HInput',
  data() {
    return {
      currentValue: this.value === undefined || this.value === null ? '' : this.value
    };
  },
  props: {
    label: String,
    value: [String, Number],
    prop: String,
    maxlength: {
      type: String,
      default: '64'
    },
    placeholder: String,
    disabled: Boolean,
    append: String,
    type: String,
    rows: String,
    rules: [Object, Array]
  },
  watch:{
    value(cur){
      this.currentValue = cur
    }
  },
  methods: {
    handleInput(val) {
      this.$emit('input', val);
    }
  },
  computed: {
    placeholderName() {
      return '请输入' + this.label;
    }
  }
};
</script>

