module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('b_user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    password: STRING,
    avatar: STRING,
    role: INTEGER,
    birthday: DATE,
    sex: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    delete_at: DATE,
    description: STRING,
  })
  return User
}