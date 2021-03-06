/**
 * @description user service
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取用户信息(注册，验证是否存在，登录)通用
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

/**
 * 更新用户信息 + 修改密码
 * @param {Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity }
 * @param {Object} param1 查询条件 { userName, password }
 */
async function updateUser (
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) {
    // 拼接修改内容
    const updateData = {}
    if (newPassword) {
      updateData.password = newPassword
    }
    if (newNickName) {
      updateData.nickName = newNickName
    }
    if (newPicture) {
      updateData.picture = newPicture
    }
    if (newCity) {
      updateData.city = newCity
    }

    // 拼接查询条件
    const whereData = {
      userName
    }
    if (password) {
      whereData.password = password
    }

    // 执行修改
    const result = await User.update(updateData, {
      where: whereData
    })
    return result[0] > 0  // 修改行数
}

module.exports = {
  getUserInfo,
  creatdUser,
  updateUser
}