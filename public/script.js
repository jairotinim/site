document.addEventListener('DOMContentLoaded', () => {
    const socket = io("https://site-seven-pink.vercel.app/"); // Conecta ao WebSocket

    // Quando o servidor enviar o comando, dispara o alerta
    socket.on("disparar_alarme", () => {
        var audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
        audio.play();
        alert("⚠️ ALERTA! Cuidado ao acessar sites desconhecidos.");
    });

    // Código original do site (NÃO REMOVER)
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

    const initialHash = window.location.hash.substring(1);
    activateSection(initialHash || 'dados');
});
