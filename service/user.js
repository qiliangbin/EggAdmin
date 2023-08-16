const Service = require('./base')

class UserService extends Service {
  async register({ name, password, age, role }) {
    const { model: { User } } = this.ctx
    if(!name || !password || !role) {
      return { status: false, msg: '有必填项为空' }
    }
    const isRepeat = await this._findOne('User', 'name', name)
    if(isRepeat) {
      return { status: false, msg: '用户名已存在' }
    } else {
      const res = await User.create({name, password, age, role})
      return { status: true, msg: {} }
    }
  }

  async del({name}) {
    const { model: {User} } = this.ctx
    const res = await User.destroy({
      where: {
        name
      }
    })
    return res > 0
  }
  // 修改个人信息
  async edit(params) {
    const { model: { User } } = this.ctx
    const { name } = params
    const res = await User.update({ ...params }, {
      where: {
        name
      }
    })
    return res
  }
  // 修改密码
  async modifyPassword({name, password, newPassword, isForget}) {
    if((!newPassword || !password) && isForget) {
      return this.setStatus(false, '密码不能为空')
    }
    const isRepeat = await this._findOne('User', 'name', name)
    if(isRepeat) {
      if(isRepeat.password !== password && isForget) {
        return this.setStatus(false, '原密码错误')
      }
      if(isRepeat.password === newPassword) {
        return this.setStatus(false, '新密码不能与老密码相同')
      }
      return await this.ctx.model.User.update({password: newPassword}, {
        where: {
          name
        }
      })
    } else {
      return this.setStatus(false, '账号不存在')
    }
  }
  // 登录
  async login({ name, password }) {
    const isRepeat = await this._findOne('User', 'name', name)
    if(isRepeat) {
      if(isRepeat.password !== password) {
        return this.setStatus(false, '密码不正确')
      }
      // 获取token
      const token = this.app.jwt.sign({
        name,
      }, this.app.config.jwt.secret)
      return this.setStatus(true, {token, data: isRepeat})
    } else {
      return this.setStatus(false, '账号不存在')
    }
  }
  // 查询个人信息
  async search({ name }) {
    if(!name) return this.setStatus(false, '用不存在')
    const userInfo = await this._findOne('User', 'name', name)
    return userInfo
  }
  // 更新个人信息
  async updateInfo({name, description, age}) {
    if(!name) return this.setStatus(false, '用不存在')
    const res = await this.ctx.model.User.update({description, age}, {
      where: {
        name
      }
    })
    return res
  }

  setStatus(status, msg) {
    return {status, msg}
  }
}

module.exports = UserService