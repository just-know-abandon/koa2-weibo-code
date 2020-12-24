/**
 * @description 用户关系 services
 */

const { User, UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 获取关注该用户得用户列表，即该用户的粉丝
 * @param {number} userId 当前用户id
 */
async function getUserByFollower (userId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          // 粉丝id
          followerId: userId
        }
      }
    ]
  })
  // result.count 总数
  // result.rows 查询结果，数组
  // 格式化
  let userList = result.rows.map(row => row.dataValues)
  console.log(userList)
  userList = formatUser(userList)

  return {
    count: result.count,
    userList
  }
}

/**
 * 获取关注人列表
 * @param {number} userId 当前用户id
 */
async function getFollowersByUser (userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture'],
      }
    ],
    where: {
      userId
    }
  })
  // result.count 总数
  // result.rows 查询结果，数组
  // console.log(result)
  // console.log(result.count)
  console.log(result)
  // console.log(result.rows)
  let userList = result.rows.map(row => row.dataValues)
  // console.log(userList)
  userList = userList.map(item => {
    let user = item.user
    user = user.dataValues
    user = formatUser(user)
    return user
  })

  return {
    count: result.count,
    userList
  }
}

/**
 * 添加关注关系
 * @param {number} userId 用户id
 * @param {number} followerId 被关注用户id
 */
async function addFollower (userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}

/**
 * 删除关注关系
 * @param {number} userId 用户id
 * @param {number} followerId 被关注用户id
 */
async function deleteFollower (userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result > 0
}

module.exports = {
  getUserByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUser
}