const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(express.json());

// URLs dos serviços (via variáveis de ambiente)
const PEDIDOS_URL = process.env.PEDIDOS_URL || 'http://localhost:3001';
const PAGAMENTOS_URL = process.env.PAGAMENTOS_URL || 'http://localhost:3002';
const ESTOQUE_URL = process.env.ESTOQUE_URL || 'http://localhost:3003';

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway online', timestamp: new Date() });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API Pedidos Veloz!',
    endpoints: {
      pedidos: '/pedidos',
      pagamentos: '/pagamentos',
      estoque: '/estoque',
      health: '/health'
    }
  });
});

// ============ ROTAS DE PEDIDOS ============
app.get('/pedidos', async (req, res) => {
  try {
    const response = await axios.get(`${PEDIDOS_URL}/pedidos`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Erro ao buscar pedidos',
      details: error.message
    });
  }
});

app.post('/pedidos', async (req, res) => {
  try {
    const response = await axios.post(`${PEDIDOS_URL}/pedidos`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Erro ao criar pedido',
      details: error.message
    });
  }
});

// ============ ROTAS DE PAGAMENTOS ============
app.get('/pagamentos', async (req, res) => {
  try {
    const response = await axios.get(`${PAGAMENTOS_URL}/pagamentos`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Erro ao buscar pagamentos',
      details: error.message
    });
  }
});

app.post('/pagamentos', async (req, res) => {
  try {
    const response = await axios.post(`${PAGAMENTOS_URL}/pagamentos`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Erro ao processar pagamento',
      details: error.message
    });
  }
});

// ============ ROTAS DE ESTOQUE ============
app.get('/estoque', async (req, res) => {
  try {
    const response = await axios.get(`${ESTOQUE_URL}/estoque`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Erro ao buscar estoque',
      details: error.message
    });
  }
});

app.post('/estoque/reservar', async (req, res) => {
  try {
    const response = await axios.post(`${ESTOQUE_URL}/estoque/reservar`, req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: 'Erro ao reservar estoque',
      details: error.message
    });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 API Gateway rodando na porta ${PORT}`);
  console.log(`📍 Pedidos: ${PEDIDOS_URL}`);
  console.log(`📍 Pagamentos: ${PAGAMENTOS_URL}`);
  console.log(`📍 Estoque: ${ESTOQUE_URL}`);
});