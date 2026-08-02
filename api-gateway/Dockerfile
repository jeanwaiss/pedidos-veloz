# Estágio 1: Build (multi-stage)
FROM node:20-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install --only=production

# Estágio 2: Imagem final (mais leve e segura)
FROM node:20-alpine

# Cria usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copia apenas as dependências instaladas do estágio builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copia o código da aplicação
COPY --chown=nodejs:nodejs . .

# Troca para o usuário não-root
USER nodejs

# Porta que o serviço vai expor
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["node", "server.js"]