# Guia de Setup - Ambiente de Testes Clinix API

Este guia detalha a **configuração completa** do ambiente de testes, incluindo dependências, configurações, dados de teste e troubleshooting.

> **Nota:** Alguns itens mencionados podem não se aplicar neste momento, pois a documentação já está bastante completa e certas funcionalidades ainda não foram implementadas.  
> Caso novos recursos sejam adicionados, as instruções correspondentes serão atualizadas.

## Pré-requisitos

### Requisitos de Sistema
```yaml
Node.js: ">= 22.11.0 LTS"
NPM: ">= 10.9.0"  
Git: ">= 2.50.1"
RAM: ">= 16GB" 
# Storage: ">= 5GB free space"
# OS: "Windows 10+, macOS 12+, Ubuntu 20.04+"
```

### Ferramentas Necessárias
- **IDE:** VSCode (recomendado) com extensões:
  - REST Client
  - JavaScript/TypeScript
  <!-- - GitLens
  - ESLint -->
- **API Client:** Postman ou Insomnia (opcional)
<!-- - **Database:** PostgreSQL 14+ (se rodando localmente) -->

---

## Instalação Rápida

### 1. Clone e Configuração Inicial
```bash
# Clone do repositório
git clone https://github.com/rafaelzanella17/clinix-api-testing
cd clinix-api-testing

# Instalação de dependências
npm install

# Verificar versões
node --version  # >= 22.11.0
npm --version   # >= 10.9.0
```

### 2. Configuração de Ambiente 
```bash
# Copiar template de configuração
# cp .env.example .env

# Editar configurações (usar seu editor preferido)
# sudo nano .env 
```

### 3. Validação da Instalação
```bash
# Executar health check
# npm run health-check

# Teste rápido de conectividade
# npm run test:connectivity

# Executar smoke test
# npm run test:smoke
```

---

## Configurações Detalhadas

### Arquivo .env
```bash
# =================================
# CLINIX API - TEST ENVIRONMENT
# =================================

# API Configuration
# API_BASE_URL=https://api-test.clinix.com
# API_VERSION=v1
# API_TIMEOUT=5000

# Authentication
# JWT_SECRET=your-test-jwt-secret-here
# TOKEN_EXPIRY=24h
# REFRESH_TOKEN_EXPIRY=7d

# Rate Limiting
# RATE_LIMIT_REQUESTS=1000
# RATE_LIMIT_WINDOW=60000

# Database (se necessário)
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=clinix_test
# DB_USER=test_user
# DB_PASSWORD=test_password

# Test Data
# TEST_ADMIN_EMAIL=admin@clinix.com
# TEST_ADMIN_PASSWORD=clinix123
# TEST_PHARMACIST_EMAIL=farmaceutico@clinix.com
# TEST_PHARMACIST_PASSWORD=clinix123
# TEST_USER_EMAIL=usuario@clinix.com
# TEST_USER_PASSWORD=clinix123

# Logging
# LOG_LEVEL=info
# LOG_FILE=./logs/test-execution.log

# Reports
# REPORT_PATH=./reports
# EVIDENCE_PATH=./evidence
# MOCHAWESOME_OUTPUT=./reports/mochawesome

# Performance Testing
# K6_VUS=10
# K6_DURATION=30s
# K6_THRESHOLDS_P95=500

# Notifications (opcional)
# SLACK_WEBHOOK_URL=https://hooks.slack.com/your-webhook
# EMAIL_NOTIFICATIONS=false

# Debug
# DEBUG_MODE=false
# VERBOSE_LOGGING=false
# SCREENSHOT_ON_FAILURE=true
```

