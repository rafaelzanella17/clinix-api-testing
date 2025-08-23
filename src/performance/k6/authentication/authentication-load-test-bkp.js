import http from 'k6/http';
import { check, sleep } from 'k6';

const users = [
  { email: 'admin@clinix.com', password: 'clinix', role: 'admin' },
  { email: 'farmaceutico@clinix.com', password: 'clinix', role: 'farmaceutico' },
  { email: 'usuario@clinix.com', password: 'clinix', role: 'usuario' }
];

// Ajuste a URL conforme seu ambiente
const BASE_URL = 'http://localhost:3000/api';

export const options = {
  stages: [
    { duration: '30s', target: 5 },   // Começar mais devagar para debug
    { duration: '1m', target: 5 },    
    { duration: '20s', target: 0 },   
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // Aumentei para 2s
    http_req_failed: ['rate<0.2'],      // Aumentei tolerância para 20%
  },
};

export default function() {
  const user = users[Math.floor(Math.random() * users.length)];
  
  const payload = JSON.stringify({
    email: user.email,
    password: user.password
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(`${BASE_URL}/authentication/login`, payload, params);

  // DEBUG: Vamos ver o que está vindo na resposta
  console.log(`=== DEBUG USER: ${user.role} ===`);
  console.log(`Status: ${response.status}`);
  console.log(`Response Body: ${response.body}`);
  console.log(`Headers: ${JSON.stringify(response.headers)}`);
  
  // Verificar se resposta é JSON válido
  let responseData = null;
  let isValidJson = false;
  
  try {
    responseData = response.json();
    isValidJson = true;
    console.log(`Parsed JSON:`, JSON.stringify(responseData));
  } catch (error) {
    console.log(`❌ Erro ao fazer parse JSON: ${error}`);
    isValidJson = false;
  }

  // Checks mais seguros
  const checks = check(response, {
    'Status é 200': (r) => r.status === 200,
    'Response é JSON válido': (r) => isValidJson,
    'Resposta não está vazia': (r) => r.body && r.body.length > 0,
    'Tempo de resposta OK': (r) => r.timings.duration < 2000,
  });

  // Checks específicos do token (só se JSON for válido)
  if (isValidJson && responseData) {
    const tokenChecks = check(response, {
      'Tem propriedade data': (r) => responseData.hasOwnProperty('data'),
      'Data tem token': (r) => responseData.data && responseData.data.hasOwnProperty('token'),
      'Token existe': (r) => responseData.data && responseData.data.token !== undefined && responseData.data.token !== null,
      'Token não é vazio': (r) => responseData.data && responseData.data.token && responseData.data.token.length > 0,
    });
    
    if (tokenChecks && responseData.data && responseData.data.token) {
      console.log(`✅ Login ${user.role} sucesso: Token = ${responseData.data.token.substring(0, 10)}...`);
    } else {
      console.log(`❌ Problema com token para ${user.role}`);
      console.log(`Data object: ${JSON.stringify(responseData.data)}`);
      if (responseData.data) {
        console.log(`Token value: ${responseData.data.token}`);
      }
    }
  } else {
    console.log(`❌ Resposta inválida para ${user.role}`);
  }

  console.log(`==========================================\n`);

  sleep(Math.random() * 2 + 1);
}