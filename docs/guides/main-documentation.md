# Testes Automatizados - Clinix API

Bem-vindo ao projeto de **testes automatizados** da **Clinix API**! Este repositório contém toda a infraestrutura de qualidade, casos de teste, evidências e documentação para garantir a excelência do sistema de gestão hospitalar.

## 📂 Estrutura do Projeto

```
clinix-api-tests/
├── 📄 README.md                    # Este arquivo - Navegação principal
├── 📁 src/
│   └── 📁 docs/                    # Documentação técnica completa
│       ├── 📄 README.md            # Overview da documentação
│       └── 📁 testing/             # Documentação específica de testes
│           ├── 📄 README.md        # Overview dos testes
│           ├── 📁 plano-de-teste/  # Planejamento e estratégia
│           │   ├── 📄 test-plan.md
│           │   └── 📄 setup-guide.md
│           ├── 📁 casos-de-teste/  # Casos e matriz de rastreabilidade
│           │   ├── 📄 test-cases.md
│           │   └── 📄 test-matrix.md
│           ├── 📁 evidencias/      # Resultados e relatórios
│           │   └── 📄 README.md
│           ├── 📁 bugs/           # Gestão de bugs
│           │   ├── 📄 README.md
│           │   └── 📄 bug-template.md
│           └── 📄 glossary.md     # Termos técnicos
├── 📁 tests/                      # Código dos testes automatizados
├── 📁 utils/                      # Utilitários e helpers
├── 📁 scripts/                    # Scripts de automação
├── 📁 configs/                    # Configurações das ferramentas
├── 📁 reports/                    # Relatórios gerados
├── 📁 evidence/                   # Evidências de execução
└── 📁 logs/                      # Logs de execução
```

---

## Quick Start

### Instalação e Configuração
```bash
# 1. Clone o repositório
git clone https://github.com/clinix/api-tests.git
cd clinix-api-tests

# 2. Instale dependências
npm install

# 3. Configure ambiente
cp .env.example .env
# Edite .env com suas configurações

# 4. Execute health check
npm run health-check

# 5. Execute smoke test
npm run test:smoke
```

### Primeiros Testes
```bash
# Testar apenas autenticação (v0.1)
npm run test:auth

# Executar todos os testes com relatório
npm run test:report

# Ver resultados no navegador
open reports/mochawesome.html
```

---

## Documentação Principal

### [Plano de Testes](./src/docs/testing/plano-de-teste/test-plan.md)
Estratégia completa, ferramentas, cronograma e critérios de qualidade baseados em **ISTQB** e **ISO/IEC 25010:2023**.

### [Casos de Teste](./src/docs/testing/casos-de-teste/test-cases.md)  
48 casos de teste detalhados organizados por módulo (v0.1 → v1.0), cobrindo cenários funcionais, negativos e de segurança.

### [Matriz de Rastreabilidade](./src/docs/testing/casos-de-teste/test-matrix.md)
Mapeamento completo entre requisitos e casos de teste, garantindo 100% de cobertura funcional.

### [Guia de Setup](./src/docs/testing/plano-de-teste/setup-guide.md)
Configuração detalhada do ambiente, dependências, dados de teste e troubleshooting.

### [Evidências](./src/docs/testing/evidencias/README.md)
Relatórios de execução, métricas de qualidade, dashboards e histórico de evidências.

### [Bug Reports](./src/docs/testing/bugs/README.md)
Gestão completa de bugs com templates, processos, métricas e workflow de resolução.

### [Glossário](./src/docs/testing/glossary.md)
Definições de 100+ termos técnicos, siglas e conceitos utilizados no projeto.

---

## Status Atual

### Progresso por Versão
| Versão | Módulo | Casos | Implementados | Taxa | Status |
|--------|---------|-------|---------------|------|--------|
| **v0.1** | Authentication | 9 | 9 | 100% | Completo |
| **v0.2** | Auth Extended | 3 | 2 | 67% | Em progresso |
| **v0.3** | Users CRUD | 10 | 0 | 0% | Planejado |
| **v0.4** | Medicines | 7 | 0 | 0% | Planejado |
| **v0.5** | Stock | 4 | 0 | 0% | Planejado |
| **v0.6** | Patients | 4 | 0 | 0% | Planejado |
| **v0.7** | Reports | 3 | 0 | 0% | Planejado |
| **v0.8** | Security | 5 | 0 | 0% | Planejado |
| **v0.9** | Regression | 3 | 0 | 0% | Planejado |
| **v1.0** | Release | 1 | 0 | 0% | Planejado |

