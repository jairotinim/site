document.addEventListener('DOMContentLoaded', () => {
    // Conexão com WebSocket
    const socket = new WebSocket("wss://SEU-SERVIDOR-WS"); // Substituir pelo endereço do WebSocket

    socket.onopen = () => console.log("Conectado ao servidor WebSocket!");
    socket.onmessage = (event) => {
        if (event.data === "tocar") {
            let audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
            audio.play();
        }
    };

    // Navegação entre seções
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sections.forEach(section => section.classList.remove('active-section'));
            document.querySelector(link.getAttribute('href')).classList.add('active-section');
        });
    });

    // Botão de Alerta Secreto
    const alertButton = document.getElementById("alert-button");

    if (window.location.hostname === "SEU-IP-PESSOAL") {
        alertButton.style.display = "block";
    }

    alertButton.addEventListener("click", () => {
        fetch("https://SEU-SERVIDOR-WS/ativarSom")
            .then(response => console.log("Comando enviado!"))
            .catch(error => console.error("Erro:", error));
    });
});
