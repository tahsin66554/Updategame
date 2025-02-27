const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let players = [];

wss.on('connection', ws => {
    if (players.length < 4) {
        players.push(ws);
        ws.send(JSON.stringify({ message: "Welcome to Ludo!" }));
    }

    ws.on('message', message => {
        players.forEach(player => {
            if (player !== ws) player.send(message);
        });
    });

    ws.on('close', () => {
        players = players.filter(player => player !== ws);
    });
});