### Métricas de Qualidade
| Métrica | Meta | Atual | Status |
|---------|------|-------|--------|
| **Pass Rate** | ≥ 95% | 100% | ✅ |
| **Coverage** | ≥ 80% | 85% | ✅ |
| **Response Time** | ≤ 200ms | 145ms | ✅ |
| **Bugs Críticos** | 0 | 1 | 🔴 |
| **Casos Implementados** | 48 | 12 | 🟡 |

---

## Ferramentas Utilizadas

### Stack Principal
| Ferramenta | Versão | Propósito |
|------------|--------|-----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **Mocha** | 10.x | Framework de testes |
| **Chai** | 4.x | Biblioteca de asserções |
| **Supertest** | 6.x | Testes de API HTTP |
| **Mochawesome** | 7.x | Relatórios HTML |
| **k6** | latest | Testes de performance |
| **ESLint** | 8.x | Qualidade de código |

### Padrões e Metodologias
- **ISTQB** - Padrões internacionais de teste
- **ISO/IEC 25010:2023** - Modelo de qualidade
- **OWASP** - Segurança de aplicações web
- **VADER** - Heurística para APIs REST
- **Shift-Left** - Testes antecipados no ciclo

---

## Comandos Principais

### Execução de Testes
```bash
# Todos os testes
npm test

# Por módulo
npm run test:auth          # Autenticação
npm run test:users         # Usuários
npm run test:medicines     # Medicamentos
npm run test:security      # Segurança

# Por tipo
npm run test:smoke         # Testes críticos básicos
npm run test:regression    # Testes de regressão
npm run test:e2e          # End-to-end

# Com relatórios
npm run test:report        # Gerar relatório HTML
npm run test:coverage     # Com cobertura de código
```

### Performance e Carga
```bash
# Testes de performance
npm run perf:load         # Teste de carga normal
npm run perf:stress       # Teste de stress
npm run perf:spike        # Teste de picos

# Resultados em: ./reports/k6/
```

### Utilitários
```bash
# Setup e configuração
npm run setup             # Configuração completa
npm run health-check      # Verificar conectividade
npm run setup:data        # Popular dados de teste

# Limpeza
npm run clean             # Limpar caches e reports
npm run clean:reports     # Apenas relatórios
npm run clean:evidence    # Apenas evidências

# Qualidade de código
npm run lint              # Verificar código
npm run format            # Formatar código
```

---

## Cenários de Uso

### Desenvolvedor Frontend
```bash
# Verificar se API está funcional
npm run test:smoke

# Testar endpoint específico antes de integração
npm run test:auth

# Verificar mudanças não quebraram nada
npm run test:regression
```

### QA Tester
```bash
# Execução completa diária
npm run test:report

# Investigar falhas
npm run test:auth -- --reporter spec --bail

# Validar correção de bug
npm run test -- --grep "TC-001"
```

### DevOps/CI-CD
```bash
# Pipeline de testes
npm run ci                # Lint + Tests + Performance

# Deploy validation
npm run test:smoke        # Validação pós-deploy

# Métricas para dashboard
npm run test:report && npm run metrics:export
```

---

## Roadmap e Entregas

### Próximas Entregas
| Data | Versão | Entregáveis | Responsável |
|------|--------|-------------|-------------|
| **20/01** | v0.2 | Auth Extended + Users CRUD | Rafael Z. |
| **25/01** | v0.3 | Medicines + Stock | TBD |
| **30/01** | v0.4 | Patients + Reports | TBD |
| **05/02** | v0.5 | Security + Performance | TBD |
| **10/02** | v1.0 | Release Candidate | All Team |

### Marcos Importantes
- **M1** ( ): Authentication 100% funcional
- **M2** ( ): CRUD completo validado
- **M3** ( ): Performance dentro do SLA
- **M4** ( ): Segurança aprovada
- **M5** ( ): Release pronto para produção

---

## Como Contribuir

### Para Novos Testadores
1. **Leia** a [documentação completa](./src/docs/testing/)
2. **Configure** ambiente seguindo o [setup guide](./src/docs/testing/plano-de-teste/setup-guide.md)
3. **Execute** health check e smoke tests
4. **Escolha** um caso de teste para implementar
5. **Siga** as convenções de código e commit

### Para Desenvolvedores da API
1. **Execute** smoke tests antes de commits
2. **Rode** testes de regressão após mudanças
3. **Reporte** bugs usando o [template](./src/docs/testing/bugs/bug-template.md)
4. **Colabore** com feedback nos casos de teste

