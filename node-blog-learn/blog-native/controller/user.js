const {
  execSql,
  parseInsertSql,
  parseUpdateSql,
  parseDeleteSql,
} = require('../db/mysql/index')

const userInfoGet = async (username) => {
  const sql = `select * from users where username = '${username}';`
  let [err, ret] = await execSql(sql)
  if (!ret.length) {
    err = '用户不存在'
  }
  return [err, ret[0] || {}]
}

module.exports = {
  userInfoGet,
}
