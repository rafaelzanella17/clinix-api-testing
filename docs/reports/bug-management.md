# Bug Reports - Clinix API

Central de gestão e rastreamento de **bugs** identificados durante os testes da Clinix API, incluindo templates, processos e métricas de qualidade.

## Estrutura de Bug Reports

```
bug-reports/
├── 📄 README.md                    # Este arquivo (overview e processos)
├── 📄 bug-template.md              # Template padrão para novos bugs
├── 📄 bug-workflow.md              # Processo detalhado de gestão
├── 📁 active/                      # Bugs em aberto
│   ├── BUG-001-auth-login-500.md
│   ├── BUG-002-users-timeout.md
│   └── ...
├── 📁 resolved/                    # Bugs resolvidos
│   ├── 2024-01/
│   └── 2024-02/
├── 📁 evidence/                    # Evidências dos bugs
│   ├── screenshots/
│   ├── logs/
│   └── recordings/
├── 📁 metrics/                     # Métricas e análises
│   ├── bug-trends.json
│   ├── resolution-times.csv
│   └── quality-reports/
└── 📄 bugs-known.md               # Lista de bugs conhecidos
```

---

## Status dos Bugs Ativos

### Bugs Críticos (P1)
| ID | Título | Módulo | Data | Responsável | ETA |
|----|--------|--------|------|-------------|-----|
| BUG-001 | Login retorna 500 | Authentication | 15/01 | Dev Team | 16/01 |

### Bugs High Priority (P2)
| ID | Título | Módulo | Data | Responsável | ETA |
|----|--------|--------|------|-------------|-----|
| BUG-002 | Timeout em edição usuário | Users | 15/01 | Dev Team | 20/01 |

### Resumo por Módulo
| Módulo | Critical | High | Medium | Low | Total |
|--------|----------|------|---------|-----|-------|
| Authentication | 1 | 0 | 0 | 0 | 1 |
| Users | 0 | 1 | 2 | 1 | 4 |
| Medicines | 0 | 0 | 1 | 0 | 1 |
| **TOTAL** | **1** | **1** | **3** | **1** | **6** |

---

## Como Reportar um Bug

### Processo Rápido
1. **Identifique** o problema durante teste
2. **Reproduza** o erro pelo menos 2 vezes
3. **Documente** usando o [bug-template.md](./bug-template.md)
4. **Classifique** severidade e prioridade
5. **Notifique** a equipe via Slack `#qa-bugs`
6. **Acompanhe** resolução no arquivo do bug

### Informações Obrigatórias
- **Título claro** - Descreve o problema em uma frase
- **Passos de reprodução** - Sequência detalhada
- **Resultado esperado vs atual** - Comparação clara
- **Ambiente** - Onde ocorreu (test/staging/prod)
- **Evidências** - Logs, screenshots, requests/responses
- **Severidade** - Critical/High/Medium/Low
- **Caso de teste** - TC-XXX relacionado

### Template Quick Start
```bash
# Criar novo bug report
cp bug-template.md active/BUG-XXX-titulo-resumido.md

# Editar e preencher informações
nano active/BUG-XXX-titulo-resumido.md

# Notificar equipe
echo "Novo bug: BUG-XXX" | slack-notify #qa-bugs
```

---

## Sistema de Classificação

### Severidade (Impacto Técnico)
| Nível | Descrição | SLA Resolução | Exemplo |
|-------|-----------|---------------|---------|
| **Critical** | Sistema não funciona, dados corrompidos | < 24h | API completamente down |
| **High** | Funcionalidade principal quebrada | < 3 dias | Login não funciona |
| **Medium** | Funcionalidade secundária afetada | < 1 semana | Relatórios com dados errados |
| **Low** | Problema cosmético, melhoria | < 2 semanas | Mensagem de erro confusa |

### Prioridade (Urgência de Negócio)
| Nível | Descrição | Ação | Exemplo |
|-------|-----------|------|---------|
| **P1** | Fix imediato necessário | Interromper desenvolvimento | Falha de segurança |
| **P2** | Fix na próxima release | Incluir no sprint atual | Feature não funciona |
| **P3** | Fix quando possível | Backlog próximo sprint | Performance degradada |
| **P4** | Fix em versão futura | Backlog geral | Melhoria UX |

---

## Ciclo de Vida do Bug

