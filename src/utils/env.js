/**
 * @description 环境变量配置
 */

const ENV = process.env.NODE_ENV

module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isPord: ENV === 'production',
  notPord: ENV !== 'production'
}