### Package.json - Scripts Principais
<!-- ```json
{
  "scripts": {
    "test": "mocha 'tests/**/*.spec.js' --timeout 10000",
    "test:auth": "mocha 'tests/auth/*.spec.js'",
    "test:users": "mocha 'tests/users/*.spec.js'", 
    "test:medicines": "mocha 'tests/medicines/*.spec.js'",
    "test:stock": "mocha 'tests/stock/*.spec.js'",
    "test:patients": "mocha 'tests/patients/*.spec.js'",
    "test:reports": "mocha 'tests/reports/*.spec.js'",
    "test:security": "mocha 'tests/security/*.spec.js'",
    "test:e2e": "mocha 'tests/e2e/*.spec.js' --timeout 30000",
    
    "test:smoke": "mocha 'tests/smoke/*.spec.js'",
    "test:regression": "npm run test",
    "test:quick": "mocha 'tests/**/*.spec.js' --grep '@quick'",
    
    "test:report": "mocha 'tests/**/*.spec.js' --reporter mochawesome --reporter-options reportDir=reports,reportFilename=test-results",
    "test:coverage": "nyc npm run test",
    
    "perf:load": "k6 run tests/performance/load-test.js",
    "perf:stress": "k6 run tests/performance/stress-test.js",
    "perf:spike": "k6 run tests/performance/spike-test.js",
    
    "setup": "npm run setup:env && npm run setup:data",
    "setup:env": "node scripts/setup-environment.js",
    "setup:data": "node scripts/seed-test-data.js",
    
    "clean": "rimraf reports logs evidence node_modules/.cache",
    "clean:reports": "rimraf reports/*",
    "clean:evidence": "rimraf evidence/*",
    
    "health-check": "node scripts/health-check.js",
    "validate-env": "node scripts/validate-environment.js",
    
    "lint": "eslint tests/ --fix",
    "format": "prettier --write tests/ docs/",
    
    "ci": "npm run lint && npm run test:report && npm run perf:load",
    "ci:full": "npm run setup && npm run ci && npm run test:security"
  }
}
``` -->

---

## Dependências e Versões

### Dependencies Principais
<!-- ```json
{
  "dependencies": {
    "mocha": "^10.2.0",
    "chai": "^4.3.7", 
    "supertest": "^6.3.3",
    "mochawesome": "^7.1.3",
    "dotenv": "^16.0.3",
    "axios": "^1.3.4",
    "jsonwebtoken": "^9.0.0",
    "moment": "^2.29.4",
    "faker": "^6.6.6",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "eslint": "^8.36.0",
    "prettier": "^2.8.4",
    "nyc": "^15.1.0",
    "rimraf": "^4.4.0",
    "husky": "^8.0.3",
    "lint-staged": "^13.2.0"
  }
} -->
```

### Instalação de Ferramentas Globais
<!-- ```bash
# k6 para testes de performance
# MacOS
brew install k6

# Linux (Ubuntu/Debian)
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6

# Windows
choco install k6

# Postman CLI (opcional)
npm install -g @postman/cli
``` -->

---

## Estrutura de Diretórios

<!-- ```
clinix-api-tests/
├── 📁 tests/
│   ├── 📁 auth/              # Testes de autenticação
│   │   ├── login.spec.js
│   │   ├── register.spec.js
│   │   └── profile.spec.js
│   ├── 📁 users/             # Testes CRUD usuários
│   │   ├── create.spec.js
│   │   ├── list.spec.js
│   │   ├── update.spec.js
│   │   └── delete.spec.js
│   ├── 📁 medicines/         # Testes medicamentos
│   ├── 📁 stock/            # Testes estoque
│   ├── 📁 patients/         # Testes pacientes
│   ├── 📁 reports/          # Testes relatórios
│   ├── 📁 security/         # Testes segurança
│   ├── 📁 performance/      # Testes k6
│   ├── 📁 e2e/             # Testes end-to-end
│   └── 📁 smoke/           # Smoke tests
├── 📁 utils/
│   ├── api-client.js        # Cliente HTTP
│   ├── test-data.js         # Dados de teste
│   ├── auth-helper.js       # Helpers autenticação
│   └── assertions.js        # Assertions customizadas
├── 📁 scripts/
│   ├── setup-environment.js # Setup inicial
│   ├── seed-test-data.js   # Popular dados
│   ├── health-check.js     # Verificar API
│   └── cleanup.js          # Limpeza ambiente
├── 📁 configs/
│   ├── mocha.config.js     # Configuração Mocha
│   ├── eslint.config.js    # Linting rules
│   └── k6.config.js        # Performance config
├── 📁 reports/             # Relatórios gerados
├── 📁 evidence/            # Evidências execução
├── 📁 logs/               # Logs de execução
├── 📁 docs/               # Documentação
├── .env                   # Configurações ambiente
├── .env.example          # Template configurações
├── package.json          # Dependências
└── README.md            # Guia principal
``` -->

