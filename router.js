module.exports = function({router, controller}) {
  // 登录相关
  router.post('/user/register', controller.user.register)
  router.post('/user/logoff', controller.user.logOff)
  router.post('/user/edit', controller.user.edit) // 编辑账号
  router.post('/user/modifyPassword', controller.user.modifyPassword) // 修改密码
}