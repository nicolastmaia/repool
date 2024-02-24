import { Express, Router } from 'express'
import { Users, Subscribers, Owners, Admin } from './routes'
import { verifyJWT, verifyRole, verifyAdmin, testMiddleware } from './helpers'

export default (app: Express): void => {
  app.use('/test', testMiddleware)

  app.use('/user', Users)

  app.use(verifyJWT)
  app.use('/subscriber', Subscribers)

  app.use(verifyRole)
  app.use('/owner', Owners)

  app.use(verifyAdmin)
  app.use('/admin', Admin)
}
