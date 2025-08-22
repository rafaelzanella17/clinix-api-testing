# Matriz de Rastreabilidade - Clinix API

Esta matriz mapeia **requisitos funcionais** para **casos de teste**, garantindo cobertura completa e rastreabilidade bidirecional.

## Visão Geral

| **Módulo** | **Requisitos** | **Casos de Teste** | **Cobertura** | **Status** |
|------------|----------------|-------------------|---------------|------------|
| Authentication | 6 | 9 | 100% |Completo |
| Users | 8 | 10 | 100% | Em progresso |
| Medicines | 6 | 7 | 85% | Planejado |
| Stock | 5 | 4 | 80% |  Planejado |
| Patients | 4 | 4 | 100% | Planejado |
| Reports | 3 | 3 | 100% | Planejado |
| Security | 8 | 11 | 100% | Planejado |

**Total:** 40 requisitos → 48 casos de teste (120% cobertura com cenários negativos)

---

## Authentication Module

### Requisitos Funcionais
| **ID** | **Requisito** | **Prioridade** | **Casos de Teste** | **Status** |
|--------|---------------|----------------|-------------------|------------|
| **REQ-AUTH-001** | Sistema deve permitir login com email/senha | Alta | TC-001, TC-002, TC-003 | ✅ |
| **REQ-AUTH-002** | Sistema deve retornar JWT token válido | Alta | TC-001, TC-002, TC-003 | ✅ |
| **REQ-AUTH-003** | Sistema deve validar credenciais | Alta | TC-004, TC-005 | ✅ |
| **REQ-AUTH-004** | Sistema deve permitir acesso ao perfil | Alta | TC-007, TC-008, TC-009 | ✅ |
| **REQ-AUTH-005** | Admin deve poder registrar usuários | Alta | TC-010, TC-011, TC-012 | ✅ |
| **REQ-AUTH-006** | Sistema deve aplicar role-based access | Alta | TC-008, TC-009, TC-012 | ✅ |

### Requisitos Não Funcionais
| **ID** | **Requisito** | **SLA** | **Casos de Teste** | **Status** |
|--------|---------------|---------|-------------------|------------|
| **REQ-AUTH-NFR-001** | Response time < 200ms | < 200ms | Todos TC-001 a TC-012 | ✅ |
| **REQ-AUTH-NFR-002** | Token válido por 24h | 24h | TC-001, TC-009 | ✅ |
| **REQ-AUTH-NFR-003** | Rate limiting aplicado | 100 req/min | TC-042 | 📝 |

---

## 👥 Users Module

### Requisitos Funcionais
| **ID** | **Requisito** | **Prioridade** | **Casos de Teste** | **Status** |
|--------|---------------|----------------|-------------------|------------|
| **REQ-USER-001** | Admin deve listar todos usuários | Alta | TC-013 | 🟡 |
| **REQ-USER-002** | Admin deve criar novos usuários | Alta | TC-015 | 🟡 |
| **REQ-USER-003** | Admin deve editar usuários | Alta | TC-016, TC-017 | 🟡 |
| **REQ-USER-004** | Admin deve excluir usuários | Alta | TC-018, TC-019 | 🟡 |
| **REQ-USER-005** | Sistema deve validar permissões | Alta | TC-014, TC-022 | 📝 |
| **REQ-USER-006** | Dados sensíveis devem ser protegidos | Alta | TC-013, TC-015 | 📝 |
| **REQ-USER-007** | Sistema deve suportar paginação | Média | TC-013 | 📝 |
| **REQ-USER-008** | Sistema deve validar dados únicos | Alta | TC-015 | 📝 |

### Critérios de Aceitação
```yaml
REQ-USER-001:
  - Admin visualiza lista completa de usuários
  - Dados sensíveis (senha) não expostos
  - Paginação funcional com 10 itens por página
  - Performance < 200ms

REQ-USER-002:
  - Validação de email único
  - Password hasheado no banco
  - Role aplicado corretamente
  - Campos obrigatórios validados
```

---

## Medicines Module

### Requisitos Funcionais
| **ID** | **Requisito** | **Prioridade** | **Casos de Teste** | **Status** |
|--------|---------------|----------------|-------------------|------------|
| **REQ-MED-001** | Usuários devem consultar medicamentos | Alta | TC-020 | 📝 |
| **REQ-MED-002** | Admin/Farm devem cadastrar medicamentos | Alta | TC-021, TC-023 | 📝 |
| **REQ-MED-003** | Admin/Farm devem editar medicamentos | Alta | TC-024 | 📝 |
| **REQ-MED-004** | Admin deve excluir medicamentos | Alta | TC-025, TC-026 | 📝 |
| **REQ-MED-005** | Sistema deve validar código único | Alta | TC-023 | 📝 |
| **REQ-MED-006** | Sistema deve aplicar permissões por role | Alta | TC-022, TC-026 | 📝 |

