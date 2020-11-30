/**
 * @description user controller
 */

const { getUserInfo, creatdUser } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

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


/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别(1男2女3保密)
 * 用{}包含参数 可以解构，传参是时可以不按顺序
 */
async function register ({userName, password, gender}) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已经存在
    return new ErrorModel(registerUserNameExistInfo)
  }
  // 注册 services
  try {
    await creatdUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex)
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo)
  }
}

module.exports = {
  isExist,
  register
}