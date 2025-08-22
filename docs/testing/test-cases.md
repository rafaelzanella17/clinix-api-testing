# Casos de Teste - Clinix API

Este documento detalha **todos os casos de teste** organizados por módulo e versão, seguindo template padronizado e cobrindo cenários positivos, negativos e edge cases.

## Template de Caso de Teste

```yaml
ID: [Identificador único]
Módulo: [Authentication/Users/Medicines/etc]
Versão: [v0.1, v0.2, etc]
Prioridade: [Alta/Média/Baixa]
Tipo: [Funcional/Performance/Segurança]

Título: [Descrição concisa do que está sendo testado]

Pré-condições:
- [Condição 1]
- [Condição 2]

Passos:
1. [Ação 1]
2. [Ação 2]
3. [Ação 3]

Resultado Esperado:
- [Validação 1]
- [Validação 2]

Dados de Teste:
- Input: [dados específicos]
- Output: [response esperado]

Critérios de Aceitação:
- [Critério 1]
- [Critério 2]
```

---

## v0.1 - Authentication

### Cenários de Login

#### TC-001: Login Admin Válido
```yaml
ID: TC-001
Módulo: Authentication  
Versão: v0.1
Prioridade: Alta
Tipo: Funcional

Título: Validar login bem-sucedido para usuário Admin

Pré-condições:
- API disponível e acessível
- Usuário admin@clinix.com existe na base
- Senha padrão "clinix123" configurada

Passos:
1. Enviar POST /api/auth/login
2. Body: {"email": "admin@clinix.com", "password": "clinix123"}
3. Verificar response status e payload

Resultado Esperado:
- Status Code: 200 OK
- Response contém: {"token": "jwt_token", "role": "admin", "email": "admin@clinix.com"}
- Token JWT válido e não expirado
- Headers Content-Type: application/json

Dados de Teste:
- Input: {"email": "admin@clinix.com", "password": "clinix123"}
- Output: {"success": true, "token": "eyJ0eXAiOiJKV1QiLCJhbGc...", "user": {...}}

Critérios de Aceitação:
- Response time < 200ms
- Token válido por 24h
- Role = "admin" no payload
```

#### TC-002: Login Farmacêutico Válido
```yaml
ID: TC-002
Módulo: Authentication
Versão: v0.1
Prioridade: Alta
Tipo: Funcional

Título: Validar login bem-sucedido para usuário Farmacêutico

Pré-condições:
- API disponível
- Usuário farmaceutico@clinix.com existe

Passos:
1. POST /api/auth/login
2. Body: {"email": "farmaceutico@clinix.com", "password": "clinix123"}
3. Validar response

Resultado Esperado:
- Status: 200 OK
- Token JWT presente
- Role: "pharmacist"
- Email correto no response

Dados de Teste:
- Input: {"email": "farmaceutico@clinix.com", "password": "clinix123"}
- Output: {"success": true, "token": "jwt_token", "user": {"role": "pharmacist"}}

Critérios de Aceitação:
- Response time < 200ms
- Token JWT válido
- Permissões de farmacêutico ativas
```

#### TC-003: Login Usuário Comum Válido
```yaml
ID: TC-003
Módulo: Authentication
Versão: v0.1
Prioridade: Alta
Tipo: Funcional

Título: Validar login bem-sucedido para usuário comum

Pré-condições:
- API disponível
- Usuário usuario@clinix.com existe

Passos:
1. POST /api/auth/login
2. Body: {"email": "usuario@clinix.com", "password": "clinix123"}
3. Validar response e permissões

Resultado Esperado:
- Status: 200 OK
- Token JWT presente
- Role: "user"
- Permissões limitadas aplicadas

Dados de Teste:
- Input: {"email": "usuario@clinix.com", "password": "clinix123"}
- Output: {"success": true, "token": "jwt_token", "user": {"role": "user"}}

Critérios de Aceitação:
- Response time < 200ms
- Token válido por 24h
- Acesso apenas a recursos públicos
```

### Cenários Negativos - Login

#### TC-004: Login com Credenciais Inválidas
```yaml
ID: TC-004
Módulo: Authentication
Versão: v0.1
Prioridade: Alta
Tipo: Funcional (Negativo)

Título: Validar falha de login com credenciais incorretas

Pré-condições:
- API disponível
- Credenciais inválidas serão utilizadas

Passos:
1. POST /api/auth/login
2. Body: {"email": "admin@clinix.com", "password": "senha_errada"}
3. Verificar response de erro

Resultado Esperado:
- Status Code: 401 Unauthorized
- Response: {"success": false, "message": "Credenciais inválidas"}
- Sem token no response
- Rate limiting aplicado (se implementado)

Dados de Teste:
- Input: {"email": "admin@clinix.com", "password": "senha_errada"}
- Output: {"success": false, "error": "Invalid credentials"}

Critérios de Aceitação:
- Erro específico retornado
- Sem vazamento de informações
- Log de tentativa registrado
```

#### TC-005: Login com Email Inexistente
```yaml
ID: TC-005
Módulo: Authentication
Versão: v0.1
Prioridade: Média
Tipo: Funcional (Negativo)

Título: Validar falha de login com email não cadastrado

Pré-condições:
- API disponível
- Email não existe na base

Passos:
1. POST /api/auth/login
2. Body: {"email": "inexistente@clinix.com", "password": "clinix123"}
3. Verificar response de erro

Resultado Esperado:
- Status: 401 Unauthorized
- Message genérica (segurança)
- Sem exposição de dados internos

Dados de Teste:
- Input: {"email": "inexistente@clinix.com", "password": "clinix123"}
```

