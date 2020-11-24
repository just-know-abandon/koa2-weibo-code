/**
 * @description json test
 * @author lhj
 */

const server = require('./server')

// http网络请求测试，异步
test('json 接口返回数据格式正确', async () => {
  const res = await server.get('/json')
  // 判断对象是否相等
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
  expect(res.body.title).toBe('koa2 json')
})

// // post请求
// const res = await server.post('/login').send({
//   userName: 'zhangsan',
//   password: '123'
// })