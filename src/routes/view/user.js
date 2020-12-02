/**
 * @description user view 路由
 * @author lhj
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginCheck')

/**
 * 获取登录信息
 * @param {Object} ctx ctx
 */
function getLoginInfo (ctx) {
  let data = {
    isLogin: false  // 未登录
  }
  const userInfo = ctx.session.userInfo
  if (userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
    console.log(data)
    console.log(data.isLogin)
    console.log(data.userName)
  }
  return data
}

// 登录页
// ctx.render('login', {参数})
router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

// 注册页
router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

// 设置页
router.get('/setting', loginRedirect, async (ctx, next) => {
  await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router