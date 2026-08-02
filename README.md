# 🚀 Pedidos Veloz - Plataforma de Pedidos em Microsserviços

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 📖 Sobre o Projeto

**Pedidos Veloz** é uma plataforma de e-commerce baseada em microsserviços, desenvolvida como parte do curso de **Cloud DevOps**. O projeto demonstra a aplicação de práticas modernas de desenvolvimento, conteinerização, orquestração, CI/CD e observabilidade.

### 🎯 Objetivo

Demonstrar um pipeline completo de entrega contínua, desde o ambiente de desenvolvimento local até a orquestração em Kubernetes, com foco em:

- ✅ Conteinerização com Docker (multi-stage builds, segurança)
- ✅ Orquestração com Kubernetes (Deployments, Services, ConfigMaps, Secrets)
- ✅ CI/CD automatizado com GitHub Actions
- ✅ Escalabilidade automática (HPA)
- ✅ Observabilidade (métricas, logs e tracing distribuído)
- ✅ Infraestrutura como Código (Terraform - conceitual)

---

## 🏗️ Arquitetura da Aplicação

A aplicação é composta por 4 microsserviços + banco de dados:
┌─────────────────────────────────────────────────────────────┐
│ API Gateway (Porta 8080) │
│ Ponto de entrada único │
└───────┬─────────────────┬─────────────────┬─────────────────┘
│ │ │
▼ ▼ ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│ Pedidos │ │ Pagamentos │ │ Estoque │
│ (Porta 3001) │ │ (Porta 3002) │ │ (Porta 3003) │
└───────┬───────┘ └───────┬───────┘ └───────┬───────┘
│ │ │
└─────────────────┼─────────────────┘
▼
┌───────────────────┐
│ PostgreSQL │
│ (Porta 5432) │
└───────────────────┘

text

### 📦 Serviços

| Serviço | Tecnologia | Porta | Descrição |
|---------|------------|-------|-----------|
| **API Gateway** | Node.js (Express) | 8080 | Roteamento e orquestração de requisições |
| **Serviço de Pedidos** | Node.js (Express) | 3001 | CRUD de pedidos |
| **Serviço de Pagamentos** | Node.js (Express) | 3002 | Processamento de pagamentos (simulado) |
| **Serviço de Estoque** | Node.js (Express) | 3003 | Gerenciamento de estoque |
| **PostgreSQL** | PostgreSQL 16 Alpine | 5432 | Banco de dados relacional |

---

## 🛠️ Tecnologias Utilizadas

### Containerização e Orquestração
- **Docker** - Criação de imagens e containers
- **Docker Compose** - Ambiente de desenvolvimento multi-serviço
- **Kubernetes** - Orquestração em produção
- **HPA (Horizontal Pod Autoscaler)** - Escalabilidade automática

### CI/CD e Automação
- **GitHub Actions** - Pipeline automatizado
- **Argo CD** (conceitual) - GitOps para Kubernetes

### Observabilidade (Proposta)
- **Prometheus** - Coleta de métricas
- **Grafana** - Dashboards de monitoramento
- **Jaeger** - Tracing distribuído
- **ELK Stack** - Centralização de logs

### Infraestrutura como Código
- **Terraform** - Provisionamento de infraestrutura (conceitual)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (opcional, para desenvolvimento)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/pedidos-veloz.git
   cd pedidos-veloz
Suba todos os serviços com Docker Compose

bash
docker-compose up -d
Verifique se todos os containers estão rodando

bash
docker ps
Teste a aplicação no navegador

API Gateway: http://localhost:8080

Health Check: http://localhost:8080/health

Listar Pedidos: http://localhost:8080/pedidos

Listar Estoque: http://localhost:8080/estoque

Listar Pagamentos: http://localhost:8080/pagamentos

Para parar os containers

bash
docker-compose down
🧪 Como testar a API
Criar um pedido (PowerShell):

