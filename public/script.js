document.addEventListener('DOMContentLoaded', () => {
    // Navegação entre seções
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.content-section');

    function activateSection(targetId) {
        sections.forEach(section => {
            section.classList.remove('active-section');
            if (section.id === targetId) {
                section.classList.add('active-section');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            history.pushState(null, null, `#${targetId}`);
            activateSection(targetId);
        });
    });

    // Gerenciar estado inicial
    const initialHash = window.location.hash.substring(1);
    activateSection(initialHash || 'dados');

    // Quiz
    const quizData = [
        {
            question: "O que fazer ao receber um e-mail suspeito?",
            options: ["Clicar para verificar", "Excluir imediatamente", "Encaminhar para análise"],
            correct: 1
        },
        {
            question: "Qual senha é mais segura?",
            options: ["123456", "MinhaNetaLúcia2024!", "senha"],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    const quizContent = document.getElementById('quiz-content');

    function loadQuiz() {
        const question = quizData[currentQuestion];
        quizContent.innerHTML = `
            <div class="quiz-question">${question.question}</div>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" onclick="selectOption(${index})">${option}</button>
                `).join('')}
            </div>
        `;
    }

    window.selectOption = (index) => {
        if (index === quizData[currentQuestion].correct) score++;
        currentQuestion++;
        if (currentQuestion < quizData.length) loadQuiz();
        else showResult();
    };

    function showResult() {
        quizContent.innerHTML = `
            <div class="quiz-result">
                <h3>Você acertou ${score} de ${quizData.length} perguntas!</h3>
                <button onclick="location.reload()">Refazer Teste</button>
            </div>
        `;
    }

    loadQuiz();

    // Botão Voltar ao Topo
    window.onscroll = () => {
        document.getElementById('back-to-top').style.display = 
            (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? 'block' : 'none';
    };

    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Modal
    const modal = document.getElementById('modal');
    document.querySelector('.close').onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target === modal) modal.style.display = 'none';
    };
});