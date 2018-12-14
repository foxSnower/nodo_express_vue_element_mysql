// sql语句
var sqlMap = {
  // 用户
  user: {
    add: 'insert into account(user_id, user_name, user_password) values (0, ?, ?)'
  },
  // test
  test: {
    add: 'insert into goods(id, name, price) values (0, ?, ?)'
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
    add: 'insert into markdown(markdown_id, effect_name) values (0, ?)',
    select: 'select * from markdown',
  }
}
module.exports = sqlMap;
