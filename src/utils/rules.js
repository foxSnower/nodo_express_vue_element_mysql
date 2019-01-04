
import $U from "@/utils";

const validator = $U.validator;

export const UsersRules = {
  shop_name: [{
    required: true,
    name: '商铺名称',
    validator:validator.normal,
    trigger: ['blur']
  }],
  goods_name: [{
    required: true,
    name: '主推商品',
    validator: validator.normal,
    trigger: ['blur']
  }],
  shop_address: [{
    required: true,
    name: '商铺地址',
    validator: validator.normal,
    trigger: ['blur']
  }],
  shop_manager: [{
    required: true,
    name: '店长姓名',
    validator: validator.normal,
    trigger: ['blur', 'change']
  }],
  shop_phone: [{
    required: true,
    name: '店长电话',
    validator: validator.phone,
    trigger: ['blur']
  }],
  shop_IDCard: [{
    required: true,
    name: '店长身份证',
    validator: validator.identity,
    trigger: ['blur']
  }],
}