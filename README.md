# Clinix API Testing

Este repositório contém a suíte de **testes automatizados** para a API Clinix. Aqui você encontra testes funcionais, de performance, documentação de qualidade, evidências e templates para garantir a excelência do sistema de gestão hospitalar.

⚠️ **Atenção:**
A API que será testada **NÃO está neste repositório**. Você deve clonar e executar a API separadamente a partir do repositório oficial:
[https://github.com/rafaelzanella17/clinix-api](https://github.com/rafaelzanella17/clinix-api)

---


---


## Visão Geral
Este projeto contém:
- **Pasta `docs/`**: documentação detalhada do projeto.
- **Pasta `tests/`**: testes automatizados de API usando Mocha, Chai e Supertest.
- **Pasta `performance/`**: scripts e relatórios de testes de performance utilizando k6.

Os relatórios de testes funcionais são gerados automaticamente com Mochawesome.

## Pré-requisitos
- Node.js >= 22
- npm >= 10
- [k6](https://k6.io/) instalado globalmente para testes de performance


## Instalação
```bash
# Clone este repositório
git clone https://github.com/rafaelzanella17/clinix-api-testing.git
cd clinix-api-testing

# Instale as dependências
npm install
```

## Configuração de Ambiente
1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edite o arquivo `.env` e preencha as variáveis:
   - `BASE_URL` (ex: http://localhost:3000)
   - `DEFAULT_PASSWORD` (senha padrão dos usuários de teste)
   
   > **Atenção:** A senha padrão dos usuários de teste é **clinix** (conforme o README da API [clinix-api](https://github.com/rafaelzanella17/clinix-api)).

3. As variáveis também podem ser definidas diretamente no ambiente do sistema.

## Execução dos Testes

### Testes Funcionais (Mocha, Chai, Supertest)
```bash
npm test
```
- Executa todos os testes em `src/tests/**/*.test.js`
- Gera relatório HTML em `mochawesome-report/mochawesome.html`


### Testes de Performance (k6)
```bash
npm run k6
```
- Executa o teste de carga localizado em `src/performance/k6/authentication/authentication-load-test.js`
- O relatório HTML do k6 é gerado em `src/performance/k6/reports/result.html`.
- **Atenção:** Há também uma pasta `performance/reports/` (sem o `k6/`), onde podem ser armazenados relatórios adicionais de performance.

## Relatórios
- **Testes de API:** Gerados automaticamente pelo Mochawesome em `mochawesome-report/mochawesome.html` (abra no navegador).
- **Testes de performance (k6):** Relatórios HTML ficam na pasta `performance/reports/`.


## Documentação
A documentação completa está disponível na pasta `docs/` na raiz do projeto.

## Padrões e Referências
- **ISTQB**, **ISO/IEC 25010:2023**, **OWASP Top 10**
- Versionamento semântico
- Metodologias: Shift-Left, Risk-Based Testing

---

**Mantenedor:** Rafael Zanella | QA

**Última atualização:** 22/08/2025
