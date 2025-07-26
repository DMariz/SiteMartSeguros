# Backend Mart Seguros

Este diretório contém o backend seguro para processamento dos formulários do site Mart Seguros. Ele foi desenvolvido para substituir o uso direto do EmailJS no frontend, proporcionando maior segurança ao não expor credenciais de email no lado cliente.

## 🛡️ Recursos de Segurança

- **Helmet.js**: Configuração automática de cabeçalhos de segurança HTTP
- **Rate Limiting**: Proteção contra spam e ataques de força bruta
- **CORS**: Controle de origem das requisições
- **Validação de dados**: Validação robusta com Joi
- **Variáveis de ambiente**: Credenciais protegidas fora do código

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta de email para envio (Gmail recomendado)

## ⚙️ Instalação e Configuração

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e configure suas credenciais:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configurações do servidor
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://seudominio.com

# Configurações de email
EMAIL_SERVICE=gmail
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
EMAIL_TO=contato@martseguros.com.br
```

### 3. Configurar email (Gmail)

Para usar Gmail, você precisará:

1. Ativar a autenticação de dois fatores na sua conta Google
2. Gerar uma senha de aplicativo:
   - Acesse: https://myaccount.google.com/security
   - Vá em "Senhas de app"
   - Gere uma nova senha para "Mail"
   - Use essa senha no `EMAIL_PASS`

### 4. Executar o servidor

**Desenvolvimento:**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 🔗 Endpoints da API

### GET `/api/health`

Verifica se o servidor está funcionando.

**Resposta:**
```json
{
  "status": "OK",
  "message": "Servidor backend funcionando corretamente",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### POST `/api/contato`

Processa formulários de contato e envio de orçamentos.

**Dados esperados:**
```json
{
  "nome": "João Silva",
  "email": "joao@email.com", 
  "telefone": "81999999999",
  "mensagem": "Gostaria de solicitar um orçamento..."
}
```

**Validações:**
- `nome`: obrigatório, 2-100 caracteres
- `email`: obrigatório, formato válido
- `telefone`: opcional, 10-11 dígitos numéricos
- `mensagem`: obrigatória, 10-1000 caracteres

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso! Entraremos em contato em breve."
}
```

**Resposta de erro:**
```json
{
  "success": false,
  "message": "Dados inválidos",
  "errors": ["Nome é obrigatório"]
}
```

## 🚀 Integração com Frontend

Para integrar com o frontend existente, você pode modificar o JavaScript para fazer requisições para o backend ao invés do EmailJS:

```javascript
// Exemplo de integração
async function enviarFormulario(dados) {
  try {
    const response = await fetch('http://localhost:3000/api/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados)
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Mostrar mensagem de sucesso
      console.log(result.message);
    } else {
      // Mostrar erros de validação
      console.error(result.errors);
    }
  } catch (error) {
    console.error('Erro de conexão:', error);
  }
}
```

## 📊 Rate Limiting

O servidor implementa rate limiting para prevenir spam:
- **Limite**: 10 requisições por IP a cada 15 minutos
- **Escopo**: Todas as rotas `/api/*`
- **Resposta quando limite atingido**: HTTP 429

## 🔒 Segurança

### Medidas implementadas:

1. **Helmet.js**: Cabeçalhos de segurança HTTP automáticos
2. **CORS**: Controle de origem das requisições
3. **Rate Limiting**: Proteção contra spam e DDoS
4. **Validação de dados**: Sanitização e validação de entrada
5. **Variáveis de ambiente**: Credenciais fora do código
6. **Logs de segurança**: Monitoramento de tentativas de acesso

### Recomendações adicionais:

- Use HTTPS em produção
- Configure firewall para permitir apenas portas necessárias
- Mantenha as dependências atualizadas
- Monitore logs de erro regularmente
- Considere usar um proxy reverso (nginx) em produção

## 🛠️ Desenvolvimento

### Scripts disponíveis:

- `npm start`: Executa o servidor em modo produção
- `npm run dev`: Executa com nodemon para desenvolvimento

### Estrutura de arquivos:

```
backend/
├── server.js          # Arquivo principal do servidor
├── package.json       # Dependências e scripts
├── .env.example       # Exemplo de configuração
├── .env              # Configurações reais (não versionado)
└── README.md         # Esta documentação
```

## 🐳 Deploy em Produção

### Variáveis de ambiente em produção:

Certifique-se de configurar todas as variáveis necessárias no seu provedor de hospedagem:

- `PORT`: Porta do servidor (geralmente fornecida pelo provedor)
- `NODE_ENV=production`
- `FRONTEND_URL`: URL do seu site em produção
- `EMAIL_USER`: Email para envio
- `EMAIL_PASS`: Senha de aplicativo
- `EMAIL_TO`: Email de destino

### Provedores recomendados:

- **Heroku**: Deploy simples com git
- **Vercel**: Excelente para aplicações Node.js
- **Railway**: Alternativa moderna ao Heroku
- **DigitalOcean App Platform**: VPS gerenciado

## 📝 Logs e Monitoramento

O servidor gera logs para:
- Emails enviados com sucesso
- Erros de validação
- Erros de servidor
- Tentativas de rate limiting

Para produção, considere integrar com serviços de monitoramento como:
- **Sentry**: Para tracking de erros
- **LogRocket**: Para monitoramento de performance
- **DataDog**: Para métricas e alertas

## ❓ Solução de Problemas

### Problemas comuns:

**1. Erro "Invalid login" no Gmail:**
- Verifique se a autenticação de dois fatores está ativada
- Use senha de aplicativo ao invés da senha normal
- Verifique se o email está correto

**2. CORS error no frontend:**
- Verifique se `FRONTEND_URL` está configurado corretamente
- Certifique-se de que o frontend está fazendo requisições para a URL correta

**3. Rate limit atingido:**
- Aguarde 15 minutos para o reset automático
- Considere aumentar o limite se necessário

**4. Porta já em uso:**
- Mude a `PORT` no arquivo `.env`
- Verifique se nenhum outro processo está usando a porta

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique os logs do servidor
2. Consulte esta documentação
3. Verifique as configurações do arquivo `.env`
4. Entre em contato com o administrador do sistema

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo de licença para mais detalhes.

---

**Desenvolvido para Mart Seguros - Segurança e confiabilidade em primeiro lugar**