const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://thiagoalvesdev.com.br');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'E-mail inválido' });
  }

  try {
    // Configure nodemailer with Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email options
    const mailOptions = {
      from: `"Portfólio Thiago Alves" <${process.env.EMAIL_USER}>`, // Nome + email
      to: 'thiagodev22@hotmail.com',
      subject: `🌟 Novo contato do seu portfólio - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #4CAF50;">
              <h1 style="color: #333; margin: 0; font-size: 24px;">💼 Novo Contato do Portfólio</h1>
              <p style="color: #666; margin: 5px 0 0 0;">thiagoft96.vercel.app</p>
            </div>
            
            <!-- Conteúdo -->
            <div style="margin-bottom: 25px;">
              <h2 style="color: #4CAF50; margin-bottom: 20px; font-size: 18px;">📋 Detalhes do Contato:</h2>
              
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                <p style="margin: 0; color: #333;"><strong>👤 Nome:</strong> ${name}</p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                <p style="margin: 0; color: #333;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #4CAF50; text-decoration: none;">${email}</a></p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
                <p style="margin: 0 0 10px 0; color: #333; font-weight: bold;">💬 Mensagem:</p>
                <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">📅 Recebido em: ${new Date().toLocaleString('pt-BR')}</p>
              <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">🌐 Enviado através do seu portfólio online</p>
            </div>
            
          </div>
        </div>
      `
    };

    // Teste a conexão antes de enviar
    await transporter.verify();
    console.log('Conexão SMTP OK!');

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro interno do servidor. Tente novamente mais tarde.'
    });
  }
};