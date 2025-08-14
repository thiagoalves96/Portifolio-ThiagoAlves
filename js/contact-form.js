document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
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
            showOverlay('❌', 'Todos os campos são obrigatórios.', 'error');
            return;
        }
        
        // Show loading
        showLoading();
        
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
                showOverlay('✅', result.message, 'success');
                form.reset();
            } else {
                showOverlay('❌', result.message, 'error');
            }
            
        } catch (error) {
            console.error('Erro:', error);
            showOverlay('🌐', 'Erro de conexão. Tente novamente.', 'error');
        }
    });
    
    function showLoading() {
        const overlay = createOverlay();
        
        let loadingText = 'Enviando mensagem...';
        
        if (window.translator && 
            typeof window.translator.translate === 'function' && 
            window.translator.currentLang) {
            try {
                const translation = window.translator.translate('form.sending');
                if (translation && translation !== 'form.sending') {
                    loadingText = translation;
                }
            } catch (error) {
                console.warn('Erro na tradução, usando texto padrão:', error);
            }
        }
        
        overlay.innerHTML = `
            <div class="simple-spinner"></div>
            <div class="overlay-text">${loadingText}</div>
        `;
        overlay.classList.add('active');
    }
    
    function showLoadingOverlay() {
        const overlay = createOverlay();
        const getTranslation = (key, fallback) => {
            return window.translator && window.translator.translate ? 
                   window.translator.translate(key) : fallback;
        };
        
        overlay.innerHTML = `
            <div class="simple-spinner"></div>
            <div class="overlay-text">${getTranslation('form.sending', 'Enviando mensagem...')}</div>
        `;
        overlay.classList.add('active');
    }
    
    function showOverlay(icon, message, type) {
        const overlay = createOverlay();
        
        // Texto do botão sempre em português como fallback
        let closeButtonText = 'Fechar';
        
        // Tenta obter a tradução apenas se o translator estiver completamente carregado
        if (window.translator && 
            typeof window.translator.translate === 'function' && 
            window.translator.currentLang) {
            try {
                const translation = window.translator.translate('form.close');
                if (translation && translation !== 'form.close') {
                    closeButtonText = translation;
                }
            } catch (error) {
                console.warn('Erro na tradução, usando texto padrão:', error);
            }
        }
        
        overlay.innerHTML = `
            <div class="overlay-icon ${type}">${icon}</div>
            <div class="overlay-text">${message}</div>
            <button class="close-btn" onclick="hideOverlay()">${closeButtonText}</button>
        `;
        overlay.classList.add('active');
    }
    
    function createOverlay() {
        let overlay = document.getElementById('fullscreen-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'fullscreen-overlay';
            overlay.className = 'fullscreen-overlay';
            document.body.appendChild(overlay);
        }
        return overlay;
    }
    
    // Função global para fechar
    window.hideOverlay = function() {
        const overlay = document.getElementById('fullscreen-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    };
});