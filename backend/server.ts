import express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import localtunnel from "localtunnel";

import { Message, Api } from "./api";
import { Turtle } from "./turtle";
import { Log } from "./log";

import { RawData } from "ws";
import { readFileSync } from "fs";
import { Admin } from "./admin";


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const log = new Log("log", 1);
const admin = new Admin();
const api = new Api(log, admin);
const clients = new Map<string, Turtle>();
let host: string;


// Establish connection with local tunnel
(async () => {
  const tunnel = await localtunnel({ port: 8765 });

  host = tunnel.url.replace("https://", "").concat(":80/");
  console.log(`Server started: ws://${host} - Copied to clipboard`)
  console.log(`Bootstrap Oneliner: wget run http://${host}startup.lua`);

  tunnel.on('close', () => {
    console.error("Tunnel Closed");
  });
})();

// Used for hosting our turtle code
app.use(express.static("./turtle"));

// For inserting host manually into hosted lua files
app.get("/startup.lua", (request, response) => {
  response.send(
    readFileSync("./turtle/_startup.lua")
      .toString()
      .replace("host = { replace_me }", `host = "http://${host}"`)
  );
});

app.get("/main.lua", (request, response) => {
  response.send(
    readFileSync("./turtle/_main.lua").toString().replace("Host = { replace_me }", `Host = "${host}"`)
  );
});

// Endpoints for fetching data - used for debugging
app.get("/api/turtles/:turtle", (request, response) => {
  response.send(clients.get(request.params.turtle));
});

app.get("/api/listTurtles", (request, response) => {
  console.log(Object.fromEntries(clients));
  response.send(Object.fromEntries(clients));
});

app.get("/api/turtles/:turtle/fuelLevel", (request, response) => {
  response.send((clients.get(request.params.turtle) as Turtle).fuelLevel);
});

app.get("/api/evalBox", (request, response) => {
  response.send(`
    <style>
        
    </style>
    
     <form action="/eval/">
      <label for="code">Code:</label><br>
      <input type="text" id="code" name="code" value=""><br>
      <input type="submit" value="Run">
    </form> 
    `);
});

app.get("/eval/*", (request, response) => {
  console.log(decodeURIComponent(request.url));
  response.send(`<meta http-equiv="refresh" content="7; url='/api/evalBox/'" />`);
});

// Handle new connections
wss.on("connection", (ws: WebSocket) => {
  // Construct our Turtle object
  const turtle: Turtle = new Turtle(clients.size.toString(), ws);

  // Add our Turtle objects to our client list
  clients.set(clients.size.toString(), turtle);

  // Log
  log.log_connection(turtle.turtleId);

  // Handle incoming messages
  ws.on("message", (data: RawData) => {
    const messageString: string = data.toString();
    const message: Message = api.parseMessage(messageString);

    log.log_message(message);

    switch (message.name) {
      case "Admin":
        api.handleCommandAdmin(message, clients, turtle);
        break;

      default:
        if (!clients.has(message.name)) {
          // Migrate our unnamed turtle to a named entry
          turtle.name = message.name;
          clients.set(turtle.name, turtle);
          clients.delete(turtle.turtleId);
        }
        api.handleCommandTurtle(message, clients);
        break;
    }
  });

  ws.on("close", () => {
    clients.delete(turtle.name as string);
    console.log("Disconnected %s", turtle.name);
  });
});

server.listen(process.env.PORT || 8765, () => {

});