### Regras de Negócio
```yaml
RN-MED-001: Código do medicamento deve ser único no sistema
RN-MED-002: Apenas Admin pode excluir medicamentos
RN-MED-003: Medicamentos com movimentação não podem ser excluídos
RN-MED-004: Campos obrigatórios: nome, código, categoria
```

---

## Stock Module

### Requisitos Funcionais  
| **ID** | **Requisito** | **Prioridade** | **Casos de Teste** | **Status** |
|--------|---------------|----------------|-------------------|------------|
| **REQ-STOCK-001** | Sistema deve registrar entradas | Alta | TC-027 | 📝 |
| **REQ-STOCK-002** | Sistema deve registrar saídas | Alta | TC-028, TC-029 | 📝 |
| **REQ-STOCK-003** | Sistema deve calcular saldos | Alta | TC-030 | 📝 |
| **REQ-STOCK-004** | Sistema deve validar disponibilidade | Alta | TC-029 | 📝 |
| **REQ-STOCK-005** | Todos perfis devem consultar estoque | Média | TC-030 | 📝 |

### Regras de Negócio
```yaml
RN-STOCK-001: Saída não pode exceder estoque disponível
RN-STOCK-002: Entrada deve ter lote e validade obrigatórios
RN-STOCK-003: Saldo deve ser calculado em tempo real
RN-STOCK-004: Alerta quando estoque < mínimo definido
RN-STOCK-005: Rastreabilidade completa de movimentações
```

---

## Patients Module

### Requisitos Funcionais
| **ID** | **Requisito** | **Prioridade** | **Casos de Teste** | **Status** |
|--------|---------------|----------------|-------------------|------------|
| **REQ-PAT-001** | Admin/Farm devem cadastrar pacientes | Alta | TC-031 | 📝 |
| **REQ-PAT-002** | Admin/Farm devem listar pacientes | Alta | TC-032 | 📝 |  
| **REQ-PAT-003** | Admin/Farm devem editar pacientes | Alta | TC-034 | 📝 |
| **REQ-PAT-004** | Usuário comum não acessa pacientes | Alta | TC-033 | 📝 |

### Compliance e Privacidade
```yaml
LGPD-001: CPF deve ser validado e mascarado
LGPD-002: Dados sensíveis criptografados em repouso
LGPD-003: Logs de acesso a dados pessoais
LGPD-004: Consentimento explícito para dados não essenciais
```

---

## Reports Module

### Requisitos Funcionais
| **ID** | **Requisito** | **Prioridade** | **Casos de Teste** | **Status** |
|--------|---------------|----------------|-------------------|------------|
| **REQ-REP-001** | Admin deve gerar relatórios de medicamentos | Alta | TC-035, TC-037 | 📝 |
| **REQ-REP-002** | Admin/Farm devem acessar dashboard estoque | Alta | TC-036 | 📝 |
| **REQ-REP-003** | Sistema deve validar períodos de relatório | Média | TC-037 | 📝 |

### KPIs e Métricas
```yaml
KPI-001: Medicamentos em estoque baixo
KPI-002: Valor total do estoque  
KPI-003: Movimentações por período
KPI-004: Top medicamentos mais dispensados
KPI-005: Alertas de vencimento próximo
```

---

## Security & Permissions

### Requisitos de Segurança
| **ID** | **Requisito** | **Prioridade** | **Casos de Teste** | **Status** |
|--------|---------------|----------------|-------------------|------------|
| **REQ-SEC-001** | Admin deve ter acesso total | Crítica | TC-038 | 📝 |
| **REQ-SEC-002** | Farmacêutico deve ter acesso limitado | Crítica | TC-039 | 📝 |
| **REQ-SEC-003** | Usuário deve ter acesso mínimo | Crítica | TC-040 | 📝 |
| **REQ-SEC-004** | Token JWT deve expirar | Crítica | TC-041 | 📝 |
| **REQ-SEC-005** | Rate limiting deve ser aplicado | Alta | TC-042 | 📝 |
| **REQ-SEC-006** | Logs de auditoria devem ser gerados | Alta | TC-038, TC-039, TC-040 | 📝 |
| **REQ-SEC-007** | HTTPS deve ser obrigatório | Alta | Manual | 📝 |
| **REQ-SEC-008** | Headers de segurança devem estar presentes | Alta | Manual | 📝 |

