import * as WebSocket from "ws";
import * as http from "http";
import * as fs from "fs";

const wss = new WebSocket.Server({ port: 8765 });
const file_host = `http://67.249.253.213:5678/`;
const wss_host = `ws://67.249.253.213:8765/`;

console.log(`wget ${file_host}startup.lua`);

type ItemSlot = {
    name: string;
    count: number;
};

type Client = {
    ws: WebSocket;
    uuid: string;
    name: string;
    position: { x: number; y: number; z: number };
    facing: "north" | "east" | "south" | "west";
    fuelLevel: number;
    selectedSlot: number;
    inventory: ItemSlot[];
};

let clients: Map<string, Client> = new Map();

wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (data: string) => {
        let json = JSON.parse(data);

        if (json.uuid == "admin") {
            switch (json.command) {
                case "listTurtles":
                    ws.send(JSON.stringify(clients));
            }
        } else {
            if (json.type == "startup") {
                let client: Client = {
                    ws: ws,
                    uuid: json.uuid,
                    name: json.name,
                    position: json.position,
                    facing: json.facing,
                    fuelLevel: json.fuelLevel,
                    selectedSlot: json.selectedSlot,
                    inventory: json.inventory,
                };
                clients.set(client.uuid, client);
                console.log(`Client ${client.name} connected with id ${client.uuid}`);
            }

            let client: Client = clients.get(json.uuid)!;
            let keys = Object.keys(client);

            for (let key of keys) {
                if (json[key]) {
                    // fuck this, fuck you, fuck typescript
                    eval(`client.${key} = json.${key}`);
                }
            }
        }
    });
});

// Hosts files for turtle
http.createServer((req, res) => {
    const filePath = `../turtle${req.url}`;

    // If the file exists, serve it
    if (fs.existsSync(filePath)) {
        // Add host into turtle
        if (req.url === "/startup.lua") {
            res.end(fs.readFileSync(filePath).toString().replace(`HOST = {}`, `HOST = "${file_host}"`));
        } else if (req.url === "/main.lua") {
            res.end(fs.readFileSync(filePath).toString().replace(`HOST = {}`, `HOST = "${wss_host}"`));
        } else {
            res.end(fs.readFileSync(filePath));
        }
    } else {
        res.end("404");
    }
}).listen(5678);