---

## Dados de Teste

### Script de Setup de Dados
<!-- ```javascript
// scripts/seed-test-data.js
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

async function seedTestData() {
  console.log('Iniciando seed de dados de teste...');
  
  try {
    // 1. Verificar conexão com API
    await healthCheck();
    
    // 2. Criar usuários base (se não existirem)
    await createBaseUsers();
    
    // 3. Criar medicamentos de teste
    await createTestMedicines();
    
    // 4. Criar pacientes de teste
    await createTestPatients();
    
    // 5. Movimentações de estoque iniciais
    await createStockMovements();
    
    console.log('Seed de dados concluído com sucesso!');
    
  } catch (error) {
    console.error('Erro no seed de dados:', error.message);
    process.exit(1);
  }
}

async function healthCheck() {
  const response = await axios.get(`${process.env.API_BASE_URL}/health`);
  if (response.status !== 200) {
    throw new Error('API não está respondendo');
  }
  console.log('API Health Check: OK');
}

async function createBaseUsers() {
  const users = [
    {
      name: 'Administrador Sistema',
      email: 'admin@clinix.com',
      password: 'clinix123',
      role: 'admin'
    },
    {
      name: 'Farmacêutico Principal', 
      email: 'farmaceutico@clinix.com',
      password: 'clinix123',
      role: 'pharmacist'
    },
    {
      name: 'Usuário Comum',
      email: 'usuario@clinix.com', 
      password: 'clinix123',
      role: 'user'
    }
  ];
  
  // Login como admin para criar outros usuários
  const adminLogin = await axios.post(`${process.env.API_BASE_URL}/auth/login`, {
    email: 'admin@clinix.com',
    password: 'clinix123'
  });
  
  const token = adminLogin.data.token;
  
  for (const user of users) {
    try {
      await axios.post(`${process.env.API_BASE_URL}/auth/register`, user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`Usuário criado: ${user.email}`);
    } catch (error) {
      if (error.response?.status === 409) {
        console.log(`Usuário já existe: ${user.email}`);
      } else {
        throw error;
      }
    }
  }
}

async function createTestMedicines() {
  const medicines = [
    { name: 'Paracetamol 500mg', code: 'PAR500', category: 'Analgésico' },
    { name: 'Dipirona 500mg', code: 'DIP500', category: 'Analgésico' },
    { name: 'Amoxicilina 500mg', code: 'AMX500', category: 'Antibiótico' },
    { name: 'Ibuprofeno 600mg', code: 'IBU600', category: 'Anti-inflamatório' },
    { name: 'Dexametasona 4mg', code: 'DEX004', category: 'Corticoide' }
  ];
  
  // Login como admin
  const adminLogin = await axios.post(`${process.env.API_BASE_URL}/auth/login`, {
    email: 'admin@clinix.com',
    password: 'clinix123'  
  });
  
  const token = adminLogin.data.token;
  
  for (const medicine of medicines) {
    try {
      await axios.post(`${process.env.API_BASE_URL}/medicines`, medicine, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`Medicamento criado: ${medicine.name}`);
    } catch (error) {
      if (error.response?.status === 409) {
        console.log(`Medicamento já existe: ${medicine.name}`);
      } else {
        throw error;
      }
    }
  }
}

// Execute seed se chamado diretamente
if (require.main === module) {
  seedTestData();
}

module.exports = { seedTestData };
``` -->

### Dados de Teste Estruturados
<!-- ```javascript
// utils/test-data.js
const faker = require('faker');

class TestDataGenerator {
  // Usuários predefinidos
  static get baseUsers() {
    return {
      admin: {
        email: 'admin@clinix.com',
        password: 'clinix123',
        role: 'admin',
        name: 'Admin Sistema'
      },
      pharmacist: {
        email: 'farmaceutico@clinix.com', 
        password: 'clinix123',
        role: 'pharmacist',
        name: 'João Farmacêutico'
      },
      user: {
        email: 'usuario@clinix.com',
        password: 'clinix123', 
        role: 'user',
        name: 'Maria Usuária'
      }
    };
  }
  
  // Gerar usuário aleatório
  static generateUser(role = 'user') {
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: 'senha123',
      role: role,
      phone: faker.phone.phoneNumber -->