### Matriz de Permissões por Role
| **Recurso** | **Admin** | **Farmacêutico** | **Usuário** |
|-------------|-----------|------------------|-------------|
| **Authentication** | ✅ Full | ✅ Full | ✅ Full |
| **Users - List** | ✅ | ❌ | ❌ |
| **Users - Create** | ✅ | ❌ | ❌ |
| **Users - Edit** | ✅ | ❌ | ❌ |
| **Users - Delete** | ✅ | ❌ | ❌ |
| **Medicines - List** | ✅ | ✅ | ✅ Read-only |
| **Medicines - Create** | ✅ | ✅ | ❌ |
| **Medicines - Edit** | ✅ | ✅ | ❌ |
| **Medicines - Delete** | ✅ | ❌ | ❌ |
| **Stock - View** | ✅ | ✅ | ✅ Limited |
| **Stock - Entry** | ✅ | ✅ | ❌ |
| **Stock - Exit** | ✅ | ✅ | ❌ |
| **Patients - List** | ✅ | ✅ | ❌ |
| **Patients - Create** | ✅ | ✅ | ❌ |
| **Patients - Edit** | ✅ | ✅ | ❌ |
| **Patients - Delete** | ✅ | ❌ | ❌ |
| **Reports - Generate** | ✅ | ✅ Limited | ❌ |
| **Dashboard** | ✅ Full | ✅ Limited | ❌ |

---

## Performance & Reliability

### Requisitos Não Funcionais
| **ID** | **Requisito** | **SLA** | **Casos de Teste** | **Status** |
|--------|---------------|---------|-------------------|------------|
| **REQ-PERF-001** | Response time médio | < 200ms | TC-044 | 📝 |
| **REQ-PERF-002** | Throughput mínimo | > 1000 req/min | TC-044 | 📝 |
| **REQ-PERF-003** | Disponibilidade | > 99.5% | Manual | 📝 |
| **REQ-PERF-004** | Concurrent users | 100 usuários | TC-044 | 📝 |
| **REQ-PERF-005** | Database queries | < 100ms | Manual | 📝 |

### Cenários de Carga
```yaml
Scenario-1: Normal Load
  - Users: 10-20 concurrent
  - Duration: 5 minutes  
  - Target: < 150ms avg response

Scenario-2: Peak Load  
  - Users: 50-100 concurrent
  - Duration: 2 minutes
  - Target: < 300ms avg response

Scenario-3: Stress Test
  - Users: 200+ concurrent  
  - Duration: 1 minute
  - Target: System remains stable
```

---

## End-to-End & Integration

### Fluxos Críticos de Negócio
| **ID** | **Fluxo** | **Casos de Teste** | **Prioridade** | **Status** |
|--------|-----------|-------------------|----------------|------------|
| **FLOW-001** | Admin - Gestão Completa | TC-046 | Crítica | 📝 |
| **FLOW-002** | Farmacêutico - Operação Diária | TC-047 | Alta | 📝 |
| **FLOW-003** | Usuário - Consulta Básica | Derivado de TC-040 | Média | 📝 |
| **FLOW-004** | Recovery - Falha de Sistema | TC-048 | Alta | 📝 |

### Cenários de Integração
```yaml
INT-001: Authentication ↔ Users
  - Login → CRUD Users → Logout
  - Validação: Permissões corretas aplicadas

INT-002: Medicines ↔ Stock  
  - Cadastrar medicamento → Movimentar estoque
  - Validação: Saldos atualizados corretamente

INT-003: Stock ↔ Patients
  - Dispensar medicamento → Associar paciente
  - Validação: Histórico completo registrado

INT-004: All Modules ↔ Reports
  - Operações diversas → Gerar relatórios
  - Validação: Dados consistentes entre módulos
```

---

## Métricas de Cobertura

### Cobertura por Tipo de Teste
| **Tipo** | **Casos** | **% Total** | **Status** |
|----------|-----------|-------------|------------|
| **Funcionais Positivos** | 28 | 58% | 🟡 |
| **Funcionais Negativos** | 12 | 25% | 🟡 |
| **Segurança** | 5 | 10% | 📝 |
| **Performance** | 2 | 4% | 📝 |
| **End-to-End** | 1 | 2% | 📝 |
| **Total** | **48** | **100%** | **🟡** |

### Cobertura por Prioridade
| **Prioridade** | **Casos** | **% Total** | **Implementados** |
|----------------|-----------|-------------|-------------------|
| **Crítica** | 8 | 17% | 3 (38%) |
| **Alta** | 32 | 67% | 9 (28%) |
| **Média** | 6 | 12% | 0 (0%) |
| **Baixa** | 2 | 4% | 0 (0%) |

---

## Critérios de Aprovação por Versão

### v0.1 - Authentication (Completo)
- [x] 100% dos casos de login passando
- [x] JWT tokens válidos gerados  
- [x] Permissões básicas funcionando
- [x] Performance < 200ms
- [x] 0 vulnerabilidades críticas

### v0.2 - Authentication Extended (Em Progresso)
- [ ] Registro de usuários funcionando
- [ ] Validações de negócio implementadas
- [ ] Rate limiting básico
- [ ] Logs de auditoria

