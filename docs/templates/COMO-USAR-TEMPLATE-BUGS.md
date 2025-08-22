# Instruções de Uso - Template de Bug Report

## Como Reportar um Bug

Use este template para reportar bugs de forma padronizada e completa, facilitando a análise e correção pela equipe de desenvolvimento.

### **Processo Passo-a-Passo:**

1. **Copie todo o conteúdo** do arquivo `bug-report-template.md`
2. **Navegue** para a pasta correspondente ao módulo em `docs/templates/bugs/`
3. **Crie um novo arquivo** seguindo o padrão de nomenclatura
4. **Cole o template** e preencha todas as informações
5. **Salve o arquivo** com o nome correto

---

## **Padrão de Nomenclatura**

### **Formato Obrigatório:**
```
[ID]-api-[modulo]-[endpoint]-[metodo]-[descrição-curta].md
```

### **Rotas e Módulos Disponíveis:**
| Rota da API | Módulo a Usar | Exemplo |
|-------------|---------------|---------|
| `/api/health` | `health` | `001-api-health-status-get-...` |
| `/api/authentication` | `authentication` | `002-api-authentication-login-post-...` |
| `/api/users` | `users` | `003-api-users-profile-get-...` |
| `/api/medicines` | `medicines` | `004-api-medicines-search-get-...` |
| `/api/categories` | `categories` | `005-api-categories-create-post-...` |
| `/api/suppliers` | `suppliers` | `006-api-suppliers-update-put-...` |
| `/api/dashboard` | `dashboard` | `007-api-dashboard-metrics-get-...` |
| `/api/test` | `test` | `008-api-test-connection-get-...` |

### **Métodos HTTP:**
- `get`, `post`, `put`, `delete`, `patch`

### **ID Sequencial Global:**
- Use números sequenciais: `001`, `002`, `003`, etc.
- **Verificar o último número** usado em TODA a pasta bugs/
- Numeração é **global**, não por módulo

---

## **Exemplos Práticos**

### ** Nomes Corretos:**
```
001-api-health-status-get-response-timeout-5000ms.md
002-api-authentication-login-post-invalid-credentials-accepted.md
003-api-users-profile-get-missing-required-fields.md
004-api-medicines-search-get-filter-parameters-ignored.md
005-api-categories-create-post-duplicate-name-allowed.md
006-api-suppliers-update-put-validation-rules-bypassed.md
007-api-dashboard-metrics-get-data-calculation-wrong.md
008-api-test-connection-get-database-timeout-error.md
```

### ** Nomes Incorretos:**
```
bug-001-login-erro.md                              (sem padrão)
001-authentication-login-post-erro.md              (sem "api-")
1-api-authentication-login-post-erro.md            (ID sem zero)
001-API-AUTHENTICATION-LOGIN-POST-ERRO.md         (maiúscula)
001 api authentication login post erro.md         (espaços)
001-api-auth-login-post-erro.md                    (módulo abreviado)
```

---

## **Onde Salvar o Arquivo**

### **Estrutura de Pasta Única (RECOMENDADA):**
```
docs/templates/bugs/
├── 001-api-health-status-get-response-timeout-5000ms.md
├── 002-api-authentication-login-post-invalid-credentials.md
├── 003-api-users-profile-get-missing-required-fields.md
├── 004-api-medicines-search-get-filter-parameters-ignored.md
├── 005-api-categories-create-post-duplicate-name-allowed.md
├── 006-api-suppliers-update-put-validation-rules-bypassed.md
├── 007-api-dashboard-metrics-get-data-calculation-wrong.md
└── 008-api-test-connection-get-database-timeout-error.md
```

### **Vantagens da Pasta Única:**
- **Ordem cronológica** preservada (001, 002, 003...)
- **Numeração global** facilita relatórios
- **Busca simples** - todos os bugs em um local
- **Rastreabilidade temporal** - sabe qual bug foi descoberto primeiro

### **Como Buscar Bugs por Módulo:**
```bash
# Todos os bugs de authentication
ls docs/templates/bugs/ | grep "api-authentication"

# Todos os bugs de medicines
ls docs/templates/bugs/ | grep "api-medicines"

# Bugs do endpoint login
ls docs/templates/bugs/ | grep "authentication-login"
```

---

## **Regras Importantes**

### ** Fazer:**
- Usar sempre letras minúsculas
- Separar palavras com hífen (`-`)
- Verificar o último ID usado na pasta
- Preencher TODOS os campos do template
- Usar nomes descritivos mas concisos

### ** Não Fazer:**
- Usar espaços ou caracteres especiais
- Modificar o arquivo original `bug-report-template.md`
- Pular campos obrigatórios do template
- Usar IDs duplicados na mesma pasta
- Criar nomes muito longos (máximo 60 caracteres)

---

## **Como Determinar o Próximo ID**

### **Verificar último número usado (GLOBAL):**
```bash
# Listar TODOS os arquivos da pasta bugs
ls docs/templates/bugs/

# Resultado exemplo:
001-api-health-status-get-timeout.md
002-api-authentication-login-post-credentials.md
003-api-users-profile-get-missing-fields.md
004-api-authentication-register-post-email-duplicate.md
005-api-medicines-search-get-filter-broken.md

# Próximo ID seria: 006
```

### **Seu novo arquivo seria:**
```
006-api-[sua-rota]-[endpoint]-[metodo]-[sua-descrição].md
```

### ** Importante:**
- ID é **global** para todos os módulos
- **NÃO reinicie** a numeração por módulo
- Sempre use **3 dígitos**: 001, 002, 010, 100...

---

## **Checklist Antes de Salvar**

- [ ] Copiei o template completo?
- [ ] Estou salvando na pasta `docs/templates/bugs/`?
- [ ] O nome segue o padrão `[ID]-api-[modulo]-[endpoint]-[metodo]-[descrição].md`?
- [ ] Verifiquei o próximo ID **global** disponível?
- [ ] Usei o nome completo do módulo (não abreviado)?
- [ ] Inclui "api-" no nome?
- [ ] Preenchei todos os campos obrigatórios do template?
- [ ] O nome do arquivo tem menos de 70 caracteres?
- [ ] Usei apenas letras minúsculas e hífens?
- [ ] ID tem 3 dígitos (001, 002, etc.)?

---

## **Resultado Final**

Após seguir este processo, você terá:
```
docs/templates/
├── bug-report-template.md                          ← Template original (não modificar)
├── INSTRUCOES-USO.md                               ← Este arquivo de instruções  
└── bugs/
    ├── 001-api-health-status-get-timeout.md           ← Primeiro bug descoberto
    ├── 002-api-authentication-login-post-credentials.md
    ├── 003-api-users-profile-get-missing-fields.md
    └── 004-api-medicines-search-get-filter-broken.md  ← Bugs em ordem cronológica
```

### **Benefícios do Padrão Atualizado:**
- **Ordem cronológica** - Sabe qual bug foi descoberto primeiro
- **Rota completa** - `api-authentication-login` é mais claro
- **Relatórios fáceis** - Numeração global facilita análises  
- **Busca eficiente** - Pode filtrar por módulo usando grep
- **Escalabilidade** - Cresce organizado conforme projeto evolui

**Dúvidas?** Consulte a equipe de QA ou abra uma issue no repositório.