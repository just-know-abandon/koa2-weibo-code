/**
 * @description 环境变量配置
 */

//  获取启动是 dev 还是 production
const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isPord: ENV === 'production',
  notPord: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test'
}