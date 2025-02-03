const WebSocket = require("ws");
const express = require("express");

// Criando o servidor WebSocket
const server = new WebSocket.Server({ port: 8080 });

let clients = [];

server.on("connection", (ws) => {
    clients.push(ws);
    console.log("Novo usuário conectado!");

    ws.on("close", () => {
        clients = clients.filter(client => client !== ws);
        console.log("Usuário desconectado.");
    });
});

// Função para ativar o som remotamente
function ativarSom() {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send("tocar");
        }
    });
    console.log("Comando enviado para todos os dispositivos!");
}

// Criando o servidor HTTP para ativar o som remotamente
const app = express();

app.get("/ativarSom", (req, res) => {
    ativarSom();
    res.send("🔊 Alerta enviado!");
});

app.listen(3000, () => console.log("🔌 Servidor rodando na porta 3000"));
