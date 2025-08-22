import request from 'supertest'

import { config } from '../config/environment.js'

const { baseUrl } = config



export const apiAuthenticationLogin = async (email, password) => {
  const resposta = await request(baseUrl)
  .post('/api/authentication/login')
  .set('Content-Type', 'application/json')
  .send({ "email": email, "password": password })

  return resposta
}


