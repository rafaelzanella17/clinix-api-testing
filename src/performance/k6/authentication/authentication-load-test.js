import http from 'k6/http';
import { check, sleep } from 'k6';


// Carregar os usuários
const users = JSON.parse(open('../../../fixtures/users.json'));

// Variáveis de ambiente do K6
const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/api';
const DEFAULT_PASSWORD = __ENV.DEFAULT_PASSWORD || 'clinix';

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 5 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.2'],
  },
};

export default function () {
  const roles = Object.keys(users);
  const role = roles[Math.floor(Math.random() * roles.length)];
  const user = users[role];

  const payload = JSON.stringify({
    email: user.email,
    password: DEFAULT_PASSWORD,
  });

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const response = http.post(`${BASE_URL}/authentication/login`, payload, params);

  let responseData = null;
  let isValidJson = false;

  try {
    responseData = response.json();
    isValidJson = true;
  } catch (error) {
    isValidJson = false;
  }

  check(response, {
    'Status é 200': (r) => r.status === 200,
    'Response é JSON válido': () => isValidJson,
    'Resposta não está vazia': (r) => r.body && r.body.length > 0,
    'Tempo de resposta OK': (r) => r.timings.duration < 2000,
  });

  if (isValidJson && responseData) {
    check(response, {
      'Tem propriedade data': () => responseData.hasOwnProperty('data'),
      'Data tem token': () => responseData.data?.hasOwnProperty('token'),
      'Token existe': () => responseData.data?.token !== undefined && responseData.data?.token !== null,
      'Token não é vazio': () => responseData.data?.token?.length > 0,
    });
  }

  sleep(Math.random() * 2 + 1);
}
