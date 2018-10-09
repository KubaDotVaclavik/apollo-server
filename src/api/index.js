import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.post('/register', passport.authenticate('local-signup'), (req, res) => {
  if (req.user) {
    res.json(req.user)
  } else {
    res.status(401).send('Unauthorized')
  }
})

router.post('/login', passport.authenticate('local-login'), (req, res) => {
  if (req.user) {
    res.json(req.user)
  } else {
    res.status(401).send('Unauthorized')
  }
})

export default router
