<template>
  <el-container class="is-vertical">
    <HHeader></HHeader>
    <router-view />
  </el-container>
</template>

<script>
import HHeader from '@components/Layout/HHeader';
export default {
  name: 'Main',
  components: {
    HHeader
  }
};
</script>

