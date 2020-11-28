/**
 * @description sequelize 实例
 * @author lhj
 */

const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { isPord, isTest } = require('../utils/env')

const { host, user, password, database } = MYSQL_CONF

const conf = {
  host,
  dialect: 'mysql'
}

// 单元测试 关闭sequelize打印语句
if (isTest) {
  conf.loggin = () => {}
}

// 线上环境，使用连接池
if (isPord) {
  conf.pool = {
    max: 5, // 连接池中最大连接数量
    min: 0, // 最小
    idle: 10000 // 如果一个连接池10s之内没有被使用，则释放
  }
}

// 连接 mysql
const seq = new Sequelize(database, user, password, conf)

module.exports = seq
