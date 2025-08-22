# Evidências de Execução - Clinix API

Este diretório centraliza todas as **evidências de execução** dos testes, incluindo relatórios, logs, métricas e histórico de qualidade.

## Estrutura de Evidências

```
evidence/
├── 📁 execution-history/     # Histórico de execuções por data
│   ├── 2024-01-15/
│   ├── 2024-01-16/
│   └── latest/              # Link simbólico para mais recente
├── 📁 performance/          # Resultados de testes de performance
│   ├── load-tests/
│   ├── stress-tests/
│   └── reports/
├── 📁 security/            # Evidências de testes de segurança
│   ├── owasp-reports/
│   ├── vulnerability-scans/
│   └── penetration-tests/
├── 📁 dashboards/          # Dashboards e métricas visuais
│   ├── quality-trends/
│   ├── execution-metrics/
│   └── coverage-reports/
├── 📁 screenshots/         # Capturas de tela (se aplicável)
├── 📁 logs/               # Logs detalhados de execução
│   ├── test-execution.log
│   ├── api-responses.log
│   └── error-details.log
└── 📁 artifacts/          # Artefatos diversos (JSONs, CSVs, etc.)
```

---

## Tipos de Evidências Coletadas

### 1. Relatórios de Execução Automatizada
- **Mochawesome Reports** - Relatórios HTML detalhados
- **Coverage Reports** - Cobertura de código e funcional
- **JUnit XML** - Formato compatível com CI/CD
- **JSON Results** - Dados estruturados para análise

### 2. Métricas de Performance
- **k6 Reports** - Testes de carga e stress
- **Response Time Trends** - Evolução dos tempos de resposta
- **Throughput Metrics** - Capacidade de processamento
- **Resource Utilization** - Uso de CPU, memória, rede

### 3. Evidências de Segurança
- **OWASP ZAP Scans** - Relatórios de vulnerabilidades
- **JWT Token Analysis** - Validação de tokens de segurança
- **Permission Matrix** - Validação de controle de acesso
- **Audit Logs** - Logs de auditoria de segurança

### 4. Dashboards e Visualizações
- **Quality Trends** - Evolução da qualidade ao longo do tempo
- **Test Execution Metrics** - KPIs de execução
- **Bug Discovery Rate** - Taxa de descoberta de bugs
- **Pass/Fail Rates** - Taxas de sucesso por módulo

---

## Convenções de Nomenclatura

### Por Data de Execução
```
YYYY-MM-DD_HH-MM-SS_[tipo]_[versao]
Exemplo: 2024-01-15_14-30-45_smoke_v0.1
```

### Por Tipo de Teste
```
[tipo]-[modulo]-[data]
Exemplos:
- functional-auth-2024-01-15
- performance-load-2024-01-15  
- security-owasp-2024-01-15
- e2e-full-2024-01-15
```

### Por Versão da API
```
v[major].[minor]-[tipo]-[timestamp]
Exemplo: v0.1-regression-20240115-1430
```

---

## Template de Evidência de Execução

### Relatório de Execução Padrão
```markdown
# Relatório de Execução - Clinix API

**Data/Hora:** 2024-01-15 14:30:45  
**Versão API:** v0.1  
**Ambiente:** Test  
**Executor:** Rafael Zanella  
**Duração Total:** 5m 32s  

## Resumo Executivo
- **Total de Testes:** 48
- **Passou:** 46 (95.8%)
- **Falhou:** 2 (4.2%)
- **Ignorados:** 0 (0%)
- **Cobertura:** 85%

## Testes por Módulo
| Módulo | Total | Passou | Falhou | Taxa |
|---------|-------|---------|--------|------|
| Authentication | 9 | 9 | 0 | 100% |
| Users | 10 | 8 | 2 | 80% |
| Medicines | 7 | 7 | 0 | 100% |
| Stock | 4 | 4 | 0 | 100% |
| Security | 11 | 11 | 0 | 100% |

## Performance
- **Response Time Médio:** 145ms
- **95º Percentil:** 280ms
- **Throughput:** 1,200 req/min
- **Error Rate:** 0.1%

## Falhas Detectadas
1. **TC-014** - Usuário comum lista usuários
   - Status: FAIL
   - Motivo: Retornou 200 ao invés de 403
   - Severidade: Alta
   - Bug: BUG-001

2. **TC-017** - Editar usuário inexistente  
   - Status: FAIL
   - Motivo: Timeout na requisição
   - Severidade: Média
   - Bug: BUG-002

## Ações Requeridas
- [ ] Corrigir permissões no endpoint GET /users
- [ ] Investigar timeout no endpoint PUT /users/{id}
- [ ] Re-executar testes após correções

## 📎 Anexos
- [Relatório Detalhado HTML](./mochawesome-report.html)
- [Coverage Report](./coverage/index.html)
- [Performance Results](./k6-results.json)
- [Logs Completos](./execution.log)
```

