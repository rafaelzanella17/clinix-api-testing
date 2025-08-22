# Template de Bug Report - Clinix API

Use este template para reportar bugs de forma padronizada e completa, facilitando a análise e correção pela equipe de desenvolvimento. 

---

## Informações Básicas

**ID do Bug:** BUG-XXX *(preenchido automaticamente)*  
**Título:** [Descrição concisa e clara do problema]  
**Data de Descoberta:** ${new Date().toLocaleDateString('pt-BR')}  
**Reportado por:** [Nome do testador]  
**Módulo:** [Authentication/Users/Medicines/Stock/Patients/Reports/Security]  
**Versão da API:** [v0.1, v0.2, etc.]  
**Ambiente:** [Test/Staging/Production]  

---

## Classificação

### Severidade
- [ ] **Critical** - Sistema não funciona, dados corrompidos, falha de segurança
- [ ] **High** - Funcionalidade principal não funciona, workaround disponível
- [ ] **Medium** - Funcionalidade secundária afetada, impacto moderado
- [ ] **Low** - Problema cosmético, sugestão de melhoria

### Prioridade
- [ ] **P1** - Fix imediato necessário
- [ ] **P2** - Fix na próxima release
- [ ] **P3** - Fix quando possível
- [ ] **P4** - Backlog para versão futura

### Tipo
- [ ] Functional Bug
- [ ] Performance Issue
- [ ] Security Vulnerability  
- [ ] UI/UX Problem
- [ ] Integration Issue
- [ ] Data Integrity
- [ ] Configuration Error

---

## Detalhes do Bug

### Descrição Detalhada
```
Descreva o problema claramente:
- O que você estava tentando fazer?
- O que aconteceu?
- Qual era o comportamento esperado?
```

### Ambiente de Execução
```yaml
API Base URL: [https://api-test.clinix.com]
Browser/Client: [Postman/curl/Automated Test]
Operating System: [Windows/macOS/Linux]
Node.js Version: [se aplicável]
Database: [PostgreSQL version]
```

### Caso de Teste Relacionado
- **ID:** TC-XXX
- **Nome:** [Nome do caso de teste que falhou]
- **Módulo:** [Módulo específico]

---

## Reprodução

### Pré-condições
```
Liste todas as condições necessárias antes de reproduzir:
1. [Condição 1]
2. [Condição 2]
3. [Condição 3]
```

### Passos para Reproduzir
```
1. [Passo detalhado 1]
2. [Passo detalhado 2]
3. [Passo detalhado 3]
4. [Resultado obtido]
```

### Dados de Teste Utilizados
```json
{
  "input_data": {
    "email": "test@example.com",
    "password": "test123",
    "role": "user"
  },
  "expected_output": {
    "status": 200,
    "success": true
  },
  "actual_output": {
    "status": 500,
    "error": "Internal Server Error"
  }
}
```

---

## Evidências

### Request/Response
```http
POST /api/auth/login HTTP/1.1
Host: api-test.clinix.com
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}

HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "success": false,
  "message": "Internal Server Error",
  "error": "Database connection failed"
}
```

### Logs de Sistema
```
[2024-01-15 14:30:45] ERROR: Database connection timeout
[2024-01-15 14:30:45] ERROR: Query failed: SELECT * FROM users WHERE email = $1
[2024-01-15 14:30:45] ERROR: TypeError: Cannot read property 'id' of undefined
```

### Screenshots/Anexos
- [ ] Screenshot do erro: [link ou anexo]
- [ ] Arquivo de log completo: [anexo]
- [ ] Dump do banco de dados: [se aplicável]
- [ ] Network trace: [se aplicável]

---

## Análise Técnica

### Possível Causa Raiz
```
Com base na análise inicial:
- [Hipótese 1: Problema de conexão com BD]
- [Hipótese 2: Timeout na query]
- [Hipótese 3: Validação de dados falhando]
```

### Componentes Afetados
- [ ] API Endpoint: [/api/auth/login]
- [ ] Database: [users table]
- [ ] Authentication Service
- [ ] Validation Middleware
- [ ] Error Handler

### Impacto Estimado
```
Usuários Afetados: [Todos/Admin/Farmacêuticos/etc]
Funcionalidades Impactadas: [Login, autenticação, etc]
Workaround Disponível: [Sim/Não - descrever se sim]
```

---

## Workaround Temporário

### Solução Alternativa
```
Se existe um workaround temporário:
1. [Passo 1 do workaround]
2. [Passo 2 do workaround]
3. [Resultado esperado]

Limitações do workaroun
