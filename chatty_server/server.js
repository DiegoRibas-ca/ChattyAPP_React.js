const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');
const fetch = require('node-fetch');
const querystring = require('querystring');
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

// Function called on ws.client when the message comes from the client
function incoming(message) {
    const messageParsed = JSON.parse(message)
    switch (messageParsed.type) {
        case "postMessage":
        // call function that handle posted message
        postMessage(messageParsed)
        break;
        case "postNotification":
        // handle notification message
        messageParsed.id = uuidv1();
        messageParsed.type = "incomingNotification";
        wss.broadcast(messageParsed)
        break;
        default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
}

// function that see if it is a message or image in content and send to client
function postMessage(messageParsed) {
    messageParsed.id = uuidv1();
    let matches = messageParsed.message.match(/^\/giphy (.+)$/);
    if (matches) {
        let qs = querystring.stringify({
            api_key: 'dc6zaTOxFJmzC',
            tag: matches[1] 
        });
        fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
        .then( resp => {return resp.json()})
        .then( json => {
            messageParsed.message = `<img src="${json.data.image_url}" alt=""/>`;
            messageParsed.type = "incomingImage";
            wss.broadcast(messageParsed)
        })
    } else {
        messageParsed.type = "incomingMessage";
        wss.broadcast(messageParsed)
    }
}

const numberClients = { type: 'currentClients', clientsOn: 0} 
// server connecting
wss.on('connection', (ws) => {
    numberClients.clientsOn += 1;
    console.log('Client connected, total now:', numberClients.clientsOn);
    wss.broadcast(numberClients)
    // listening for new messages and call function to handle
    ws.on('message', incoming);
    // Set up a callback for when a client closes the socket. 
    ws.on('close', () => {
        numberClients.clientsOn -= 1;
        console.log('Client disconnected, total now:', numberClients.clientsOn)});
        wss.broadcast(numberClients)

});