import passport from 'passport'
import LocalStrategy from 'passport-local'
import { User, Role } from './sequelize'

const strategyOptions = {
  passReqToCallback: true
  // failWithError: true
}

const configureAuth = () => {
  passport.use(
    'local-signup',
    new LocalStrategy(
      strategyOptions,
      async (req, username, password, done) => {
        try {
          let user = await User.findOne({
            where: {
              username
            }
          })

          if (user) return done(new Error('The username already exists'))

          const newUser = await User.register(username, password)

          return done(null, newUser)
        } catch (e) {
          done(e)
        }
      }
    )
  )

  passport.use(
    'local-login',
    new LocalStrategy(
      strategyOptions,
      async (req, username, password, done) => {
        try {
          let user = await User.findOne({
            where: {
              username
            }
          })

          // if no user is found, return the message
          if (!user) throw new Error("User with that email doesn't exists")

          user = await user.authenticate(password)

          return done(null, user)
        } catch (e) {
          done(e)
        }
      }
    )
  )

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, {
      include: [
        {
          model: Role
        }
      ]
    })
      .then(user => {
        done(null, user)
      })
      .catch(e => {
        done(e, false)
      })
  })
}

export default configureAuth