---

## Métricas de Qualidade Rastreadas

### KPIs Principais
| Métrica | Meta | Atual | Status |
|---------|------|-------|--------|
| **Pass Rate** | ≥ 95% | 95.8% | ✅ |
| **Coverage** | ≥ 80% | 85% | ✅ |
| **Response Time** | ≤ 200ms | 145ms | ✅ |
| **Error Rate** | ≤ 0.5% | 0.1% | ✅ |
| **Bug Discovery** | ≤ 5 bugs/release | 2 bugs | ✅ |

### Tendências Históricas
```
2024-01-10: Pass Rate 92% → Coverage 78%
2024-01-12: Pass Rate 94% → Coverage 82%  
2024-01-15: Pass Rate 96% → Coverage 85%
Trend: ↗️ Melhorando consistentemente
```

---

## Como Acessar Evidências

### Execução Mais Recente
```bash
# Via linha de comando
cd evidence/latest

# Via navegador
open evidence/latest/mochawesome-report.html
```

### Execução Específica
```bash
# Por data
cd evidence/execution-history/2024-01-15

# Por tipo
cd evidence/performance/load-tests/latest
```

### Dashboard Online
```bash
# Servidor local de evidências
npm run evidence:serve
# Acesse: http://localhost:8080
```

---

## Automação de Evidências

### Geração Automática
```yaml
# .github/workflows/tests.yml
name: Generate Test Evidence
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Run Tests
        run: npm run test:report
      
      - name: Generate Evidence
        run: npm run evidence:generate
        
      - name: Upload Evidence
        uses: actions/upload-artifact@v3
        with:
          name: test-evidence
          path: evidence/latest/
```

### Scripts de Geração
```javascript
// scripts/generate-evidence.js
const fs = require('fs');
const path = require('path');

function generateEvidence() {
  const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
  const evidenceDir = `evidence/execution-history/${timestamp}`;
  
  // Criar diretório
  fs.mkdirSync(evidenceDir, { recursive: true });
  
  // Copiar relatórios
  fs.copyFileSync('reports/mochawesome.html', `${evidenceDir}/report.html`);
  fs.copyFileSync('reports/test-results.json', `${evidenceDir}/results.json`);
  
  // Atualizar link 'latest'
  fs.rmSync('evidence/latest', { force: true, recursive: true });
  fs.symlinkSync(evidenceDir, 'evidence/latest');
  
  console.log(`Evidências geradas em: ${evidenceDir}`);
}
```

---

## Checklist de Evidências

### Por Execução de Teste
- [ ] Relatório HTML gerado (Mochawesome)
- [ ] Resultados JSON estruturados
- [ ] Logs de execução salvos
- [ ] Screenshots de falhas (se aplicável)
- [ ] Métricas de performance coletadas
- [ ] Coverage report gerado
- [ ] Summary executivo criado

### Por Release (v1.0)
- [ ] Evidências de todos os módulos
- [ ] Testes de regressão completos
- [ ] Relatórios de segurança
- [ ] Testes de performance validados
- [ ] Documentação de bugs conhecidos
- [ ] Sign-off de stakeholders
- [ ] Arquivo de evidências compactado

### Retenção de Dados
- [ ] Últimas 30 execuções mantidas localmente
- [ ] Evidências de releases arquivadas permanentemente
- [ ] Logs sensíveis sanitizados
- [ ] Backups em storage externo (se configurado)

---

## Segurança e Privacidade

### Dados Sensíveis
- **Tokens JWT** são mascarados nos logs
- **Senhas** nunca aparecem em evidências
- **CPFs** são parcialmente ocultados
- **Dados de pacientes** são anonimizados

### Controle de Acesso
- Evidências acessíveis apenas à equipe QA
- Relatórios executivos podem ser compartilhados
- Logs detalhados requerem permissão específica

---

## Suporte e Manutenção

### Limpeza Automática
```bash
# Limpar evidências antigas (> 30 dias)
npm run evidence:cleanup

# Limpar apenas logs
npm run logs:cleanup

# Arquivar evidências importantes
npm run evidence:archive
```

### Troubleshooting
**Problema:** Evidências não sendo geradas  
**Solução:** Verificar permissões da pasta evidence/

**Problema:** Relatórios HTML não abrem  
**Solução:** Verificar se mochawesome está instalado

**Problema:** Dashboard não carrega  
**Solução:** Executar `npm run evidence:serve`

---

**Próximos Passos:**
1. Configure geração automática: `npm run setup:evidence`
2. Execute primeiro teste: `npm run test:report`
3. Visualize evidências: `open evidence/latest/report.html`
4. Configure CI/CD para evidências automáticas

---

**Versão:** 1.0  
**Última Atualização:** ${new Date().toLocaleDateString('pt-BR')}  
**Mantido por:** Equipe QA Clinix  
**Retenção:** 30 dias (local), permanente (releases)
