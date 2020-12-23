/**
 * @description 个人主页 api 路由
 */

const { getProfileBlogList } = require('../../controller/blog-profile')
const { follow, unfollow } = require('../../controller/user-relation')
const { loginCheck } = require('../../middlewares/loginCheck')
const { getBlogListStr } = require('../../utils/blog')

const router = require('koa-router')()

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)
  // 渲染为 html 字符串
  // views/widgets/load-more -> ${data.blogListTpl}
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  // controller
  ctx.body = await follow (myUserId, curUserId)
})

// 取消关注
router.post('/unfollow', loginCheck, async (ctx, next) => {
  const { id: myUserId } = ctx.session.userInfo
  const { userId: curUserId } = ctx.request.body
  // controller
  ctx.body = await unfollow (myUserId, curUserId)
})


module.exports = router