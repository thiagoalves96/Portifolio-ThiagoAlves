// Sistema de tradução completo
class SimpleTranslator {
    constructor() {
        this.currentLang = 'pt';
        this.textInterval = null;
        this.typewriterTimeout = null; // ADICIONAR ESTA LINHA
        
        // Textos da animação
        this.animationTexts = {
            pt: [
                " Analista de Sistema",
                " Programador Java Jr",
                " Programador Junior",
                " Desenvolvedor Junior"
            ],
            en: [
                " System Analyst",
                " Java Jr Programmer",
                " Junior Programmer",
                " Junior Developer"
            ]
        };
        
        this.translations = {
            pt: {
                // Navegação
                'nav.profile': 'Perfil',
                'nav.education': 'Escolaridade',
                'nav.projects': 'Projetos',
                'nav.contact': 'Contato',
                
                // Home
                'home.greeting': 'Eu, Thiago',
                'home.iam': 'sou',
                'home.description': 'Profissional com sólida experiência em sistemas ERP incluindo Tasy, MV, PEP e Fast Medic. Graduado em Análise e Desenvolvimento de Sistemas pela UniPaulistana, com habilidades em programação Java (CRUD JSP e Servlet), HTML, CSS e bancos de dados. Certificações em algoritmos, lógica de programação e trabalho em equipes ágeis. Proativo, com habilidades analíticas e raciocírio lógico, buscando sempre aprender e crescer profissionalmente.',
                'home.cv': 'Currículo PDF',
                'home.contact': 'Contato',
                
                // Títulos das seções
                'education.title': 'Escolaridade',
'projects.title': 'Projetos',
'projects.subtitle': 'Todos os <span>tópicos</span> levarão para o <span>GitHub</span>',
'contact.title': 'Contatar',
                
                // Educação
                'education.highschool.title': 'Ensino Médio Completo',
                'education.highschool.school': 'Escola: EETAL',
                'education.nursing.title': 'Curso Técnico de Enfermagem',
                'education.nursing.description': 'Curso técnico de enfermagem <br />Duração 2 anos, INTESP - SP',
                'education.courses.title': 'Cursos Extracurriculares',
                'education.graduation.institution': 'Instituição: Unipaulistana',
                'education.graduation.description': '<strong>Graduação:</strong> Análise e Desenvolvimento de Sistemas<br /><strong>Duração:</strong> concluido<br /><strong>O que absorvi:</strong> Durante minha jornada na Unipaulistana, absorvi conhecimentos essenciais em análise e desenvolvimento de sistemas utilizando principalmente a linguagem Java.',
                
                // Projetos
                'projects.crud.servlet.title': 'CRUD Java Servlet',
                'projects.crud.servlet.summary': 'Sistema de gerenciamento com Java Servlet e MySQL',
                'projects.crud.servlet.description': 'Este projeto é um sistema de gerenciamento de funcionários em Java com Servlet, conectando-se a um banco de dados MySQL. Ele oferece operações básicas de CRUD (Create, Read, Update, Delete) e é licenciado sob a MIT License.',
                
                'projects.crud.swing.title': 'CRUD Java Swing',
                'projects.crud.swing.summary': 'Sistema de autenticação com interface gráfica',
                'projects.crud.swing.description': 'O projeto cria um sistema de autenticação avançado em Java Swing com banco de dados, oferecendo login, verificação de credenciais, tela principal, registro de usuário e recuperação de senha. Utiliza Java para a lógica, Swing para a interface e bancos de dados como MySQL ou PostgreSQL.',
                
                'projects.game.title': 'Jogo da Sorte',
                'projects.game.summary': 'Jogo de adivinhação desenvolvido em Java',
                'projects.game.logic.title': 'Lógica de Programação',
                'projects.game.description': 'Este projeto concluído é o Jogo da Sorte, desenvolvido em Java. Os jogadores tentam adivinhar um número escolhido aleatoriamente pela máquina dentro de um intervalo definido, recebendo dicas para orientar suas suposições. Os jogadores têm três tentativas para acertar o número sorteado.',
                
                'projects.qa.title': 'Exercícios QA',
                'projects.qa.summary': 'Exercícios de lógica e Quality Assurance',
                'projects.qa.logic.title': 'Exercícios de lógicas em Java',
                'projects.qa.description': 'Este é um projeto em desenvolvimento de exercícios resolvidos na disciplina de Quality Assurance, com orientação do Prof. Jailson Costa. Alguns exercícios já foram concluídos em sala de aula, como MANZAN e FACCAT.',
                'projects.github.link': 'Ver no GitHub',
                
                // Contato
                'contact.description': 'Estou disponível para novas oportunidades. Se você estiver interessado em me contratar, por favor, entre em contato comigo via WhatsApp ou E-mail.',
                'contact.whatsapp': 'Entre em contato via WhatsApp',
                
                // Formulário
                'form.title': 'Formulário',
                'form.name': 'Nome',
                'form.email': 'E-mail',
                'form.message': 'Mensagem',
                'form.send': 'Enviar',
                'form.sending': 'Enviando mensagem...',
                'form.close': 'Fechar',
                
                // Placeholders
                'placeholder.name': 'Digite o seu nome',
                'placeholder.email': 'Digite o seu e-mail',
                'placeholder.message': 'Digite a sua mensagem',
                
                // Footer
                'footer.subtitle': 'Desenvolvedor Java Jr',
                'footer.description': 'Desenvolvedor apaixonado por tecnologia, especializado em Java e sempre em busca de novos desafios.',
                'footer.navigation': 'Navegação',
                'footer.technologies': 'Tecnologias',
                'footer.copyright': '© 2024 Thiago Alves. Todos os direitos reservados.',
                'footer.badge.love': 'Desenvolvido com ❤️',
                'footer.badge.developer': 'Java Developer'
            },
            en: {
                // Navigation
                'nav.profile': 'Profile',
                'nav.education': 'Education',
                'nav.projects': 'Projects',
                'nav.contact': 'Contact',
                
                // Home
                'home.greeting': 'I am Thiago',
                'home.iam': 'I am',
                'home.description': 'Professional with solid experience in ERP systems including Tasy, MV, PEP and Fast Medic. Graduated in Systems Analysis and Development from UniPaulistana, with programming skills in Java (CRUD JSP and Servlet), HTML, CSS and databases.',
                'home.cv': 'Resume PDF',
                'home.contact': 'Contact',
                
                // Section titles
                'education.title': 'Education',
'projects.title': 'Projects',
'projects.subtitle': 'All <span>topics</span> will lead to <span>GitHub</span>',
'contact.title': 'Contact',
                
                // Education
                'education.highschool.title': 'High School Completed',
                'education.highschool.school': 'School: EETAL',
                'education.nursing.title': 'Technical Nursing Course',
                'education.nursing.description': 'Technical nursing course <br />Duration 2 years, INTESP - SP',
                'education.courses.title': 'Extracurricular Courses',
                'education.graduation.institution': 'Institution: Unipaulistana',
                'education.graduation.description': '<strong>Graduation:</strong> Systems Analysis and Development<br /><strong>Duration:</strong> completed<br /><strong>What I absorbed:</strong> During my journey at Unipaulistana, I absorbed essential knowledge in systems analysis and development using mainly the Java language.',
                
                // ADICIONAR ESTAS TRADUÇÕES:
                'education.courses.algorithms': '<strong>Algorithms and Programming Logic - Udemy</strong><br /><strong>Duration:</strong> 30 hours <br /><strong>What I absorbed:</strong> Understanding of how to formulate algorithms to solve problems and the ability to implement these algorithms using programming logic. I learned to create flowcharts and pseudocode to plan solutions before coding them.',
                
                'education.courses.java.methods': '<strong>Understanding Java Methods - Digital Innovation One</strong><br /><strong>Duration:</strong> 2 hours <br /><strong>What I absorbed:</strong> I learned to define and use methods in Java, understanding the importance of methods for modularity and code reuse. I understood how to pass parameters and return values from methods.',
                
                'education.courses.java.logic': '<strong>Conditional Logic and Flow Control in Java - Digital Innovation One</strong><br /><strong>Duration:</strong> 5 hours <br /><strong>What I absorbed:</strong> I mastered the use of flow control structures in Java, such as if, else, switch, and loops. This allowed me to control the behavior of my code based on different conditions and task repetition.',
                
                'education.courses.git': '<strong>Code Versioning with Git and GitHub - Digital Innovation One</strong><br /><strong>Duration:</strong> 2 hours <br /><strong>What I absorbed:</strong> I learned to use Git for code versioning, including basic commands like commit, push, pull, and branch. I understood how to collaborate with other developers using GitHub, managing repositories and resolving code conflicts.',
                
                'education.courses.java.oop': '<strong>Object-Oriented Programming with Java - Digital Innovation One</strong><br /><strong>Duration:</strong> 4 hours <br /><strong>What I absorbed:</strong> I understood the fundamental concepts of object-oriented programming, such as classes, objects, inheritance, polymorphism and encapsulation. I learned to apply these concepts to create more organized and reusable code.',
                
                'education.courses.java.syntax': '<strong>Learning Java Syntax - Digital Innovation One</strong><br /><strong>Duration:</strong> 5 hours <br /><strong>What I absorbed:</strong> I developed a solid understanding of basic Java syntax, including variable declaration, use of operators, and construction of control structures. This prepared me to write and understand Java programs effectively.',
                
                'education.postgrad.institution': 'Institution: Federal University of Technology - Paraná - UTFPR',
                
                'education.postgrad.description': '<strong>Postgraduate:</strong> Lato Sensu Postgraduate in Java Technology<br /><strong>Duration:</strong> in progress<br /><em>Lato Sensu Postgraduate in Java Technology</em> provides a deepening in advanced technologies of the Java ecosystem, focusing especially on the development of robust and scalable applications. During the course, I am learning advanced concepts of Java EE, frameworks like Spring Boot and Hibernate, as well as modern practices of agile development and systems integration. The program also includes studies in microservices architectures, information security in Java applications and strategies for performance optimization. The goal is to enable professionals to lead complex and innovative projects in the software development market.',
                
                // Projects
                'projects.crud.servlet.title': 'CRUD Java Servlet',
                'projects.crud.servlet.summary': 'Management system with Java Servlet and MySQL',
                'projects.crud.servlet.description': 'This project is an employee management system in Java with Servlet, connecting to a MySQL database. It offers basic CRUD operations (Create, Read, Update, Delete) and is licensed under the MIT License.',
                
                'projects.crud.swing.title': 'CRUD Java Swing',
                'projects.crud.swing.summary': 'Authentication system with graphical interface',
                'projects.crud.swing.description': 'The project creates an advanced authentication system in Java Swing with database, offering login, credential verification, main screen, user registration and password recovery. Uses Java for logic, Swing for interface and databases like MySQL or PostgreSQL.',
                
                'projects.game.title': 'Lucky Game',
                'projects.game.summary': 'Guessing game developed in Java',
                'projects.game.logic.title': 'Programming Logic',
                'projects.game.description': 'This completed project is the Lucky Game, developed in Java. Players try to guess a number randomly chosen by the machine within a defined range, receiving hints to guide their guesses. Players have three attempts to hit the drawn number.',
                
                'projects.qa.title': 'QA Exercises',
                'projects.qa.summary': 'Logic and Quality Assurance exercises',
                'projects.qa.logic.title': 'Java Logic Exercises',
                'projects.qa.description': 'This is a project in development of exercises solved in the Quality Assurance discipline, with guidance from Prof. Jailson Costa. Some exercises have already been completed in class, such as MANZAN and FACCAT.',
                'projects.github.link': 'View on GitHub',
                
                // Contact
                'contact.description': 'I am available for new opportunities. If you are interested in hiring me, please contact me via WhatsApp or Email.',
                'contact.whatsapp': 'Contact via WhatsApp',
                
                // Form
                'form.title': 'Contact Form',
                'form.name': 'Name',
                'form.email': 'Email',
                'form.message': 'Message',
                'form.send': 'Send',
                'form.sending': 'Sending message...',
                'form.close': 'Close',
                
                // Placeholders
                'placeholder.name': 'Enter your name',
                'placeholder.email': 'Enter your email',
                'placeholder.message': 'Enter your message',
                
                // Footer
                'footer.subtitle': 'Java Jr Developer',
                'footer.description': 'Technology-passionate developer, specialized in Java and always looking for new challenges.',
                'footer.navigation': 'Navigation',
                'footer.technologies': 'Technologies',
                'footer.copyright': '© 2024 Thiago Alves. All rights reserved.',
                'footer.badge.love': 'Developed with ❤️',
                'footer.badge.developer': 'Java Developer'
            }
        };
        
        this.init();
    }

