const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = app => {
  // 初始化 passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(null, false, req.flash('warning_msg', '此信箱尚未註冊!'))
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!giisMatch) {
        return done(null, false, req.flash('warning_msg', 'Emaill或密碼錯誤。'))
      }
      return done(null, user)
    } catch {
      error => done(error, false)
    }
  }))
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      done(null, user)
    } catch {
      error => done(error, null)
    }
  })
}