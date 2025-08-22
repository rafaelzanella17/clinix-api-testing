import { expect } from 'chai'

// Exportar expect para usar nas customValidations
export { expect }

/**
 * Função para validar respostas de sucesso na API
 * @param {Object} response - Resposta da API
 * @param {number} expectedStatusCode - Status code esperado (padrão: 200)
 * @param {Object} options - Opções de validação
 */

export function expectSuccess(response, expectedStatusCode = 200, options = {}) {
  const {
    shouldHaveToken = false,
    shouldHaveData = true,
    shouldHaveMessage = false,
    customValidations = null
  } = options

  // Validações básicas sempre presentes
  expect(response).to.have.property('statusCode')
  expect(response.statusCode).to.equal(expectedStatusCode)
  expect(response).to.have.property('body')
  expect(response.body).to.be.an('object')

  // Validação da estrutura do body
  if (shouldHaveData) {
    expect(response.body).to.have.property('data')
    expect(response.body.data).to.be.an('object')
  }

  // Validação do token (comum em login)
  if (shouldHaveToken) {
    expect(response.body.data).to.have.property('token')
    expect(response.body.data.token).to.be.a('string')
    expect(response.body.data.token).to.have.length.greaterThan(10) // Token não pode ser muito pequeno
  }

  // Validação de mensagem (se necessário)
  if (shouldHaveMessage) {
    expect(response.body).to.have.property('message')
    expect(response.body.message).to.be.a('string')
  }

  // Validações customizadas específicas
  if (customValidations && typeof customValidations === 'function') {
    customValidations(response)
  }
}

/**
 * Função para validar respostas de erro na API
 * @param {Object} response - Resposta da API
 * @param {number} expectedStatusCode - Status code esperado
 * @param {Object} options - Opções de validação
 */
export function expectError(response, expectedStatusCode, options = {}) {
  const {
    shouldHaveMessage = true,
    shouldHaveErrors = false,
    expectedMessage = null,
    shouldNotHaveToken = true,
    customValidations = null
  } = options

  // Validações básicas sempre presentes
  expect(response).to.have.property('statusCode')
  expect(response.statusCode).to.equal(expectedStatusCode)
  expect(response).to.have.property('body')
  expect(response.body).to.be.an('object')

  // Validação de mensagem de erro
  if (shouldHaveMessage) {
    expect(response.body).to.have.property('message')
    expect(response.body.message).to.be.a('string')
    
    if (expectedMessage) {
      expect(response.body.message).to.equal(expectedMessage)
    }
  }

  // Validação de array de erros (comum em validação de campos)
  if (shouldHaveErrors) {
    expect(response.body).to.have.property('errors')
    expect(response.body.errors).to.be.an('array')
    expect(response.body.errors).to.have.length.greaterThan(0)
  }

  // Garantir que não há token em respostas de erro
  if (shouldNotHaveToken && response.body.data) {
    expect(response.body.data).to.not.have.property('token')
  }

  // Validações customizadas específicas
  if (customValidations && typeof customValidations === 'function') {
    customValidations(response)
  }
}

/**
 * Função específica para validar login com sucesso
 * @param {Object} response - Resposta da API
 * @param {Object} options - Opções adicionais
 */
export function expectLoginSuccess(response, options = {}) {
  expectSuccess(response, 200, {
    shouldHaveToken: true,
    shouldHaveData: true,
    ...options,
    customValidations: (res) => {
      // Validações específicas do login
      if (res.body.data.user) {
        expect(res.body.data.user).to.be.an('object')
        expect(res.body.data.user).to.have.property('id')
        expect(res.body.data.user).to.have.property('email')
      }
      
      // Se houver validações customizadas passadas, executar também
      if (options.customValidations) {
        options.customValidations(res)
      }
    }
  })
}

/**
 * Função específica para validar erros de autenticação
 * @param {Object} response - Resposta da API
 * @param {number} statusCode - Status code esperado (401, 403, etc.)
 * @param {Object} options - Opções adicionais
 */
export function expectAuthError(response, statusCode = 401, options = {}) {
  expectError(response, statusCode, {
    shouldHaveMessage: true,
    shouldNotHaveToken: true,
    ...options
  })
}

/**
 * Função específica para validar erros de validação (400)
 * @param {Object} response - Resposta da API
 * @param {Object} options - Opções adicionais
 */
export function expectValidationError(response, options = {}) {
  expectError(response, 400, {
    shouldHaveMessage: true,
    shouldHaveErrors: true,
    ...options
  })
}