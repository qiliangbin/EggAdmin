const { Service } = require('egg')

class BaseService extends Service {
  async _findOne(Modle, key, val) {
    return this.ctx.model[Modle].findOne({
      where: {
        [key]: val
      }
    })
  }
}

module.exports = BaseService