### Estados Possíveis
```
[New] → [Confirmed] → [In Progress] → [Fixed] → [Verified] → [Closed]
   ↓         ↓            ↓            ↓         ↓
[Invalid] [Duplicate] [Won't Fix] [Reopened] [Deferred]
```

### Transições e Responsabilidades
| De | Para | Responsável | Ação |
|----|------|-------------|------|
| New | Confirmed | QA Lead | Validar reprodução |
| Confirmed | In Progress | Dev Team | Iniciar desenvolvimento |
| In Progress | Fixed | Dev Team | Deploy da correção |
| Fixed | Verified | QA Team | Validar correção |
| Verified | Closed | QA Lead | Confirmar resolução |

### Critérios por Estado
**Confirmed**
- Bug reproduzido em ambiente controlado
- Severidade e prioridade validadas
- Assignee definido

**Fixed**  
- Code review aprovado
- Deploy realizado em ambiente de test
- Unit tests adicionados/atualizados

**Verified**
- Caso de teste original passa
- Testes de regressão executados
- Nenhuma nova regressão identificada

---

## Métricas e Análises

### KPIs de Qualidade
| Métrica | Meta | Atual | Trend | Status |
|---------|------|-------|-------|--------|
| **Bugs/Release** | < 5 | 6 | ↗️ | 🟡 |
| **Critical Bugs** | 0 | 1 | → | 🔴 |
| **Resolution Time** | < 3 dias | 2.5 dias | ↘️ | ✅ |
| **Reopened Rate** | < 10% | 5% | ↘️ | ✅ |
| **First-Time Fix** | > 80% | 85% | ↗️ | ✅ |

### Tendências Históricas
```
Bug Discovery Trend (últimas 4 semanas):
Week 1: 8 bugs found
Week 2: 6 bugs found  
Week 3: 4 bugs found
Week 4: 6 bugs found
Trend: Estável com pequena redução
```

### Análise por Root Cause
| Categoria | Quantidade | % Total | Ação |
|-----------|------------|---------|------|
| **Validation** | 8 | 40% | Melhorar input validation |
| **Database** | 4 | 20% | Review queries e indexes |
| **Authentication** | 3 | 15% | Security review |
| **Performance** | 3 | 15% | Load testing |
| **Logic Error** | 2 | 10% | Code review process |

---

## Processo de Triagem

### Weekly Bug Triage Meeting
**Quando:** Toda terça, 14:00  
**Duração:** 30 minutos  
**Participantes:** QA Lead, Tech Lead, Product Owner  

**Agenda:**
1. Review novos bugs (5 min)
2. Priorizar bugs confirmed (10 min)
3. Review bugs fixed (10 min)
4. Métricas da semana (5 min)

### Critérios de Priorização
1. **Impacto nos usuários** (quantos são afetados)
2. **Criticidade da funcionalidade** (core vs nice-to-have)
3. **Complexidade da correção** (effort estimate)
4. **Workaround disponível** (tem solução temporária?)
5. **Risk de regressão** (mudança pode quebrar outras coisas?)

---

## Ferramentas e Automação

### Integração com GitHub Issues
```yaml
# .github/ISSUE_TEMPLATE/bug_report.yml
name: Bug Report
description: Report a bug found during testing
title: "[BUG] "
labels: ["bug", "needs-triage"]
body:
  - type: dropdown
    id: severity
    attributes:
      label: Severity
      options:
        - Critical
        - High  
        - Medium
        - Low
```

### Scripts de Automação
```javascript
// scripts/bug-metrics.js
function generateBugMetrics() {
  const activeBugs = glob.sync('bug-reports/active/*.md');
  const resolvedBugs = glob.sync('bug-reports/resolved/**/*.md');
  
  return {
    total_active: activeBugs.length,
    total_resolved: resolvedBugs.length,
    critical_count: activeBugs.filter(isCritical).length,
    avg_resolution_time: calculateAvgResolution(resolvedBugs)
  };
}
```

### Dashboard de Bugs
```bash
# Iniciar dashboard local
npm run bugs:dashboard

# Acessar em: http://localhost:3001
# - Lista de bugs ativos
# - Métricas em tempo real  
# - Gráficos de tendências
# - Export para Excel/PDF
```

---

## Templates Específicos

