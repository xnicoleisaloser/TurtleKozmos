import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { Message, Api } from './api';
import { Turtle, Position, InventorySlot } from './turtle';
import { AddressInfo } from 'net';
import {RawData} from "ws";
import {Log} from "./log";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const log = new Log('log', 1);

// Used for hosting our turtle code
app.use(express.static("./turtle"));

// Client list
let clients = new Map<string, Turtle>();

// Handle new connections
wss.on('connection', (ws: WebSocket) => {

    // Construct our Turtle object
    let turtle: Turtle = new Turtle(clients.size.toString(), ws);

    // Add our Turtle objects to our client list
    clients.set(clients.size.toString(), turtle);

    // Log
    log.log_connection(turtle.turtleId);

    // Handle incoming messages
    ws.on('message', (data: RawData) => {
        let messageString: string = data.toString();
        let message: Message = Api.parseMessage(messageString);

        log.log_message(message);

        switch (message.name) {
            case 'Admin':
                Api.handleCommandAdmin(message, clients);
                break;

            default:
                if (!clients.has(message.name)) {
                    // Migrate our unnamed turtle to a named entry
                    turtle.name = message.name;
                    clients.set(turtle.name, turtle)
                    clients.delete(turtle.turtleId);
                }
                Api.handleCommandTurtle(message, clients);
                break;
        }
    })

    ws.on('close', _ => {
        clients.delete(turtle.name as string);
        console.log('Disconnected %s', turtle.name);
    })
})

server.listen(process.env.PORT || 8765, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});