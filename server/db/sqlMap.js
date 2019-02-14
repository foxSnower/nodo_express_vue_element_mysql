// sql语句
var sqlMap = {
  // 商户
  shop: {
    add: 'insert into shops(shop_id, shop_name,goods_name,shop_address,shop_manager,shop_phone,shop_IDCard,user_name,password) values (0, ?,?,?,?,?,?,?,?)',
    modify: 'update shops set shop_name=?,goods_name=?,shop_address=?,shop_manager=?,shop_phone=?,shop_IDCard=?,user_name=?,password=? where shop_id=?',
    delete: 'delete from shops where shop_id=?',
    select: 'select * from shops',
  },
  // 登录
  login: {
    select: 'select * from account where user_name = ? and user_password = ?',
    modifyTokens: 'update account set token=?,refresh_token=? where account_id=?',
    modifyToken: 'update account set token=? where account_id=?',
    modifyRefreshToken: 'update account set refresh_token=? where account_id=?',
  },
  animate: {
    add: 'insert into animate_css(effect_id, effect_name) values (0, ?)',
    addType: 'insert into animate_css_type(effect_type_id,effect_id,effect_type_code, effect_type_name) values (0, ?, ?, ?)',
    modifyType: 'update animate_css_type set effect_id=?,effect_type_code=?, effect_type_name=? where effect_type_id=?',
    deleteType: 'delete from animate_css_type where effect_type_id=?',
    select: 'select * from animate_css',
    selectType: 'select * from animate_css_type',
    selectTypeForId: 'select * from animate_css_type where effect_id in (?)',
  },
  markdown: {
    add: 'insert into markdown(markdown_id, markdown_title,markdown_value) values (0, ?,?)',
    modify: 'update markdown set markdown_title=?, markdown_value=? where markdown_id=?',
    delete: 'delete from markdown where markdown_id=?',
    select: 'select * from markdown',
  }
}
module.exports = sqlMap;
