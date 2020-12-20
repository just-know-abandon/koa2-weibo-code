/**
 * @description 微博 数据格式检验
 */

const validate = require('./_validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    content: {
      type: 'string'
      // minLength: 10
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */

function blogValidate (data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate
