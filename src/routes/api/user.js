/**
 * @description user API 路由
 */

const router = require('koa-router')()
const { isExist, register, login, changeInfo } = require('../../controller/user')
const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')
const { loginCheck } = require('../../middlewares/loginCheck')

router.prefix('/api/user')

// 注册                   中间件,验证格式
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  // controller
  ctx.body = await register({
    userName,
    password,
    gender
  })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  // controller
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  // controller
  ctx.body = await login(ctx, userName, password)
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  // controller
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

module.exports = router