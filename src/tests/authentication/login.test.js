import { expect } from 'chai'

import { apiAuthenticationLogin } from '../../helpers/common.js'
import { expectLoginSuccess, expectAuthError, expectValidationError } from '../../helpers/expects.js'
import users from '../../fixtures/users.json' with { type: 'json' }
import { config } from '../../config/environment.js'

const emailAdmin = users.admin.email
const emailFarmaceutico = users.farmaceutico.email
const emailUsuario = users.usuario.email
const password = config.defaultPassword




describe('Login de Usuário', () => {

  describe('Admin', () => {
    it('Deve autenticar com sucesso usando credenciais válidas', async () => {
      const resposta = await apiAuthenticationLogin(emailAdmin, password)

      expectLoginSuccess(resposta, { customValidations: (res) => {
          expect(res.body.data.user.type).to.equal('ADMIN')
        }
      })
    })
  })

  describe('Farmacêutico', () => {
      it('Deve autenticar farmacêutico com credenciais válidas', async () => {
      const resposta = await apiAuthenticationLogin(emailFarmaceutico, password)

      expectLoginSuccess(resposta, { customValidations: (res) => {
          expect(res.body.data.user.type).to.equal('FARMACEUTICO')
        }
      })
    })
  })

  describe('Usuário comum', () => {
      it('Deve autenticar usuário comum com credenciais válidas', async () => {
      const resposta = await apiAuthenticationLogin(emailUsuario, password)

      expectLoginSuccess(resposta, { customValidations: (res) => {
          expect(res.body.data.user.type).to.equal('USUARIO')
        }
      })
    })
  })

})