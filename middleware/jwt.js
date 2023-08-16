module.exports = () => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization
    if(token) {
      // 解密Token
      const secret = ctx.app.config.jwt.secret
      const result = ctx.app.jwt.verify(token, secret, function(err, encoded) {
        if(err) {
          ctx.body = {
            verify: false,
            message: err.message
          }
        } else {
          ctx.body = {
            verify: true,
            message: encoded
          }
        }
      })
      return result
    } else {
      ctx.status = 200;
      ctx.body = {
        status: 401,
        msg: 'token不存在'
      };
    }
  }
}