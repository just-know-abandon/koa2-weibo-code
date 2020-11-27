const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: 'nihao',
    isMe: true,
    blogList: [
      {
        id: 1,
        title: 'aaa'
      },
      {
        id: 2,
        title: 'bbb'
      },
      {
        id: 3,
        title: 'ccc'
      }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  // 测试刷新数量/个人会话
  // const session = ctx.session
  // if(session.viewNum == null){
  //   session.viewNum = 0
  // }
  // session.viewNum++
  // throw Error()

  ctx.body = {
    title: 'koa2 json'
    // viewNum: session.viewNum
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  // 获取路由url参数:userName
  const { userName } = ctx.params
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})

router.get('/loadMore/:userName/:pageIndex', async(ctx, next) => {
  const { userName, pageIndex } = ctx.params
  ctx.body = {
    title: 'this is loadMore API',
    userName,
    pageIndex
  }
})

module.exports = router