#### TC-006: Login com Campos Obrigatórios Vazios
```yaml
ID: TC-006
Módulo: Authentication
Versão: v0.1
Prioridade: Média
Tipo: Funcional (Validação)

Título: Validar erro com campos obrigatórios em branco

Cenários:
a) Email vazio
b) Password vazio  
c) Ambos vazios

Passos:
1. POST /api/auth/login
2. Body com campos vazios
3. Validar response de erro

Resultado Esperado:
- Status: 400 Bad Request
- Validation errors detalhados
- Campos obrigatórios identificados

Dados de Teste:
- Input: {"email": "", "password": "clinix123"}
- Output: {"success": false, "errors": [{"field": "email", "message": "Email é obrigatório"}]}
```

### Cenários de Profile

#### TC-007: Buscar Perfil Autenticado (Admin)
```yaml
ID: TC-007
Módulo: Authentication
Versão: v0.1
Prioridade: Alta
Tipo: Funcional

Título: Recuperar perfil de usuário Admin autenticado

Pré-condições:
- Usuário Admin logado
- Token JWT válido disponível

Passos:
1. Fazer login como Admin (TC-001)
2. Capturar token do response
3. GET /api/auth/profile com Authorization header
4. Validar dados do perfil

Resultado Esperado:
- Status: 200 OK
- Dados completos do usuário
- Role, permissions incluídos
- Dados sensíveis omitidos

Dados de Teste:
- Headers: {"Authorization": "Bearer jwt_token"}
- Output: {"id": 1, "email": "admin@clinix.com", "role": "admin", "permissions": [...]}

Critérios de Aceitação:
- Todos os campos esperados presentes
- Password não retornado
- Timestamps formatados corretamente
```

#### TC-008: Buscar Perfil sem Token
```yaml
ID: TC-008
Módulo: Authentication
Versão: v0.1
Prioridade: Alta
Tipo: Segurança (Negativo)

Título: Validar bloqueio de acesso sem autenticação

Pré-condições:
- API disponível
- Requisição sem Authorization header

Passos:
1. GET /api/auth/profile
2. Sem header Authorization
3. Verificar response de erro

Resultado Esperado:
- Status: 401 Unauthorized
- Message: "Token não fornecido" ou similar
- Sem dados do usuário retornados

Dados de Teste:
- Headers: {} (vazio)
- Output: {"success": false, "message": "Authorization token required"}

Critérios de Aceitação:
- Acesso negado imediatamente
- Message de erro não específica demais
- Security headers presentes
```

#### TC-009: Buscar Perfil com Token Inválido
```yaml
ID: TC-009
Módulo: Authentication
Versão: v0.1
Prioridade: Alta
Tipo: Segurança (Negativo)

Título: Validar rejeição de token inválido/expirado

Pré-condições:
- Token malformado ou expirado disponível

Cenários:
a) Token malformado
b) Token expirado
c) Token com assinatura inválida

Passos:
1. GET /api/auth/profile
2. Header: Authorization: Bearer [token_inválido]
3. Verificar rejeição

Resultado Esperado:
- Status: 401 Unauthorized
- Message: "Token inválido"
- Log de tentativa suspeita

Dados de Teste:
- Headers: {"Authorization": "Bearer token_invalido_123"}
- Output: {"success": false, "message": "Invalid or expired token"}
```

---

## v0.2 - Authentication (Registro)

#### TC-010: Registro de Novo Usuário (Admin)
```yaml
ID: TC-010
Módulo: Authentication
Versão: v0.2
Prioridade: Alta
Tipo: Funcional

Título: Admin registra novo usuário com sucesso

Pré-condições:
- Admin autenticado
- Email único para registro
- Dados válidos disponíveis

Passos:
1. Login como Admin (obter token)
2. POST /api/auth/register
3. Headers: Authorization Bearer token
4. Body: dados do novo usuário
5. Verificar criação

Resultado Esperado:
- Status: 201 Created
- Novo usuário criado
- Dados retornados (sem senha)
- Email de confirmação enviado (se implementado)

Dados de Teste:
- Headers: {"Authorization": "Bearer admin_token"}
- Input: {"email": "novo@clinix.com", "password": "senha123", "role": "user", "name": "Novo Usuario"}
- Output: {"success": true, "user": {"id": X, "email": "novo@clinix.com", "role": "user"}}

Critérios de Aceitação:
- Usuário salvo no banco
- Password hasheado
- Role aplicado corretamente
```

#### TC-011: Registro com Email Duplicado
```yaml
ID: TC-011
Módulo: Authentication
Versão: v0.2
Prioridade: Alta
Tipo: Funcional (Negativo)

Título: Falha ao registrar usuário com email existente

Pré-condições:
- Admin autenticado
- Email já existe na base

Passos:
1. Login como Admin
2. POST /api/auth/register
3. Body com email já cadastrado
4. Verificar erro de conflito

Resultado Esperado:
- Status: 409 Conflict
- Message: "Email já está em uso"
- Nenhum usuário duplicado criado

Dados de Teste:
- Input: {"email": "admin@clinix.com", "password": "nova123", "role": "user"}
- Output: {"success": false, "message": "Email already exists"}

Critérios de Aceitação:
- Validation precisa
- Banco de dados íntegro
- Error message clara
```

#### TC-012: Registro por Usuário Não-Admin
```yaml
ID: TC-012
Módulo: Authentication
Versão: v0.2
Prioridade: Alta
Tipo: Segurança (Negativo)

Título: Bloquear registro quando usuário não é Admin

Pré-condições:
- Usuário comum ou farmacêutico logado
- Tentativa de criar novo usuário

Passos:
1. Login como user comum
2. POST /api/auth/register
3. Dados válidos no body
4. Verificar bloqueio por permissão

Resultado Esperado:
- Status: 403 Forbidden
- Message: "Acesso negado"
- Nenhum usuário criado

Dados de Teste:
- Headers: {"Authorization": "Bearer user_token"}
- Input: {"email": "teste@clinix.com", "password": "123", "role": "user"}
- Output: {"success": false, "message": "Insufficient permissions"}

Critérios de Aceitação:
- Autorização corretamente implementada
- Role-based access control funcionando
- Logs de tentativa não autorizada
```