    updateAnimationCSS() {
        const texts = this.animationTexts[this.currentLang];
        
        // Para qualquer animação anterior
        if (this.textInterval) {
            clearInterval(this.textInterval);
        }
        if (this.typewriterTimeout) {
            clearTimeout(this.typewriterTimeout);
        }
        
        // Encontra o elemento diretamente
        const animatedElement = document.querySelector('.text-animation .animated-text');
        
        if (!animatedElement) {
            console.error('Elemento .animated-text não encontrado!');
            return;
        }
        
        let currentIndex = 0;
        
        const typeWriter = (text, element, callback) => {
            let i = 0;
            element.textContent = ''; // Limpa o texto
            
            const typing = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    this.typewriterTimeout = setTimeout(typing, 100); // 100ms entre cada letra
                } else {
                    // Quando terminar de digitar, espera 2 segundos e chama callback
                    this.typewriterTimeout = setTimeout(callback, 2000);
                }
            };
            
            typing();
        };
        
        const updateText = () => {
            const currentText = texts[currentIndex];
            
            typeWriter(currentText, animatedElement, () => {
                currentIndex = (currentIndex + 1) % texts.length;
                updateText(); // Próximo texto
            });
        };
        
        // Primeira execução imediata
        updateText();
        
        console.log('Animação typewriter iniciada com textos:', texts);
    }

    // REMOVER ESTA FUNÇÃO COMPLETA:
    // createToggle() {
    //     const toggle = document.createElement('div');
    //     toggle.className = 'language-toggle';
    //     toggle.innerHTML = `
    //         <button class="lang-btn ${this.currentLang === 'pt' ? 'active' : ''}" data-lang="pt">PT</button>
    //         <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
    //     `;
    //     
    //     document.body.appendChild(toggle);
    //     
    //     toggle.addEventListener('click', (e) => {
    //         if (e.target.classList.contains('lang-btn')) {
    //             this.switchLang(e.target.dataset.lang);
    //         }
    //     });
    // }

    updateToggleState() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLang);
        });
    }

    switchLang(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.translate();
        this.updateToggleState();
        this.updateAnimationCSS();
    }

    translate() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(el => {
            const key = el.getAttribute('data-translate');
            const translation = this.translations[this.currentLang][key];
            
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });
    }

    init() {
        this.updateAnimationCSS();
        // REMOVER ESTA LINHA:
        // this.createToggle();
        this.translate();
    }
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.translator = new SimpleTranslator();
    });
} else {
    window.translator = new SimpleTranslator();
}