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
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // thiagoft96@gmail.com
        pass: process.env.EMAIL_PASS  // senha de app do Gmail
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,           // thiagoft96@gmail.com (remetente)
      to: 'thiagodev22@hotmail.com',          // seu Hotmail (destinatário)
      subject: `Novo contato do site: ${name}`,
      html: `
        <h2>Novo contato recebido!</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
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