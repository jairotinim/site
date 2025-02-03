const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

app.use(express.static("public")); // Servir os arquivos do site

// WebSocket: Conectar usuários e enviar alertas
io.on("connection", (socket) => {
    console.log("Novo dispositivo conectado: " + socket.id);

    socket.on("ativar_alarme", () => {
        io.emit("disparar_alarme"); // Envia comando para todos os conectados
    });

    socket.on("disconnect", () => {
        console.log("Usuário desconectado: " + socket.id);
    });
});

// Iniciar servidor na porta 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
