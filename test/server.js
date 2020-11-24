/**
 * @description jest server
 * @author lhj
 */

const request = require('supertest')
// 测试http请求
const server = require('../src/app').callback()

module.exports = request(server)