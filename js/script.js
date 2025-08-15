let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach((links) => {
                links.classList.remove("active");
                document
                    .querySelector("header nav a[href*=" + id + "]")
                    .classList.add("active");
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
    
    // Adiciona classe ao header quando menu está ativo
    const header = document.querySelector('.header');
    if (navbar.classList.contains("active")) {
        header.classList.add('menu-active');
        document.body.style.overflow = "hidden";
    } else {
        header.classList.remove('menu-active');
        document.body.style.overflow = "auto";
    }
};

// Fecha o menu quando clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains("active")) {
            menuIcon.classList.remove("bx-x");
            navbar.classList.remove("active");
            document.querySelector('.header').classList.remove('menu-active');
            document.body.style.overflow = "auto";
        }
    });
});


// Função para criar estrelas cadentes
function createShootingStar() {
    const shootingStarsContainer = document.querySelector('.shooting-stars');
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Posição inicial aleatória
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * (window.innerHeight / 2);
    
    shootingStar.style.left = startX + 'px';
    shootingStar.style.top = startY + 'px';
    
    shootingStarsContainer.appendChild(shootingStar);
    
    // Remove a estrela cadente após a animação
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 3000);
}

// Criar estrelas cadentes em intervalos aleatórios
function startShootingStars() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% de chance a cada intervalo
            createShootingStar();
        }
    }, 2000); // Verifica a cada 2 segundos
}

// Iniciar as estrelas cadentes quando a página carregar
window.addEventListener('load', () => {
    startShootingStars();
});


// Funcionalidade dos cards de projeto
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active de todos os outros cards
            projectCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle active no card clicado
            card.classList.toggle('active');
        });
    });
    
    // Fechar card ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.project-card')) {
            projectCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});


// Função para atualizar o link do currículo baseado no idioma
function updateCurriculumLink() {
    const cvButton = document.querySelector('a[data-translate="home.cv"]');
    if (cvButton && window.translator) {
        if (window.translator.currentLang === 'en') {
            cvButton.href = 'Downloads/Thiago-Alves_EN.pdf';
            cvButton.download = 'Thiago-Alves-CV-EN.pdf';
        } else {
            cvButton.href = 'Downloads/Thiagoti.pdf';
            cvButton.download = 'CurriculoThiago.pdf';
        }
    }
}

// Chama a função quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Aguarda o translator ser inicializado
    setTimeout(() => {
        updateCurriculumLink();
    }, 100);
});