---

## v0.3 - Users (CRUD)

### Listar Usuários

#### TC-013: Listar Todos os Usuários (Admin)
```yaml
ID: TC-013
Módulo: Users
Versão: v0.3
Prioridade: Alta
Tipo: Funcional

Título: Admin lista todos os usuários cadastrados

Pré-condições:
- Admin autenticado
- Pelo menos 3 usuários na base (admin, farmacêutico, usuário)

Passos:
1. Login como Admin
2. GET /api/users
3. Headers: Authorization Bearer token
4. Verificar lista completa

Resultado Esperado:
- Status: 200 OK
- Array com todos os usuários
- Dados completos (exceto senha)
- Paginação aplicada (se implementada)

Dados de Teste:
- Headers: {"Authorization": "Bearer admin_token"}
- Output: {"success": true, "users": [{"id": 1, "email": "admin@clinix.com", "role": "admin"}, ...], "total": 3}

Critérios de Aceitação:
- Todos os usuários retornados
- Performance adequada (< 200ms)
- Dados consistentes
```

#### TC-014: Usuário Comum Tenta Listar Usuários
```yaml
ID: TC-014
Módulo: Users
Versão: v0.3
Prioridade: Alta
Tipo: Segurança (Negativo)

Título: Bloquear listagem para usuário sem permissão

Pré-condições:
- Usuário comum autenticado
- Endpoint de listagem disponível

Passos:
1. Login como usuário comum
2. GET /api/users
3. Verificar bloqueio de acesso

Resultado Esperado:
- Status: 403 Forbidden
- Acesso negado
- Nenhum dado de usuário vazado

Dados de Teste:
- Headers: {"Authorization": "Bearer user_token"}
- Output: {"success": false, "message": "Access denied"}
```

### Criar Usuário

#### TC-015: Criar Usuário Válido (Admin)
```yaml
ID: TC-015
Módulo: Users
Versão: v0.3
Prioridade: Alta
Tipo: Funcional

Título: Admin cria novo usuário com dados válidos

Pré-condições:
- Admin autenticado
- Dados válidos para criação

Passos:
1. Login como Admin
2. POST /api/users
3. Body: dados completos do usuário
4. Verificar criação

Resultado Esperado:
- Status: 201 Created
- Usuário criado com sucesso
- ID gerado automaticamente
- Timestamp de criação

Dados de Teste:
- Input: {"name": "João Silva", "email": "joao@clinix.com", "password": "senha123", "role": "user", "phone": "11999999999"}
- Output: {"success": true, "user": {"id": 4, "name": "João Silva", "email": "joao@clinix.com", "role": "user", "created_at": "2024-01-01T10:00:00Z"}}

Critérios de Aceitação:
- Todos os campos obrigatórios preenchidos
- Password hasheado no banco
- Validation aplicada corretamente
```

### Editar Usuário

#### TC-016: Editar Usuário Existente (Admin)
```yaml
ID: TC-016
Módulo: Users
Versão: v0.3
Prioridade: Alta
Tipo: Funcional

Título: Admin edita dados de usuário existente

Pré-condições:
- Admin autenticado
- Usuário com ID válido existe
- Novos dados para atualização

Passos:
1. Login como Admin
2. PUT /api/users/{id}
3. Body: campos para atualização
4. Verificar atualização

Resultado Esperado:
- Status: 200 OK
- Dados atualizados no banco
- Response com dados novos
- Timestamp updated_at modificado

Dados de Teste:
- URL: /api/users/4
- Input: {"name": "João Silva Santos", "phone": "11888888888"}
- Output: {"success": true, "user": {"id": 4, "name": "João Silva Santos", "phone": "11888888888", "updated_at": "2024-01-01T11:00:00Z"}}
```

#### TC-017: Editar Usuário Inexistente
```yaml
ID: TC-017
Módulo: Users
Versão: v0.3
Prioridade: Média
Tipo: Funcional (Negativo)

Título: Falha ao editar usuário que não existe

Pré-condições:
- Admin autenticado
- ID inexistente será utilizado

Passos:
1. Login como Admin
2. PUT /api/users/999999
3. Body: dados válidos
4. Verificar erro 404

Resultado Esperado:
- Status: 404 Not Found
- Message: "Usuário não encontrado"
- Nenhuma alteração no banco

Dados de Teste:
- URL: /api/users/999999
- Input: {"name": "Nome Teste"}
- Output: {"success": false, "message": "User not found"}
```

### Excluir Usuário

#### TC-018: Excluir Usuário (Admin)
```yaml
ID: TC-018
Módulo: Users
Versão: v0.3
Prioridade: Alta
Tipo: Funcional

Título: Admin exclui usuário com sucesso

Pré-condições:
- Admin autenticado
- Usuário válido para exclusão
- Usuário não é o próprio Admin

Passos:
1. Login como Admin
2. DELETE /api/users/{id}
3. Confirmar exclusão
4. Verificar remoção do banco

Resultado Esperado:
- Status: 200 OK ou 204 No Content
- Usuário removido da base
- Message de confirmação
- Impossível fazer login com usuário excluído

Dados de Teste:
- URL: /api/users/4
- Output: {"success": true, "message": "User deleted successfully"}

Critérios de Aceitação:
- Soft delete ou hard delete conforme regra
- Relacionamentos preservados/removidos adequadamente
- Auditoria registrada
```

