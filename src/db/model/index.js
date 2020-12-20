/**
 * @description 数据模型入口文件
 * @author lhj
 */

 const User = require('./User')
 const Blog = require('./Blog')

 /**
  * 查询微博顺带查出用户信息
  * Blog.belongsTo(User) 多对一
  * 查询用户顺带查出微博
  * User.hadMany(Blog) 一对多
  */
 Blog.belongsTo(User, {
   foreignKey: 'userId'
 })

 module.exports = {
  User,
  Blog
 }