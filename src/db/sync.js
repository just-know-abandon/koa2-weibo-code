/**
 * @description sequelize 同步数据库
 * @author lhj
 */

const seq = require('./seq')

require('./model/index')

// 测试连接
seq.authenticate().then(() => {
  console.log('auth ok')
}).catch(() => {
  console.log('auth err')
})

// 执行同步
// force强制执行覆盖原有得同名表格
// seq.sync({ force: true })
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})