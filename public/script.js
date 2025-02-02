document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Conecta ao WebSocket

    // Quando o servidor enviar o comando, dispara o alerta
    socket.on("disparar_alarme", () => {
        var audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
        audio.play();
        alert("⚠️ ALERTA! Cuidado ao acessar sites desconhecidos.");
    });
});
