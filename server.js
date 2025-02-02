const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir arquivos estáticos da pasta "public"
app.use(express.static("public"));

// Lista de conexões ativas
io.on("connection", (socket) => {
    console.log("Novo dispositivo conectado: " + socket.id);

    // Quando o admin envia o comando
    socket.on("ativar_alarme", () => {
        io.emit("disparar_alarme"); // Envia para todos os conectados
    });
});

// Inicia o servidor na porta 3000
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
