module.exports = () => {
  return async function jwt(ctx, next) {
    const token = ctx.request.header.authorization
    if(token) {
      // 解密Token
      const secret = ctx.app.config.jwt.secret
      const result = ctx.app.jwt.verify(token, secret, async function(err, encoded) {
        if(err) {
          ctx.body = {
            code: 401,
            data: {
              success: false,
              data: {
                status: false,
                msg: 'token已过期'
              }
            }
          }
        } else {
          await next()
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