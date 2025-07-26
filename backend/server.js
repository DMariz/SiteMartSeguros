const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet());

// Configuração do CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting - máximo de 10 requests por IP a cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Máximo 10 requests por IP
  message: {
    error: 'Muitas tentativas de envio. Tente novamente em 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Schema de validação para os dados do formulário
const contatoSchema = Joi.object({
  nome: Joi.string().min(2).max(100).required().messages({
    'string.empty': 'Nome é obrigatório',
    'string.min': 'Nome deve ter pelo menos 2 caracteres',
    'string.max': 'Nome deve ter no máximo 100 caracteres'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email é obrigatório',
    'string.email': 'Email deve ter um formato válido'
  }),
  telefone: Joi.string().pattern(/^[0-9]{10,11}$/).allow('').messages({
    'string.pattern.base': 'Telefone deve conter apenas números (10-11 dígitos)'
  }),
  mensagem: Joi.string().min(10).max(1000).required().messages({
    'string.empty': 'Mensagem é obrigatória',
    'string.min': 'Mensagem deve ter pelo menos 10 caracteres',
    'string.max': 'Mensagem deve ter no máximo 1000 caracteres'
  })
});

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verificar conexão com o servidor de email
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro na configuração do email:', error);
  } else {
    console.log('Servidor de email configurado corretamente');
  }
});

// Rota de saúde
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Servidor backend funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// Endpoint principal para processar formulários de contato
app.post('/api/contato', async (req, res) => {
  try {
    // Validar dados de entrada
    const { error, value } = contatoSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: error.details.map(detail => detail.message)
      });
    }

    const { nome, email, telefone, mensagem } = value;

    // Configurar email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `Nova mensagem do site - ${nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nova Mensagem do Site Mart Seguros
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Dados do Contato:</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
            <h3 style="color: #007bff; margin-top: 0;">Mensagem:</h3>
            <p style="line-height: 1.6; color: #333;">${mensagem}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px;">
              Esta mensagem foi enviada através do formulário de contato do site Mart Seguros<br>
              Data: ${new Date().toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      `
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    // Resposta de sucesso
    res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    });

    // Log para monitoramento
    console.log(`Email enviado com sucesso para ${email} em ${new Date().toISOString()}`);

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor. Tente novamente mais tarde.'
    });
  }
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Middleware global de tratamento de erros
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Recebido SIGTERM. Encerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Recebido SIGINT. Encerrando servidor...');
  process.exit(0);
});

module.exports = app;