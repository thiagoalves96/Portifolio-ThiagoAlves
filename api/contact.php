<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://thiagoalvesdev.com.br');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (empty($input['name']) || empty($input['email']) || empty($input['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Todos os campos são obrigatórios']);
    exit();
}

// Sanitize inputs
$name = filter_var(trim($input['name']), FILTER_SANITIZE_STRING);
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$message = filter_var(trim($input['message']), FILTER_SANITIZE_STRING);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'E-mail inválido']);
    exit();
}

// Email configuration
$to = 'thiagodev22@hotmail.com';
$subject = 'Nova mensagem do portfólio - ' . $name;
$headers = [
    'From: noreply@thiagoalvesdev.com.br',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8'
];

// Email body
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00ffee, #0099cc); color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border-left: 4px solid #00ffee; }
        .footer { background: #333; color: white; padding: 10px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nova Mensagem do Portfólio</h2>
        </div>
        <div class='content'>
            <p><strong>Nome:</strong> {$name}</p>
            <p><strong>E-mail:</strong> {$email}</p>
            <p><strong>Mensagem:</strong></p>
            <p>{$message}</p>
        </div>
        <div class='footer'>
            <p>Mensagem enviada através do portfólio thiagoalvesdev.com.br</p>
        </div>
    </div>
</body>
</html>
";

// Send email
try {
    $success = mail($to, $subject, $emailBody, implode("\r\n", $headers));
    
    if ($success) {
        echo json_encode([
            'success' => true, 
            'message' => 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
        ]);
    } else {
        throw new Exception('Falha no envio do e-mail');
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Erro interno do servidor. Tente novamente mais tarde.'
    ]);
}
?>