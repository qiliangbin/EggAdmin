module.exports = function(app) {
  const {router, controller, middleware} = app
  // 引入
  const jwt = middleware.jwt()
  // 登录相关
  router.post('/user/login', controller.user.login)
  router.post('/user/register', controller.user.register)
  router.post('/user/logoff', controller.user.logOff)
  router.post('/user/edit', controller.user.edit) // 编辑账号
  router.post('/user/modifyPassword', controller.user.modifyPassword) // 修改密码
  router.post('/user/updateMyself', jwt, controller.user.updateMyself)

  router.get('/user/myself', jwt, controller.user.search) // 获取本人信息
}