### Padrões de Contribuição
```bash
# Branch naming
feature/TC-XXX-description
bugfix/BUG-XXX-description
test/vX.X-module-name

# Commit messages
feat: implement TC-001 admin login test
fix: resolve timeout issue in TC-017
test: add negative scenarios for authentication

# Pull Request
- Link para caso de teste implementado
- Evidências de execução incluídas
- Code review aprovado
- CI pipeline passando
```

---

## Monitoramento e Observabilidade

### Dashboards Disponíveis
- **Quality Dashboard**: Métricas em tempo real de qualidade
- **Performance Monitor**: Tempos de resposta e throughput
- **Bug Tracker**: Status e tendências de bugs
- **Coverage Report**: Cobertura funcional e de código

### Alertas Configurados
- **Critical**: Pass rate < 90% ou bug crítico encontrado
- **Warning**: Performance > 300ms ou > 5 bugs medium
- **Info**: Nova versão de teste disponível

### Métricas Coletadas
- Taxa de aprovação por módulo
- Tempo de execução por caso de teste
- Cobertura funcional vs requisitos
- Descoberta e resolução de bugs
- Performance trends ao longo do tempo

---

## Suporte e Contatos

### Equipe Principal
- **QA Lead**: Rafael Zanella - rafael.zanella@clinix.com
- **Automation**: [Nome] - [email]
- **Performance**: [Nome] - [email]
- **Security**: [Nome] - [email]

### Canais de Comunicação
- **Slack**: #qa-clinix-api (discussões gerais)
- **Slack**: #qa-bugs (reportar e acompanhar bugs)
- **Email**: qa-team@clinix.com (oficial)
- **GitHub**: Issues para bugs e melhorias

### Horários de Suporte
- **Business Hours**: 8h-18h (UTC-3)
- **Critical Issues**: 24/7 via Slack
- **Response Time**: 2h (critical), 24h (normal)

---

## Recursos Adicionais

### Documentação Externa
- [Mocha Documentation](https://mochajs.org/)
- [Chai Assertion Library](https://www.chaijs.com/)
- [k6 Performance Testing](https://k6.io/docs/)
- [Supertest API Testing](https://github.com/visionmedia/supertest)

### Padrões e Normas
- [ISTQB Testing Standards](https://www.istqb.org/)
- [ISO/IEC 25010 Quality Model](https://iso25000.com/index.php/en/iso-25000-standards/iso-25010)
- [OWASP API Security](https://owasp.org/www-project-api-security/)

### Artigos e Guias
- [API Testing Best Practices](https://blog.postman.com/api-testing-best-practices/)
- [JWT Security Guidelines](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [Performance Testing with k6](https://k6.io/docs/test-types/)

---

## TL;DR - Início Rápido

```bash
# Setup em 5 minutos
git clone https://github.com/clinix/api-tests.git
cd clinix-api-tests
npm install
cp .env.example .env
# Editar .env com configurações da API

# Primeiro teste
npm run health-check
npm run test:smoke

# Ver resultados
open reports/mochawesome.html

# Implementar novo teste
cp src/docs/testing/casos-de-teste/test-cases.md tests/
# Seguir template dos casos TC-001 a TC-048
```

### Arquivos Essenciais para Começar
1. [Plano de Testes](./src/docs/testing/plano-de-teste/test-plan.md) - Visão geral e estratégia
2. [Setup Guide](./src/docs/testing/plano-de-teste/setup-guide.md) - Configuração passo-a-passo
3. [Casos de Teste](./src/docs/testing/casos-de-teste/test-cases.md) - O que implementar
4. [Glossário](./src/docs/testing/glossary.md) - Entender a terminologia

---

## Qualidade e Reconhecimentos

### Padrões Seguidos
- **ISTQB Foundation Level** compliant
- **ISO/IEC 25010:2023** quality model
- **OWASP API Security Top 10** coverage
- **Semantic Versioning** for releases
- **Conventional Commits** for changes

### Certificações Alvo
- ISTQB Test Automation Engineer
- Security+ API Testing
- Performance Testing Certification

---

* Se este projeto te ajudou, considere dar uma estrela no GitHub!**

**Última Atualização:** ${new Date().toLocaleDateString('pt-BR')}  
**Versão da Documentação:** 1.0  
**Total de Casos de Teste:** 48  
**Cobertura Atual:** 85%  
**Status:** Ativo e em desenvolvimento
