const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')

const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('../src/utils/env')

// 路由
const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/view/error')

// error handler
// 检测错误
// onerror(app)
// 线上环境下跳转error页面，生产模式下直接error
let onerrorConf = {}
if (isProd) {
  onerrorConf = {
    redirect: '/error'
  }
}
onerror(app, onerrorConf)

// middlewares
// 解析post数据
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// 打印日志
app.use(logger())
// 静态化资源 可以通过地址访问public下文件
app.use(require('koa-static')(__dirname + '/public'))

// 注册ejs
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// session 配置
app.keys = ['ASDasd_123#$$'] // 加密
app.use(session({
  key: 'weibo.sid', // cookie name 默认'koa.sid'
  prefix: 'weibo:sess:', // redis key 的前缀，默认'koa:sess:'
  cookie: {
    path: '/', // 生成的cookie在整个网站都可以访问
    httpOnly: true, // 仅允许在session端修改，客户端不允许
    maxAge: 24 * 60 * 60 * 1000 // cookie过期时间 一天 ms
  },
  // ttl: 24 * 60 * 60 * 1000, // redis 过期时间 session工具默认maxAge时间，不需要手动添加
  store: redisStore({
    // all: '127.0.0.1:6379'  从 ./conf/db - REDIS_CONF中引入
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// 404路由必须放最下
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