#### TC-019: Admin Tenta se Auto-Excluir
```yaml
ID: TC-019
Módulo: Users
Versão: v0.3
Prioridade: Alta
Tipo: Funcional (Negativo)

Título: Bloquear Admin de excluir própria conta

Pré-condições:
- Admin autenticado
- Admin tenta excluir próprio ID

Passos:
1. Login como Admin
2. DELETE /api/users/1 (próprio ID)
3. Verificar bloqueio

Resultado Esperado:
- Status: 400 Bad Request
- Message: "Não é possível excluir própria conta"
- Admin permanece ativo

Dados de Teste:
- URL: /api/users/1
- Output: {"success": false, "message": "Cannot delete own account"}
```

---

## v0.4 - Medicines (CRUD)

### Listar Medicamentos

#### TC-020: Listar Medicamentos (Todos os Perfis)
```yaml
ID: TC-020
Módulo: Medicines
Versão: v0.4
Prioridade: Alta
Tipo: Funcional

Título: Usuários autenticados podem listar medicamentos

Pré-condições:
- Usuário autenticado (qualquer perfil)
- Medicamentos cadastrados na base

Cenários:
a) Admin lista medicamentos
b) Farmacêutico lista medicamentos  
c) Usuário comum lista medicamentos

Passos:
1. Login com perfil específico
2. GET /api/medicines
3. Verificar lista retornada

Resultado Esperado:
- Status: 200 OK
- Array com medicamentos disponíveis
- Informações básicas (nome, código, categoria)
- Filtros e paginação funcionando

Dados de Teste:
- Headers: {"Authorization": "Bearer token"}
- Output: {"success": true, "medicines": [{"id": 1, "name": "Paracetamol", "code": "PAR001", "category": "Analgésico"}], "total": 10}

Critérios de Aceitação:
- Todos os perfis têm acesso
- Performance < 200ms
- Dados consistentes
```

### Criar Medicamento

#### TC-021: Cadastrar Medicamento (Admin/Farmacêutico)
```yaml
ID: TC-021
Módulo: Medicines
Versão: v0.4
Prioridade: Alta
Tipo: Funcional

Título: Admin/Farmacêutico cadastra novo medicamento

Pré-condições:
- Admin ou Farmacêutico autenticado
- Dados válidos para cadastro

Passos:
1. Login como Admin ou Farmacêutico
2. POST /api/medicines
3. Body: dados completos do medicamento
4. Verificar criação

Resultado Esperado:
- Status: 201 Created
- Medicamento criado com sucesso
- ID único gerado
- Código único validado

Dados de Teste:
- Input: {"name": "Dipirona", "code": "DIP001", "category": "Analgésico", "description": "Analgésico e antitérmico", "minimum_stock": 10}
- Output: {"success": true, "medicine": {"id": 2, "name": "Dipirona", "code": "DIP001", "created_at": "2024-01-01T10:00:00Z"}}

Critérios de Aceitação:
- Código único validado
- Campos obrigatórios preenchidos
- Categoria válida
```

#### TC-022: Usuário Comum Tenta Cadastrar Medicamento
```yaml
ID: TC-022
Módulo: Medicines
Versão: v0.4
Prioridade: Alta
Tipo: Segurança (Negativo)

Título: Bloquear cadastro por usuário sem permissão

Pré-condições:
- Usuário comum autenticado
- Dados válidos de medicamento

Passos:
1. Login como usuário comum
2. POST /api/medicines
3. Body: dados válidos
4. Verificar bloqueio

Resultado Esperado:
- Status: 403 Forbidden
- Acesso negado
- Nenhum medicamento criado

Dados de Teste:
- Headers: {"Authorization": "Bearer user_token"}
- Input: {"name": "Teste", "code": "TST001"}
- Output: {"success": false, "message": "Insufficient permissions"}
```

#### TC-023: Cadastrar Medicamento com Código Duplicado
```yaml
ID: TC-023
Módulo: Medicines
Versão: v0.4
Prioridade: Alta
Tipo: Funcional (Negativo)

Título: Falha ao cadastrar medicamento com código existente

Pré-condições:
- Admin autenticado
- Código já existe na base

Passos:
1. Login como Admin
2. POST /api/medicines
3. Body com código duplicado
4. Verificar erro de conflito

Resultado Esperado:
- Status: 409 Conflict
- Message: "Código já existe"
- Nenhum medicamento duplicado

Dados de Teste:
- Input: {"name": "Novo Med", "code": "PAR001"}
- Output: {"success": false, "message": "Medicine code already exists"}
```

### Editar Medicamento

#### TC-024: Editar Medicamento (Admin/Farmacêutico)
```yaml
ID: TC-024
Módulo: Medicines
Versão: v0.4
Prioridade: Alta
Tipo: Funcional

Título: Admin/Farmacêutico edita medicamento existente

Pré-condições:
- Admin ou Farmacêutico autenticado
- Medicamento com ID válido existe

Passos:
1. Login com perfil adequado
2. PUT /api/medicines/{id}
3. Body: campos para atualização
4. Verificar atualização

Resultado Esperado:
- Status: 200 OK
- Dados atualizados
- Timestamp updated_at modificado
- Validation aplicada

Dados de Teste:
- URL: /api/medicines/1
- Input: {"name": "Paracetamol 500mg", "minimum_stock": 20}
- Output: {"success": true, "medicine": {"id": 1, "name": "Paracetamol 500mg", "minimum_stock": 20, "updated_at": "2024-01-01T11:00:00Z"}}
```

### Excluir Medicamento

#### TC-025: Excluir Medicamento (Admin)
```yaml
ID: TC-025
Módulo: Medicines
Versão: v0.4
Prioridade: Alta
Tipo: Funcional

Título: Admin exclui medicamento com sucesso

Pré-condições:
- Admin autenticado
- Medicamento sem movimentações ativas
- ID válido para exclusão

Passos:
1. Login como Admin
2. DELETE /api/medicines/{id}
3. Confirmar exclusão
4. Verificar remoção

Resultado Esperado:
- Status: 200 OK
- Medicamento removido
- Validação de dependências
- Impossível consultar medicamento excluído

Dados de Teste:
- URL: /api/medicines/2
- Output: {"success": true, "message": "Medicine deleted successfully"}

Critérios de Aceitação:
- Verificar dependências antes de excluir
- Soft delete se houver histórico
- Auditoria registrada
```

