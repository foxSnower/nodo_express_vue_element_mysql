import Vue from 'vue'

//0.未使用 1.使用中 2.暂停中 3.已废弃
Vue.filter('shop_status', function (val) {
  switch (val) {
    case '0':
      return '未使用';
      break;
    case '1':
      return '使用中';
      break;
    case '2':
      return '暂停中';
      break;
    case '3':
      return '已废弃';
      break;
    default:
      return '已废弃';
      break;
  }
});

Vue.filter('filterNull', function (val) {
  if (val == null) {
    return '-'
  } else {
    return val
  }
});
