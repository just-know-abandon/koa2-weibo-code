/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo (userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  // 如果有传入password就加入
  if (password) {
    Object.assign(whereOpt, { password })
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result == null) {
    // 未找到
    return result
  }
  
  // 格式化处理（用户头像）
  const formatRes = formatUser(result.dataValues)

  return formatRes
}

/**
 * 注册
 * @param {string} userName 用户
 * @param {string} password 密码
 * @param {number} gender 性别(1男2女3保密)
 * @param {string} nickName 昵称
 */
async function creatdUser ({userName, password, gender = 3, nickName}) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName : nickName ? nickName : userName
  })
  return result.dataValues
}

module.exports = {
  getUserInfo,
  creatdUser
}