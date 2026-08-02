const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

// Middlewares
app.use(cors());
app.use(express.json());

// Banco de dados em memória (simulado)
let pagamentos = [];
let nextId = 1;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Serviço de Pagamentos OK', timestamp: new Date() });
});

// Listar todos os pagamentos
app.get('/pagamentos', (req, res) => {
  res.json(pagamentos);
});

// Buscar pagamento por ID
app.get('/pagamentos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pagamento = pagamentos.find(p => p.id === id);
  
  if (!pagamento) {
    return res.status(404).json({ error: 'Pagamento não encontrado' });
  }
  
  res.json(pagamento);
});

// Processar novo pagamento
app.post('/pagamentos', (req, res) => {
  const { pedidoId, valor, metodo } = req.body;
  
  // Validação básica
  if (!pedidoId || !valor || !metodo) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios: pedidoId, valor, metodo' 
    });
  }
  
  // Simula processamento de pagamento (sempre aprovado)
  const aprovado = true;
  const status = aprovado ? 'APROVADO' : 'REPROVADO';
  
  const novoPagamento = {
    id: nextId++,
    pedidoId,
    valor,
    metodo,
    status,
    dataProcessamento: new Date().toISOString(),
    transacaoId: `TRX-${Date.now()}-${pedidoId}`
  };
  
  pagamentos.push(novoPagamento);
  
  console.log(`💳 Pagamento ${novoPagamento.id} processado para pedido ${pedidoId} - Status: ${status}`);
  
  res.status(201).json(novoPagamento);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`💳 Serviço de Pagamentos rodando na porta ${PORT}`);
});