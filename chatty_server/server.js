const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
wss.broadcast = function broadcast(data) {
    const dataString = JSON.stringify(data)
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(dataString);
        }
    });
};
const numberClients = {type: 'currentClients', clientsOn: 0} 
wss.on('connection', (ws) => {
    numberClients.clientsOn += 1;
    console.log('Client connected', numberClients);
    wss.broadcast(numberClients)
    // console.log(ws);
    ws.on('message', function incoming(message) {
        const messageParsed = JSON.parse(message)
        switch (messageParsed.type) {
            case "postMessage":
            // handle posted message
            messageParsed.id = uuidv1();
            messageParsed.type = "incomingMessage";
            wss.broadcast(messageParsed)
            break;
            case "postNotification":
            messageParsed.id = uuidv1();
            messageParsed.type = "incomingNotification";
            wss.broadcast(messageParsed)
            // handle incoming notification
            break;
            default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + data.type);
        }
    });
    
    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        numberClients.clientsOn -= 1;
        wss.broadcast(numberClients)
        console.log('Client disconnected', numberClients)});

});