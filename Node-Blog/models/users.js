const User = require('../lib/mongo').User

module.exports = {
  // 注册一个用户
  create: function create (user) {
    return User.create(user).exec()
  },
  getUserByName:function getUserByName(name){
    return User
      .findOne({name:name})
      .addCreateAt()
      .exec()
  }
}