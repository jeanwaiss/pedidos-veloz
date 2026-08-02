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