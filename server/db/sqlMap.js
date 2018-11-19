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
  animate:{
    add:'insert into animate_css(effect_id, effect_name) values (0, ?)',
    select:'select * from animate_css'
  }
}
module.exports = sqlMap;
