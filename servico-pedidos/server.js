const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Banco de dados em memória (simulado)
let pedidos = [];
let nextId = 1;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Serviço de Pedidos OK', timestamp: new Date() });
});

// Listar todos os pedidos
app.get('/pedidos', (req, res) => {
  res.json(pedidos);
});

// Buscar pedido por ID
app.get('/pedidos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pedido = pedidos.find(p => p.id === id);
  
  if (!pedido) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
  
  res.json(pedido);
});

// Criar novo pedido
app.post('/pedidos', (req, res) => {
  const { cliente, itens, total } = req.body;
  
  // Validação básica
  if (!cliente || !itens || !total) {
    return res.status(400).json({ 
      error: 'Campos obrigatórios: cliente, itens, total' 
    });
  }
  
  const novoPedido = {
    id: nextId++,
    cliente,
    itens,
    total,
    status: 'CRIADO',
    dataCriacao: new Date().toISOString()
  };
  
  pedidos.push(novoPedido);
  
  console.log(`📦 Pedido ${novoPedido.id} criado para ${cliente}`);
  
  res.status(201).json(novoPedido);
});

// Atualizar status do pedido
app.put('/pedidos/:id/status', (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  
  const pedido = pedidos.find(p => p.id === id);
  
  if (!pedido) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
  
  pedido.status = status;
  
  console.log(`📦 Pedido ${id} atualizado para status: ${status}`);
  
  res.json(pedido);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`📦 Serviço de Pedidos rodando na porta ${PORT}`);
});