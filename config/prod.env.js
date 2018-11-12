'use strict'
console.log("当前环境："+process.env.NODE_ENV_BUILD);
module.exports = {
  NODE_ENV: '"production"',
  NODE_ENV_BUILD: '"'+process.env.NODE_ENV_BUILD+'"'
}
