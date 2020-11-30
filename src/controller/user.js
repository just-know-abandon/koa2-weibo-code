/**
 * @description user controller
 */

const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo } = require('../model/ErrorInfo')

/**
 * 用户名是否存在
 * @param {*} userName 用户名
 */
async function isExist (userName) {
  // 1.业务逻辑处理（无）
  // 2.调用 services层 获取数据
  const userInfo = await getUserInfo(userName)
  // 3.返回统一格式
  if (userInfo) {
    // 用户名已存在
    // { errno: 0, data: {...} }
    return new SuccessModel(userInfo)
  } else {
    // 用户名不存在
    // { errno: 10003, message: '用户名不存在' }
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

module.exports = {
  isExist
}