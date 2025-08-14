document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    // Criar elementos de loading e resultado em tela cheia
    createFullscreenElements();

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            showFullscreenResult('Todos os campos são obrigatórios.', 'error', '❌');
            return;
        }
        
        // Show fullscreen loading
        showFullscreenLoading(true);
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            // Hide loading
            showFullscreenLoading(false);
            
            if (result.success) {
                showFullscreenResult(result.message, 'success', '✅');
                form.reset(); // Clear form on success
            } else {
                showFullscreenResult(result.message, 'error', '❌');
            }
            
        } catch (error) {
            console.error('Erro:', error);
            showFullscreenLoading(false);
            showFullscreenResult('Erro de conexão. Verifique sua internet e tente novamente.', 'error', '🌐');
        }
    });
    
    function createFullscreenElements() {
        // Loading em tela cheia
        const loadingHTML = `
            <div id="fullscreen-loading" class="fullscreen-loading">
                <div class="loading-3d">
                    <div class="loading-ring"></div>
                    <div class="loading-ring"></div>
                    <div class="loading-ring"></div>
                </div>
                <div class="loading-text">Enviando mensagem...</div>
            </div>
        `;
        
        // Resultado em tela cheia
        const resultHTML = `
            <div id="fullscreen-result" class="fullscreen-result">
                <div class="result-icon" id="result-icon">✅</div>
                <div class="result-message" id="result-message">Mensagem enviada com sucesso!</div>
                <button class="close-result" onclick="hideFullscreenResult()">Fechar</button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', loadingHTML + resultHTML);
    }
    
    function showFullscreenLoading(show) {
        const loading = document.getElementById('fullscreen-loading');
        if (show) {
            loading.classList.add('active');
            submitBtn.disabled = true;
        } else {
            loading.classList.remove('active');
            submitBtn.disabled = false;
        }
    }
    
    function showFullscreenResult(message, type, icon) {
        const result = document.getElementById('fullscreen-result');
        const resultIcon = document.getElementById('result-icon');
        const resultMessage = document.getElementById('result-message');
        
        resultIcon.textContent = icon;
        resultIcon.className = `result-icon ${type}`;
        resultMessage.textContent = message;
        resultMessage.className = `result-message ${type}`;
        
        result.classList.add('active');
    }
    
    // Função global para fechar resultado
    window.hideFullscreenResult = function() {
        const result = document.getElementById('fullscreen-result');
        result.classList.remove('active');
    };
});