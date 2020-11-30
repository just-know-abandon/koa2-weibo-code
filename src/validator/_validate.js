/**
 * @description json schema 校验
 */

const Ajv = require('ajv')
const ajv = new Ajv() // {allErrors: true} 默认false   输出所有的错误(效率慢)

/**
 * json schema 校验
 * @param {Object} schema json schema 规则
 * @param {Object} data 待校验的数据
 */
function validate (schema, data = {}) {
  const valid = ajv.validate(schema, data)
  // 没有通过就返回第一条错误,成功没有返回值
  if (!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate