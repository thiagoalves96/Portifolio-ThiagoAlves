document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const loadingIndicator = document.getElementById('loading-indicator');
    const feedbackMessage = document.getElementById('feedback-message');
    const submitBtn = document.getElementById('submit-btn');

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
            showFeedback('Todos os campos são obrigatórios.', 'error');
            return;
        }
        
        // Show loading
        showLoading(true);
        hideFeedback();
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.success) {
                showFeedback(result.message, 'success');
                form.reset(); // Clear form on success
            } else {
                showFeedback(result.message, 'error');
            }
            
        } catch (error) {
            console.error('Erro:', error);
            showFeedback('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
        } finally {
            showLoading(false);
        }
    });
    
    function showLoading(show) {
        if (show) {
            loadingIndicator.style.display = 'block';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        } else {
            loadingIndicator.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar';
        }
    }
    
    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = `feedback-message ${type}`;
        feedbackMessage.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideFeedback();
            }, 5000);
        }
    }
    
    function hideFeedback() {
        feedbackMessage.style.display = 'none';
    }
});