powershell
$body = '{"cliente":"João Silva","itens":[{"produto":"Notebook","quantidade":1}],"total":3500.00}'
Invoke-RestMethod -Method POST -Uri "http://localhost:8080/pedidos" -Body $body -ContentType "application/json"
Listar pedidos:

powershell
Invoke-RestMethod -Method GET -Uri "http://localhost:8080/pedidos"
Listar estoque:

powershell
Invoke-RestMethod -Method GET -Uri "http://localhost:8080/estoque"
Listar pagamentos:

powershell
Invoke-RestMethod -Method GET -Uri "http://localhost:8080/pagamentos"
☸️ Kubernetes - Manifestos
Os manifestos do Kubernetes estão na pasta zzz-k8s/:

Arquivo	Descrição
deployment.yaml	Definição dos Deployments (réplicas, probes, env)
service.yaml	Exposição dos serviços (ClusterIP, LoadBalancer)
configmap.yaml	Configurações não sensíveis (URLs, variáveis)
secret.yaml	Dados sensíveis (senhas em base64)
hpa.yaml	Escalabilidade automática (HPA)
Aplicar no Kubernetes
bash
kubectl apply -f zzz-k8s/
Verificar os recursos
bash
kubectl get pods
kubectl get services
kubectl get hpa
🔄 CI/CD - GitHub Actions
O pipeline automatizado (ci-cd.yml) executa:

Build das imagens Docker

Testes automatizados (health check e endpoints)

Publicação simulada das imagens

Deploy simulado no Kubernetes

Estrutura do Pipeline
yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    # Build, testes e publicação simulada
  
  deploy:
    # Deploy no Kubernetes (simulado)
📊 Estratégias de Deploy e Escala
Estratégia de Deploy: Rolling Update
O Kubernetes usa Rolling Update por padrão, substituindo gradualmente os pods antigos por novos, mantendo a aplicação disponível durante a atualização.

Estratégia de Escala: HPA (Horizontal Pod Autoscaler)
O HPA ajusta automaticamente o número de réplicas com base no uso de CPU:

yaml
minReplicas: 2
maxReplicas: 5
targetCPUUtilizationPercentage: 50
🔍 Observabilidade (Proposta)
A observabilidade da aplicação seria garantida por:

Pilar	Ferramenta	Funcionalidade
Métricas	Prometheus + Grafana	Monitoramento de performance e recursos
Logs	ELK Stack	Centralização e análise de logs
Tracing	Jaeger	Rastreamento distribuído de requisições
Todos os serviços já possuem endpoints /health para verificação de saúde.

📁 Estrutura do Projeto
text
pedidos-veloz/
├── .github/
│   └── workflows/
│       └── ci-cd.yml            # Pipeline CI/CD
├── api-gateway/
│   ├── Dockerfile               # Multi-stage build
│   ├── package.json
│   └── server.js
├── servico-estoque/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── servico-pagamentos/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── servico-pedidos/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── zzz-k8s/
│   ├── configmap.yaml
│   ├── deployment.yaml
│   ├── hpa.yaml
│   ├── secret.yaml
│   └── service.yaml
├── docker-compose.yml           # Ambiente local
└── README.md                    # Documentação

👨‍💻 Desenvolvedor
Nome: Jean Alexander Waiss Lima
Curso: Cloud DevOps - Orchestrating Containers and Micro Services
Instituição: UNIFECAF
Tutor(a): Fernando Leonid

📄 Licença
Este projeto é educacional e está sob a licença MIT.

📚 Referências
Docker Documentation
Kubernetes Documentation
GitHub Actions Documentation
12-Factor App
CNCF - Adobe Case Study

🎥 Vídeo Pitch
▶️ Link para o vídeo pitch: https://www.linkedin.com/posts/jean-waiss_college-task-microservices-based-order-platform-ugcPost-7489797958016745472-32_z/?utm_source=share&utm_medium=member_desktop&rcm=ACoAACBvErkB1MohiPsQCUAL47zfiSdLJ_IvacI