#### TC-026: Farmacêutico Tenta Excluir Medicamento
```yaml
ID: TC-026
Módulo: Medicines
Versão: v0.4
Prioridade: Alta
Tipo: Segurança (Negativo)

Título: Bloquear exclusão para Farmacêutico

Pré-condições:
- Farmacêutico autenticado
- Medicamento válido

Passos:
1. Login como Farmacêutico
2. DELETE /api/medicines/{id}
3. Verificar bloqueio

Resultado Esperado:
- Status: 403 Forbidden
- Acesso negado
- Medicamento preservado

Dados de Teste:
- Headers: {"Authorization": "Bearer pharmacist_token"}
- URL: /api/medicines/1
- Output: {"success": false, "message": "Only admins can delete medicines"}
```

---

## 📦 v0.5 - Stock Management (Controle de Estoque)

### Registrar Entrada

#### TC-027: Entrada de Medicamento (Admin/Farmacêutico)
```yaml
ID: TC-027
Módulo: Stock
Versão: v0.5
Prioridade: Alta
Tipo: Funcional

Título: Registrar entrada de medicamento no estoque

Pré-condições:
- Admin ou Farmacêutico autenticado
- Medicamento cadastrado existe
- Dados válidos para movimentação

Passos:
1. Login com perfil adequado
2. POST /api/stock/entry
3. Body: dados da entrada (medicamento, quantidade, lote, validade)
4. Verificar registro e atualização do saldo

Resultado Esperado:
- Status: 201 Created
- Entrada registrada
- Saldo atualizado
- Log de movimentação criado

Dados de Teste:
- Input: {"medicine_id": 1, "quantity": 100, "batch": "LOTE001", "expiry_date": "2025-12-31", "supplier": "Fornecedor A"}
- Output: {"success": true, "entry": {"id": 1, "medicine_id": 1, "quantity": 100, "current_stock": 100, "created_at": "2024-01-01T10:00:00Z"}}

Critérios de Aceitação:
- Saldo calculado corretamente
- Dados de rastreabilidade salvos
- Validação de datas de validade
```

### Registrar Saída

#### TC-028: Saída de Medicamento (Admin/Farmacêutico)
```yaml
ID: TC-028
Módulo: Stock
Versão: v0.5
Prioridade: Alta
Tipo: Funcional

Título: Registrar saída de medicamento do estoque

Pré-condições:
- Admin ou Farmacêutico autenticado
- Medicamento com estoque disponível
- Quantidade válida para saída

Passos:
1. Login com perfil adequado
2. POST /api/stock/exit
3. Body: dados da saída
4. Verificar atualização do saldo

Resultado Esperado:
- Status: 201 Created
- Saída registrada
- Saldo reduzido corretamente
- Alerta se estoque baixo

Dados de Teste:
- Input: {"medicine_id": 1, "quantity": 10, "reason": "Dispensação", "patient_id": 1}
- Output: {"success": true, "exit": {"id": 1, "medicine_id": 1, "quantity": 10, "current_stock": 90, "low_stock_alert": false}}
```

#### TC-029: Saída com Quantidade Insuficiente
```yaml
ID: TC-029
Módulo: Stock
Versão: v0.5
Prioridade: Alta
Tipo: Funcional (Negativo)

Título: Bloquear saída quando estoque insuficiente

Pré-condições:
- Farmacêutico autenticado
- Medicamento com estoque baixo
- Quantidade solicitada > estoque disponível

Passos:
1. Login como Farmacêutico
2. POST /api/stock/exit
3. Body com quantidade maior que disponível
4. Verificar bloqueio

Resultado Esperado:
- Status: 400 Bad Request
- Message: "Estoque insuficiente"
- Saldo não alterado

Dados de Teste:
- Input: {"medicine_id": 1, "quantity": 1000}
- Output: {"success": false, "message": "Insufficient stock", "available": 90, "requested": 1000}
```

### Consultar Estoque

#### TC-030: Consultar Saldo Atual (Todos os Perfis)
```yaml
ID: TC-030
Módulo: Stock
Versão: v0.5
Prioridade: Alta
Tipo: Funcional

Título: Consultar saldo atual de medicamentos

Pré-condições:
- Usuário autenticado (qualquer perfil)
- Movimentações de estoque registradas

Passos:
1. Login com qualquer perfil
2. GET /api/stock/balance
3. Opcional: filtrar por medicamento
4. Verificar saldos atuais

Resultado Esperado:
- Status: 200 OK
- Lista com saldos atuais
- Alertas de estoque baixo
- Dados de última movimentação

Dados de Teste:
- Headers: {"Authorization": "Bearer token"}
- Output: {"success": true, "stock": [{"medicine_id": 1, "medicine_name": "Paracetamol", "current_stock": 90, "minimum_stock": 10, "low_stock": false, "last_movement": "2024-01-01T10:00:00Z"}]}

Critérios de Aceitação:
- Saldos calculados em tempo real
- Alertas precisos
- Performance adequada
```

---

## v0.6 - Patients (Pacientes)

