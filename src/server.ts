import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { Message, Api } from './api';
import { Turtle, Position, InventorySlot } from './turtle';
import { AddressInfo } from 'net';
import {RawData} from "ws";
import {Log} from "./log";
import {readFileSync} from "fs";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const log = new Log('log', 1);
const api = new Api(log);
const host = `${api.getIp()}:8765/`

console.log(`Bootstrap Oneliner: wget run http://${host}startup.lua`)

// Used for hosting our turtle code
app.use(express.static("./turtle"));

// For inserting host manually into hosted lua files
app.get('/startup.lua', (request, response) => {
    response.send(readFileSync("./turtle/_startup.lua").toString().replace("host = {replace_me}", `host = "http://${host}"`));
});

app.get('/main.lua', (request, response) => {
    response.send(readFileSync("./turtle/_main.lua").toString().replace("Host = {replace_me}", `Host = "${host}"`));
});
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
        let message: Message = api.parseMessage(messageString);

        log.log_message(message);

        switch (message.name) {
            case 'Admin':
                api.handleCommandAdmin(message, clients);
                break;

            default:
                if (!clients.has(message.name)) {
                    // Migrate our unnamed turtle to a named entry
                    turtle.name = message.name;
                    clients.set(turtle.name, turtle)
                    clients.delete(turtle.turtleId);
                }
                api.handleCommandTurtle(message, clients);
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