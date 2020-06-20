const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'myblog',
})

con.connect()

// const sql = `select username from users;`
// const sql = `update users set realname = '李四2' where username = 'lisi';`
const sql = `insert into blogs (title, content, createTime, author) values ('标题1', '内容1', ${new Date().getTime()}, 'mike');`

con.query(sql, (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(result)
})

con.end()
