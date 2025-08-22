import 'dotenv/config'

const requiredEnvVars = ['BASE_URL', 'DEFAULT_PASSWORD']

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    throw new Error(`Variável de ambiente obrigatória não encontrada: ${envVar}`)
  }
})

export const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  defaultPassword: process.env.DEFAULT_PASSWORD
}
