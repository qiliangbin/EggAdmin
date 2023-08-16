const Controller = require('./base')

class UserController extends Controller {
  async register() {
    try{
      let { ctx } = this
      const { name, password, age, role } = ctx.request.body 
      const res = await ctx.service.user.register({name, password, age, role})
      this.res(res.length > 0, res)
    } catch(err) {
      this.fail(err)
    }
  }
  async logOff() {
    try{
      let { name } = this.ctx.request.body
      const res = await this.ctx.service.user.del({name})
      this.res(res, {})
    } catch(err) {
      this.fail(err)
    }
  }
  async edit() {
    try{
      let params = this.ctx.request.body
      const res = await this.ctx.service.user.edit(params)
      this.success(res)
    } catch(err) {
      this.fail(err)
    }
  }
  // 修改密码
  async modifyPassword() {
    try {
      // isForget<Boolean> false: 修改密码 true: 忘记密码
      let { name, password, newPassword, isForget } = this.ctx.request.body
      const res = await this.ctx.service.user.modifyPassword({ name, password, newPassword, isForget: isForget ? true : false })
      this.success(res)
    } catch(err) {
      this.fail(err)
    }
  }
  // 登录
  async login() {
    try {
      const { name, password } = this.ctx.request.body
      const res = await this.ctx.service.user.login({ name, password })
      this.success(res)
    } catch(err) {
      this.fail(err)
    }
  }
  // 获取个人信息
  async search() {
    try {
      const { name } = this.ctx.query
      const res = await this.ctx.service.user.search({ name })
      this.success(res)
    } catch(err) {
      this.fail(err)
    }
  }
  // 更新个人信息
  async updateMyself() {
    try {
      const { name, description, age } = this.ctx.request.body
      const res = await this.ctx.service.user.updateInfo({ name, description, age })
      this.success(res)
    } catch(err) {
      this.fail(err)
    }
  }
}

module.exports = UserController