#### TC-031: Cadastrar Paciente (Admin/Farmacêutico)
```yaml
ID: TC-031
Módulo: Patients
Versão: v0.6
Prioridade: Alta
Tipo: Funcional

Título: Cadastrar novo paciente no sistema

Pré-condições:
- Admin ou Farmacêutico autenticado
- Dados pessoais válidos para cadastro
- CPF único disponível

Passos:
1. Login como Admin ou Farmacêutico
2. POST /api/patients
3. Body: dados completos do paciente
4. Verificar criação e validações

Resultado Esperado:
- Status: 201 Created
- Paciente cadastrado com sucesso
- ID único gerado
- CPF validado e formatado

Dados de Teste:
- Input: {"name": "Maria Silva", "cpf": "12345678901", "birth_date": "1990-01-01", "phone": "11999999999", "address": "Rua A, 123", "email": "maria@email.com"}
- Output: {"success": true, "patient": {"id": 1, "name": "Maria Silva", "cpf": "123.456.789-01", "birth_date": "1990-01-01", "created_at": "2024-01-01T10:00:00Z"}}

Critérios de Aceitação:
- CPF validado (algoritmo oficial)
- Email validado (formato)
- Dados sensíveis protegidos
```

#### TC-032: Listar Pacientes com Paginação
```yaml
ID: TC-032
Módulo: Patients
Versão: v0.6
Prioridade: Alta
Tipo: Funcional

Título: Listar pacientes com paginação e filtros

Pré-condições:
- Admin ou Farmacêutico autenticado
- Múltiplos pacientes cadastrados

Passos:
1. Login com perfil adequado
2. GET /api/patients?page=1&limit=10&search=silva
3. Verificar paginação e filtros

Resultado Esperado:
- Status: 200 OK
- Lista paginada de pacientes
- Filtros de busca funcionando
- Metadados de paginação

Dados de Teste:
- URL: /api/patients?page=1&limit=10&search=silva
- Output: {"success": true, "patients": [...], "pagination": {"current_page": 1, "total_pages": 3, "total_records": 25, "per_page": 10}}
```

#### TC-033: Usuário Comum Tenta Acessar Pacientes
```yaml
ID: TC-033
Módulo: Patients
Versão: v0.6
Prioridade: Alta
Tipo: Segurança (Negativo)

Título: Bloquear acesso de usuário comum aos pacientes

Pré-condições:
- Usuário comum autenticado
- Dados de pacientes existem

Passos:
1. Login como usuário comum
2. GET /api/patients
3. Verificar bloqueio de acesso

Resultado Esperado:
- Status: 403 Forbidden
- Acesso negado
- Nenhum dado de paciente vazado

Dados de Teste:
- Headers: {"Authorization": "Bearer user_token"}
- Output: {"success": false, "message": "Access denied - insufficient permissions"}
```

#### TC-034: Editar Dados de Paciente
```yaml
ID: TC-034
Módulo: Patients
Versão: v0.6
Prioridade: Alta
Tipo: Funcional

Título: Atualizar informações de paciente existente

Pré-condições:
- Admin ou Farmacêutico autenticado
- Paciente com ID válido existe

Passos:
1. Login com perfil adequado
2. PUT /api/patients/{id}
3. Body: campos para atualização
4. Verificar atualização

Resultado Esperado:
- Status: 200 OK
- Dados atualizados no banco
- Histórico de alterações preservado
- Validações aplicadas

Dados de Teste:
- URL: /api/patients/1
- Input: {"phone": "11888888888", "address": "Rua B, 456"}
- Output: {"success": true, "patient": {"id": 1, "phone": "11888888888", "address": "Rua B, 456", "updated_at": "2024-01-01T11:00:00Z"}}
```

---

## v0.7 - Reports & Dashboard

#### TC-035: Relatório de Medicamentos (Admin)
```yaml
ID: TC-035
Módulo: Reports
Versão: v0.7
Prioridade: Alta
Tipo: Funcional

Título: Gerar relatório completo de medicamentos

Pré-condições:
- Admin autenticado
- Medicamentos e movimentações existem
- Período para relatório definido

Passos:
1. Login como Admin
2. GET /api/reports/medicines?start_date=2024-01-01&end_date=2024-01-31
3. Verificar dados do relatório

Resultado Esperado:
- Status: 200 OK
- Relatório detalhado gerado
- Dados de estoque, movimentações, alertas
- Formato JSON ou PDF disponível

Dados de Teste:
- URL: /api/reports/medicines?start_date=2024-01-01&end_date=2024-01-31&format=json
- Output: {"success": true, "report": {"total_medicines": 50, "low_stock_count": 5, "expired_soon": 3, "movements": [...], "generated_at": "2024-01-01T10:00:00Z"}}

Critérios de Aceitação:
- Dados precisos e atualizados
- Performance < 2 segundos
- Múltiplos formatos disponíveis
```

#### TC-036: Dashboard de Estoque (Admin/Farmacêutico)
```yaml
ID: TC-036
Módulo: Reports
Versão: v0.7
Prioridade: Alta
Tipo: Funcional

Título: Acessar dashboard com indicadores de estoque

Pré-condições:
- Admin ou Farmacêutico autenticado
- Dados de movimentação disponíveis

Passos:
1. Login com perfil adequado
2. GET /api/dashboard/stock
3. Verificar indicadores e gráficos

Resultado Esperado:
- Status: 200 OK
- KPIs principais exibidos
- Alertas de estoque baixo
- Dados para gráficos

Dados de Teste:
- Headers: {"Authorization": "Bearer admin_token"}
- Output: {"success": true, "dashboard": {"total_medicines": 100, "low_stock_alerts": 8, "expired_medicines": 2, "recent_movements": [...], "stock_value": 15000.50}}
```

#### TC-037: Relatório com Período Inválido
```yaml
ID: TC-037
Módulo: Reports
Versão: v0.7
Prioridade: Média
Tipo: Funcional (Negativo)

Título: Validar erro com período inválido no relatório

Pré-condições:
- Admin autenticado
- Datas inválidas serão fornecidas

Passos:
1. Login como Admin
2. GET /api/reports/medicines?start_date=2024-12-31&end_date=2024-01-01
3. Verificar validação de datas

Resultado Esperado:
- Status: 400 Bad Request
- Message: "Data inicial deve ser menor que data final"
- Nenhum relatório gerado

Dados de Teste:
- URL: /api/reports/medicines?start_date=2024-12-31&end_date=2024-01-01
- Output: {"success": false, "message": "Invalid date range", "details": "Start date must be before end date"}
```

