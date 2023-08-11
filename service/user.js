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
    if(!newPassword || !password) {
      return this.setStatus(false, '密码不能为空')
    }
    const isRepeat = await this._findOne('User', 'name', name)
    if(isRepeat) {
      if(isRepeat.password !== password && !isForget) {
        return this.setStatus(false, '原密码错误')
      }
      if(isRepeat.password === newPassword && !isForget) {
        return this.setStatus(false, '新密码不能与老密码相同')
      }
      const { modle: { User } } = this.ctx
      const res = await User.update({password: newPassword}, {
        where: {
          name
        }
      })
      return res
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
      return this.setStatus(true, isRepeat)
    } else {
      return this.setStatus(false, '账号不存在')
    }
  }
  setStatus(status, msg) {
    return {status, msg}
  }
}

module.exports = UserService