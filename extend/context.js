const moment = require('moment')
module.exports = {
  // 获取token
  getAccessToken() {
    return this.cookies.get('token', { signed: false });
  },
  formatTime(time, format) {
    return moment(time).format(format)
  },
  // 设置token
  setToken(data = {}) {
    const { app } = this
    const { name } = data
    const token = app.jwt.sign(data, app.config.jwt.secret, { expiresIn: '18h' })
    const cookieConfig = { maxAge: 1000 * 3600 * 24 * 7, httpOnly: false, overwrite: true, signed: false };

    this.cookies.set('token', token, { ...cookieConfig, httpOnly: true });
    this.cookies.set('name', name, cookieConfig);
  },
  // 清楚token
  clearToken() {
    this.cookies.set('token', null)
  },
  // 校验token
  async verifyToken() {
    const { app } = this
    const name = this.cookies.get('name', { signed: false })
    const token = this.getAccessToken(this)
    const verifyResult = await new Promise(resolve => {
      app.jwt.verify(token, app.config.jwt.secret, (err, decoded) => {
        if(err) {
          if(err.name === 'TokenExpiredError') {
            this.setToken({name})
            resolve({ verify: true, message: '验证成功' })
          } else {
            resolve({ verify: false, message: err.message })
          }
        } else {
          resolve({ verify: true, message: decoded });
        }
      })
    })
    if (!verifyResult.verify) {
      this.verifyFail(401, verifyResult.message);
      return false;
    }
    return true
  },
  // 校验token失败
  verifyFail(code, message) {
    this.body = { code, message };
    this.status = code;
  },
};