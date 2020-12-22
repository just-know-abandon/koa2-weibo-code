/**
 * @description 广场 api 路由
 */

const router = require('koa-router')()
const { getSquareBlogList } = require('../../controller/blog-square')
const { loginCheck } = require('../../middlewares/loginCheck')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/square')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getSquareBlogList(pageIndex)
  // 渲染为 html 字符串
  // views/widgets/load-more -> ${data.blogListTpl}
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router