/**
 * @description 微博 view 路由
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { getSquareBlogList } = require('../../controller/blog-square')
const { isExist } = require('../../controller/user')
const { getFans, getFollowers } = require('../../controller/user-relation')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 已登录用户的信息
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName

  let curUserInfo
  const { userName: curUserName } = ctx.params
  const isMe = myUserName === curUserName
  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前用户
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }
  // 获取微博第一页数据
  // controller
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  // 获取粉丝
  // controller
  const fansResult = await getFans(curUserInfo.id)
  const { fansCount, fansList } = fansResult.data

  // 获取关注人列表
  // controller
  const followersResult = await getFollowers(curUserInfo.id)
  const { followersCount, followersList } = followersResult.data

  // 我是否关注了此人？
  const amIFollowed = fansList.some(item => {
    return item.userName === myUserName
  }) 

  await ctx.render('profile', {
    // 传入blogData数据
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: {
        count: fansCount,
        list: fansList
      },
      amIFollowed, 
      followersData: {
        count: followersCount,
        list: followersList
      },
    }
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  })
})

module.exports = router