### v0.3 - Users CRUD (Planejado)
- [ ] CRUD completo funcionando
- [ ] Permissões por role validadas
- [ ] Paginação implementada
- [ ] Validações de dados

### v0.4 - Medicines CRUD (Planejado)  
- [ ] CRUD funcionando para Admin/Farmacêutico
- [ ] Consulta para todos os perfis
- [ ] Validação de código único
- [ ] Integração com estoque

### v0.5 - Stock Management (Planejado)
- [ ] Entrada/saída funcionando
- [ ] Saldos calculados corretamente
- [ ] Validações de disponibilidade
- [ ] Alertas de estoque baixo

### v0.6 - Patients (Planejado)
- [ ] CRUD para Admin/Farmacêutico
- [ ] Validações de CPF
- [ ] Compliance LGPD básica
- [ ] Histórico de pacientes

### v0.7 - Reports (Planejado)
- [ ] Relatórios básicos funcionando
- [ ] Dashboard operacional
- [ ] Validação de períodos
- [ ] Performance adequada

### v0.8 - Security (Planejado)
- [ ] Todas as permissões validadas
- [ ] JWT lifecycle completo
- [ ] Rate limiting funcionando
- [ ] Logs de auditoria completos

### v0.9 - Regression (Planejado)
- [ ] Smoke test 100% passando
- [ ] Performance validada
- [ ] Integridade de dados confirmada
- [ ] 0 regressões detectadas

### v1.0 - Release (Planejado)
- [ ] Fluxos E2E completos
- [ ] Teste de recuperação passando
- [ ] Documentação completa
- [ ] Sign-off de stakeholders

---

## Checklist de Qualidade

### Por Caso de Teste
- [ ] Pré-condições claramente definidas
- [ ] Passos executáveis e detalhados  
- [ ] Resultado esperado específico
- [ ] Dados de teste incluídos
- [ ] Critérios de aceitação definidos
- [ ] Automação implementada
- [ ] Evidências geradas
- [ ] Review técnico aprovado

### Por Módulo
- [ ] Cobertura funcional > 80%
- [ ] Cenários negativos incluídos
- [ ] Testes de permissão implementados
- [ ] Performance validada
- [ ] Integração testada
- [ ] Documentação atualizada

### Release Final
- [ ] 100% casos críticos passando
- [ ] Performance SLA atendido
- [ ] 0 vulnerabilidades críticas
- [ ] Cobertura geral > 80%
- [ ] Fluxos E2E validados
- [ ] Documentação completa
- [ ] Evidências organizadas
- [ ] Stakeholder sign-off

---

## Gaps e Riscos Identificados

### Gaps de Cobertura
| **Área** | **Gap** | **Impacto** | **Plano de Mitigação** |
|----------|---------|-------------|------------------------|
| **API Versioning** | Sem testes de compatibilidade | Médio | Adicionar em v1.1 |
| **Backup/Recovery** | Procedimentos não testados | Alto | Casos manuais em v0.9 |
| **Logging** | Estrutura não validada | Baixo | Review em v0.8 |
| **Monitoring** | Alertas não testados | Médio | Validação em v0.9 |

### Riscos Técnicos
| **Risco** | **Probabilidade** | **Impacto** | **Mitigação** |
|-----------|-------------------|-------------|---------------|
| **Database Performance** | Média | Alto | Load testing em v0.9 |
| **Token Security** | Baixa | Crítico | Security review em v0.8 |
| **API Breaking Changes** | Alta | Alto | Versionamento semântico |
| **Third-party Dependencies** | Média | Médio | Dependency audit |

---

## Responsabilidades e Aprovações

### Matriz RACI
| **Atividade** | **QA Lead** | **Dev Team** | **Security** | **PO** |
|---------------|-------------|--------------|--------------|--------|
| **Definir casos** | R, A | C | C | I |
| **Implementar testes** | A | R | C | I |
| **Executar testes** | R | C | R | I |
| **Analisar resultados** | R, A | C | C | C |
| **Aprovar release** | C | I | C | R, A |

### Aprovações Necessárias
| **Versão** | **QA** | **Dev Lead** | **Security** | **Product** |
|------------|---------|--------------|--------------|-------------|
| **v0.1-v0.7** | Rafael Z. | [Nome] | - | - |
| **v0.8** | Rafael Z. | [Nome] | [Nome] | - |
| **v0.9-v1.0** | Rafael Z. | [Nome] | [Nome] | [Nome] |

---

**Versão:** 1.0  
**Última Atualização:** ${new Date().toLocaleDateString('pt-BR')}  
**Autor:** Rafael Zanella  
**Total Requisitos:** 40  
**Total Casos:** 48  
**Cobertura Global:** 120% (incluindo cenários negativos)
