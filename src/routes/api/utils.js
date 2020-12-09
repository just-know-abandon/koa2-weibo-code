/**
 * @description utils api 路由
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginCheck')
const koaFrom = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

// 上传图片
router.post('/upload', loginCheck, koaFrom(), async (ctx, next) => {
  //                          file对应my-ajax自定义upload的上传图片
  const file = ctx.req.files['file']
  // 保存文件需要获取(大小，存储路径，文件名，文件类型)
  const { size, path, name, type } = file
  // controler
  ctx.body = await saveFile({
    name,
    type,
    size,
    filePath: path
  })
})

module.exports = router