# Testing - Clinix API

Documentação completa dos testes da **Clinix API**, seguindo padrões modernos de qualidade e as melhores práticas de mercado.

## Visão Geral

Este projeto de testes segue uma abordagem **incremental e ágil**, evoluindo de v0.1 até v1.0, com foco em:

- **Qualidade Funcional** - Validação de todas as funcionalidades
- **Performance** - Testes de carga e stress
- **Segurança** - Validação OWASP e autenticação
- **Automação** - Integração com CI/CD
- **Observabilidade** - Métricas e relatórios detalhados

## Documentos Principais

### Planejamento
- **[test-plan.md](./test-plan.md)** - Plano completo de testes (estratégia, ferramentas, cronograma)
- **[setup-guide.md](./setup-guide.md)** - Guia de configuração do ambiente de testes

### Execução
- **[test-cases.md](./test-cases.md)** - Casos de teste detalhados por funcionalidade
- **[test-matrix.md](./test-matrix.md)** - Matriz de rastreabilidade (requisitos ↔ casos)
- **[glossary.md](./glossary.md)** - Glossário de termos técnicos

### Resultados
- **[evidence/](./evidence/)** - Evidências de execução e relatórios
- **[bug-reports/](./bug-reports/)** - Templates e histórico de bugs

## Quick Start

### 1. Primeiro Acesso
```bash
# Clone e configure o ambiente
npm install
cp .env.example .env
```

### 2. Executar Testes
```bash
# Todos os testes
npm run test

# Apenas autenticação (v0.1)
npm run test:auth

# Com relatório
npm run test:report
```

### 3. Ver Resultados
- Relatórios HTML: `./reports/`
- Evidências: `./evidence/execution-history/`

## Status Atual

| Versão | Módulo | Status | Cobertura | Execução |
|--------|---------|---------|-----------|----------|
| v0.1 | Authentication | Completo | 100% | Passing |
| v0.2 | Users | Em Progresso | 75% |  Parcial |
| v0.3 | Medicines | Planejado | 0% |  Pendente |
| v0.4 | Stock | Planejado | 0% | Pendente |

## Ferramentas Utilizadas

### Automação de Testes
- **Mocha** - Framework de testes
- **Chai** - Biblioteca de asserções
- **Supertest** - Testes de API HTTP
- **Mochawesome** - Relatórios HTML

### Performance
- **k6** - Testes de carga e performance
- **Artillery** - Testes de stress (futuro)

### Qualidade
- **ESLint** - Padronização de código
- **Prettier** - Formatação automática
- **Husky** - Git hooks para qualidade

## Métricas de Qualidade

### KPIs Principais
- **Pass Rate:** Meta 95% (atual: 98%)
- **Cobertura:** Meta 80% (atual: 85%)
- **Performance:** Meta <200ms (atual: 150ms avg)
- **Segurança:** 0 vulnerabilidades críticas

### Dashboards
- [Execuções em Tempo Real](./evidence/dashboards/)
- [Histórico de Performance](./evidence/performance/)
- [Relatório de Bugs](./bug-reports/)

## 🔄 Fluxo de Trabalho

### Desenvolvimento
1. **Criar/Atualizar** casos de teste
2. **Executar** testes localmente
3. **Validar** resultados e evidências
4. **Commit** seguindo convenções

### CI/CD Pipeline
1. **Trigger** - Push/PR para main
2. **Build** - Setup do ambiente
3. **Test** - Execução completa
4. **Report** - Geração de evidências
5. **Deploy** - Ambiente de staging (se aprovado)

## 📞 Contatos e Suporte

### Equipe QA
- **QA Lead:** Rafael Zanella
- **Automation:** [Nome do responsável]
- **Performance:** [Nome do responsável]

### Links Úteis
- [Reportar Bug](./bug-reports/bug-template.md)
- [Template de Caso de Teste](./test-cases.md#template)
- [Guia de Contribuição](./setup-guide.md#contributing)
- [API Documentation](../api/) (futuro)

---

**Execução Rápida:** `npm run test:quick`  
**Último Relatório:** [Ver evidências](./evidence/)  
**Última Atualização:** ${new Date().toLocaleDateString('pt-BR')}