---

## v0.8 - Permissions & Security

#### TC-038: Validar Permissões Admin
```yaml
ID: TC-038
Módulo: Security
Versão: v0.8
Prioridade: Alta
Tipo: Segurança

Título: Verificar todas as permissões do perfil Admin

Pré-condições:
- Admin autenticado
- Todos os endpoints implementados

Cenários a Testar:
a) CRUD usuários - permitido
b) CRUD medicamentos - permitido
c) CRUD pacientes - permitido
d) Relatórios - permitido
e) Configurações sistema - permitido

Passos:
1. Login como Admin
2. Executar operações críticas em cada módulo
3. Verificar acesso total

Resultado Esperado:
- Status: 200/201 em todas operações
- Nenhuma restrição de acesso
- Logs de auditoria registrados

Critérios de Aceitação:
- 100% dos endpoints acessíveis
- Operações sensíveis logadas
- Performance mantida
```

#### TC-039: Validar Restrições Farmacêutico
```yaml
ID: TC-039
Módulo: Security
Versão: v0.8
Prioridade: Alta
Tipo: Segurança

Título: Verificar limitações do perfil Farmacêutico

Pré-condições:
- Farmacêutico autenticado
- Conhecimento das restrições esperadas

Cenários:
- Permitido: CRUD medicamentos, estoque, pacientes
- Bloqueado: Exclusão medicamentos, CRUD usuários, relatórios gerenciais

Passos:
1. Login como Farmacêutico
2. Testar operações permitidas
3. Testar operações bloqueadas

Resultado Esperado:
- Operações permitidas: 200/201
- Operações bloqueadas: 403 Forbidden
- Mensagens claras de restrição

Dados de Teste:
- Permitido: GET /api/medicines → 200 OK
- Bloqueado: DELETE /api/medicines/1 → 403 Forbidden
```

#### TC-040: Validar Restrições Usuário Comum
```yaml
ID: TC-040
Módulo: Security
Versão: v0.8
Prioridade: Alta
Tipo: Segurança

Título: Verificar limitações máximas do usuário comum

Pré-condições:
- Usuário comum autenticado
- Tentativas de acesso a recursos restritos

Cenários:
- Permitido: Consultar medicamentos (apenas leitura)
- Bloqueado: Todas operações de escrita, dados sensíveis

Passos:
1. Login como usuário comum
2. Tentar acessar recursos restritos
3. Verificar bloqueios sistemáticos

Resultado Esperado:
- Acesso mínimo funcional
- Bloqueios consistentes
- Sem vazamento de dados

Dados de Teste:
- Permitido: GET /api/medicines → 200 OK (dados públicos)
- Bloqueado: POST /api/medicines → 403 Forbidden
```

#### TC-041: Teste de JWT Token Expiry
```yaml
ID: TC-041
Módulo: Security
Versão: v0.8
Prioridade: Alta
Tipo: Segurança

Título: Validar comportamento com token JWT expirado

Pré-condições:
- Token JWT expirado disponível
- Endpoint protegido para teste

Passos:
1. Obter token válido
2. Aguardar expiração ou manipular timestamp
3. Usar token expirado em requisição
4. Verificar rejeição

Resultado Esperado:
- Status: 401 Unauthorized
- Message: "Token expired"
- Força novo login
- Logs de tentativa registrados

Dados de Teste:
- Headers: {"Authorization": "Bearer expired_token_here"}
- Output: {"success": false, "message": "Token expired", "code": "TOKEN_EXPIRED"}
```

#### TC-042: Teste de Rate Limiting
```yaml
ID: TC-042
Módulo: Security
Versão: v0.8
Prioridade: Média
Tipo: Segurança

Título: Validar limite de requisições por minuto

Pré-condições:
- Rate limiting configurado (ex: 100 req/min)
- Script para múltiplas requisições

Passos:
1. Fazer login válido
2. Executar 101 requisições em 1 minuto
3. Verificar bloqueio na requisição 101

Resultado Esperado:
- Primeiras 100: 200 OK
- 101+: 429 Too Many Requests
- Headers com limite informados
- Bloqueio temporário aplicado

Dados de Teste:
- Headers: {"X-RateLimit-Limit": "100", "X-RateLimit-Remaining": "0", "X-RateLimit-Reset": "1640995200"}
- Output: {"success": false, "message": "Rate limit exceeded", "retry_after": 60}
```

---

## v0.9 - Regression & Final Testing

#### TC-043: Smoke Test Completo
```yaml
ID: TC-043
Módulo: Regression
Versão: v0.9
Prioridade: Crítica
Tipo: Regressão

Título: Teste de fumaça em todas as funcionalidades críticas

Pré-condições:
- Sistema completo implementado
- Dados de teste disponíveis
- Ambiente estável

Cenários Críticos:
1. Login Admin → Sucesso
2. Criar usuário → Sucesso  
3. Cadastrar medicamento → Sucesso
4. Movimentar estoque → Sucesso
5. Cadastrar paciente → Sucesso
6. Gerar relatório → Sucesso

Passos:
1. Executar sequência de casos críticos
2. Verificar fluxo end-to-end
3. Validar integridade dos dados

Resultado Esperado:
- 100% dos casos críticos passando
- Performance dentro do SLA
- Dados consistentes entre módulos

Critérios de Aceitação:
- 0 falhas em casos críticos
- Tempo total < 5 minutos
- Nenhuma regressão detectada
```