### Bug Crítico - Template Expresso
```markdown
# CRITICAL BUG - [Título]

**IMPACTO:** [Descrever impacto imediato]  
**USUÁRIOS AFETADOS:** [Todos/Admins/etc]  
**WORKAROUND:** [Sim/Não - descrever]  

**REPRODUÇÃO RÁPIDA:**
1. [Passo crítico 1]
2. [Resultado problemático]

**EVIDÊNCIA:**
[Request/Response ou screenshot]

**AÇÃO IMEDIATA NECESSÁRIA:** [O que precisa ser feito agora]
```

### Bug de Performance - Template
```markdown
# PERFORMANCE BUG - [Título]

**ENDPOINT:** [URL do endpoint afetado]  
**RESPONSE TIME:** [Atual vs Esperado]  
**LOAD SCENARIO:** [Quantos usuários, que operação]  

**MÉTRICAS:**
- Current: XXXms (p95)
- Expected: XXXms (p95)
- Degradation: XX% slower

**PERFORMANCE DATA:**
[Anexar k6 report ou similar]
```

---

## Bug Investigation Playbook

### Checklist de Investigação
- [ ] **Reproduzir** em ambiente limpo
- [ ] **Verificar logs** de aplicação e sistema
- [ ] **Analisar request/response** completos  
- [ ] **Testar cenários relacionados** (edge cases)
- [ ] **Verificar dados** de teste e estado do banco
- [ ] **Confirmar configuração** do ambiente
- [ ] **Revisar mudanças recentes** (git history)

### Ferramentas de Debug
- **Logs:** `tail -f logs/api.log | grep ERROR`
- **Database:** `psql -d clinix_test -c "SELECT * FROM users;"`
- **Network:** `curl -v -X POST https://api-test.clinix.com/auth/login`
- **Performance:** `k6 run --duration 30s --vus 1 debug-test.js`

---

## Escalação e Comunicação

### Notification Matrix
| Severidade | Slack Channel | Email | Phone |
|------------|---------------|-------|-------|
| **Critical** | #alerts + #qa-bugs | All hands | On-call Dev |
| **High** | #qa-bugs | QA + Tech Lead | - |
| **Medium** | #qa-bugs | QA Team | - |
| **Low** | #qa-bugs | - | - |

### SLA de Comunicação
- **Critical:** Notificação em 15 minutos
- **High:** Notificação em 2 horas
- **Medium/Low:** Notificação em 24 horas

### Escalação Timeline
```
Critical Bug Discovered
    ↓ (15 min)
QA Lead Notified
    ↓ (30 min)  
Tech Lead Assigns Developer
    ↓ (2 hours)
First Analysis Complete
    ↓ (4 hours)
Fix Implemented (or status update)
    ↓ (24 hours)
Resolution or Escalation to Management
```

---

## Knowledge Base

### Bugs Comuns e Soluções
| Sintoma | Causa Provável | Solução |
|---------|---------------|---------|
| 500 Internal Error | Database timeout | Check DB connections pool |
| 401 Unauthorized | JWT expired/invalid | Regenerate token |
| 404 Not Found | Route não registrada | Check API routing |
| Timeout | Query muito lenta | Optimize database query |

### Debugging Tips
1. **Sempre** reproduzir em ambiente limpo primeiro
2. **Verificar** logs imediatamente após reprodução
3. **Comparar** com último working version
4. **Testar** cenários similares para isolar problema
5. **Documentar** todos os passos de investigação

---

## Checklists

### Antes de Reportar Bug
- [ ] Tentei reproduzir pelo menos 2 vezes?
- [ ] Verifiquei se não é bug conhecido?
- [ ] Coletei todas as evidências necessárias?
- [ ] Classifiquei severidade corretamente?
- [ ] Identifiquei caso de teste relacionado?

### Antes de Fechar Bug
- [ ] Caso de teste original passa?
- [ ] Executei testes de regressão?
- [ ] Validei em ambiente apropriado?
- [ ] Documentei a solução aplicada?
- [ ] Comuniquei resolução para stakeholders?

---

**Quick Actions:**
- [Reportar Novo Bug](./bug-template.md)
- [Ver Dashboard](http://localhost:3001)  
- [Gerar Métricas](../scripts/bug-metrics.js)
- [Buscar Bugs](./active/)

---

**Versão:** 1.0  
**Última Atualização:** ${new Date().toLocaleDateString('pt-BR')}  
**Mantido por:** QA Team Clinix  
**Contato:** qa-bugs@clinix.com  
**Slack:** #qa-bugs
