const { Controller } = require('egg')

class BaseController extends Controller {
  async res(isResult, data) {
    this.ctx.body = {
      code: 200,
      data: {
        success: isResult,
        data
      }
    }
  }
  async success(data) {
    this.ctx.body = {
      code: 200,
      data: {
        success: true,
        data
      }
    }
  }
  async fail(data) {
    this.ctx.body = {
      code: 500,
      data: {
        success: false,
        data: data.toString(),
      }
    }
  }
}

module.exports = BaseController