#### TC-044: Teste de Carga Básico
```yaml
ID: TC-044
Módulo: Performance
Versão: v0.9
Prioridade: Alta
Tipo: Não Funcional

Título: Validar performance com carga simulada

Pré-condições:
- k6 configurado e operacional
- Cenários de carga definidos
- Ambiente de produção simulado

Cenários de Carga:
- 10 usuários simultâneos por 5 minutos
- 50 usuários simultâneos por 2 minutos
- 100 usuários simultâneos por 1 minuto

Passos:
1. Configurar script k6
2. Executar cenários progressivos
3. Monitorar métricas de performance

Resultado Esperado:
- Response time médio < 200ms
- 95º percentil < 500ms
- 0% de error rate
- Throughput > 1000 req/min

Dados de Teste:
- Script: load-test-basic.js
- Métricas: {"avg_response_time": 150, "p95": 300, "error_rate": 0.1, "throughput": 1200}
```

#### TC-045: Validação de Integridade de Dados
```yaml
ID: TC-045
Módulo: Data Integrity
Versão: v0.9
Prioridade: Alta
Tipo: Funcional

Título: Verificar consistência entre módulos

Pré-condições:
- Dados inter-relacionados existem
- Todas as operações CRUD funcionando

Cenários:
1. Criar usuário → Verificar em relatórios
2. Movimentar estoque → Validar saldos
3. Cadastrar paciente → Consultar histórico
4. Excluir registro → Verificar relacionamentos

Passos:
1. Executar operações em módulos diferentes
2. Cross-validar dados entre endpoints
3. Verificar integridade referencial

Resultado Esperado:
- Dados consistentes entre módulos
- Relacionamentos preservados
- Nenhuma inconsistência detectada

Critérios de Aceitação:
- 100% consistência cross-module
- Foreign keys íntegras
- Timestamps sincronizados
```

---

## 🚀 v1.0 - Release Candidate

#### TC-046: Fluxo E2E Admin Completo
```yaml
ID: TC-046
Módulo: End-to-End
Versão: v1.0
Prioridade: Crítica
Tipo: Aceitação

Título: Jornada completa do usuário Admin

Pré-condições:
- Sistema em versão release candidate
- Dados limpos para teste
- Todos os módulos integrados

Fluxo Completo:
1. Login como Admin
2. Criar novo usuário (Farmacêutico)  
3. Cadastrar 3 medicamentos
4. Registrar entradas de estoque
5. Criar 2 pacientes
6. Processar saídas de estoque
7. Gerar relatório mensal
8. Revisar dashboard
9. Fazer logout

Resultado Esperado:
- Todos os passos executados com sucesso
- Dados persistidos corretamente
- Performance adequada em todo fluxo
- UX fluida e intuitiva

Critérios de Aceitação:
- 0 erros no fluxo completo
- Tempo total < 10 minutos
- Todas as validações passando
- Logs de auditoria completos
```

#### TC-047: Fluxo E2E Farmacêutico
```yaml
ID: TC-047
Módulo: End-to-End
Versão: v1.0
Prioridade: Alta
Tipo: Aceitação

Título: Jornada típica do Farmacêutico

Fluxo Farmacêutico:
1. Login como Farmacêutico
2. Consultar alertas de estoque baixo
3. Cadastrar 2 novos medicamentos
4. Processar entrada de medicamentos
5. Atender dispensação (saída)
6. Cadastrar novo paciente
7. Consultar relatório de movimentações
8. Logout

Resultado Esperado:
- Acesso adequado aos recursos permitidos
- Bloqueios em recursos restritos
- Workflow eficiente e lógico

Critérios de Aceitação:
- Permissões corretas aplicadas
- Operações core funcionando
- Interface responsiva
```

#### TC-048: Teste de Recuperação de Falhas
```yaml
ID: TC-048
Módulo: Reliability
Versão: v1.0
Prioridade: Alta
Tipo: Não Funcional

Título: Validar comportamento em cenários de falha

Cenários de Falha:
1. Conexão de banco perdida durante operação
2. Timeout em operação crítica
3. Payload malformado enviado
4. Concorrência em operação de estoque
5. Memory leak simulado

Passos:
1. Simular cada tipo de falha
2. Verificar tratamento de erro
3. Validar recuperação automática
4. Testar graceful degradation

Resultado Esperado:
- Errors tratados adequadamente
- Mensagens de erro apropriadas
- Sistema se recupera automaticamente
- Dados não corrompidos

Critérios de Aceitação:
- 0 crashes não tratados
- Recovery time < 30 segundos
- User experience preservada
- Integridade de dados mantida
```

---

## Templates e Padrões

### Template de Bug Report
```markdown
**ID:** BUG-XXX
**Título:** [Descrição concisa do bug]
**Módulo:** [Authentication/Users/etc]
**Severity:** [Critical/High/Medium/Low]
**Priority:** [P1/P2/P3/P4]

**Ambiente:**
- API Version: vX.X
- Environment: [test/staging/prod]
- Browser/Client: [se aplicável]

**Passos para Reproduzir:**
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

**Resultado Atual:**
[O que está acontecendo]

**Resultado Esperado:**
[O que deveria acontecer]

**Evidências:**
- Screenshot: [link]
- Logs: [snippet]
- Request/Response: [dados]

**Workaround:**
[Se disponível]

**Reporter:** [Nome]
**Assigned:** [Nome]
**Created:** [Data]
```

### Critérios de Definição de Pronto
- [ ] Caso de teste implementado
- [ ] Execução automatizada  
- [ ] Evidências geradas
- [ ] Code review aprovado
- [ ] Documentação atualizada
- [ ] Performance validada
- [ ] Security check realizado

---

** Versão:** 1.0  
** Última Atualização:** ${new Date().toLocaleDateString('pt-BR')}  
** Autor:** Rafael Zanella  
** Total de Casos:** 48 casos de teste  
** Cobertura:** Functional, Security, Performance, E2E
