// Boilerplate moment holy fuck
// people i feel so bad for ppl who write wrappers for a living

// "oh you're so traumatized it makes me want to cry"

import ws = require("ws")
import {Message} from "./api";

export class InventorySlot {
    itemName?: string;
    itemCount?: number;

    constructor(itemName: string, itemCount: number) {
        this.itemName = itemName;
        this.itemCount = itemCount;
    }
}

export class Inventory {
    static parseInventory(inventoryString?: string) {
        if (inventoryString) {
            // holy shit this is a hack
            let inventoryJson = JSON.parse("{ \"inventory\":" + JSON.stringify(inventoryString).toString() + "}")["inventory"];
            let inventory: InventorySlot[] = [];

            for (const slot of inventoryJson) {
                let inventorySlot = new InventorySlot(slot["name"], slot["count"]);
                inventory.push(inventorySlot);
            }

            return inventory;

        }
        else return undefined
    }
}

export class Position {
    x?: number;
    y?: number;
    z?: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export class Turtle {
    name: string;
    turtleId: string;
    position: Position;
    direction: 'north' | 'east' | 'south' | 'west';
    fuelLevel: number;
    inventory: InventorySlot[];
    selectedSlot: number
    connection: ws;
    blockFront?: string;
    blockBelow?: string;
    blockAbove?: string;

    incrementDirection: (count: number) => void;
    decrementDirection: (count: number) => void;

    turn: (rotations: number, direction: 'right' | 'left') => void;
    move: (blocks: number, direction: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward') => void;
    dig: (direction: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward') => void;
    place: (direction: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward') => void;
    drop: (direction: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward', count: number) => void;
    inspect: (direction: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward') => void;
    suck: (direction: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward', count: number) => void;
    select: (slot: number) => void;
    // getFuelLevel: () => void;
    // getSelectedSlot: () => void;
    // getItemDetail: () => void;
    craft: (limit: number) => void;
    refuel: (count: number) => void;


    turtleEval: (expression: string) => void;
    turtleFuncCall: (func: string, args: string[], module: "global" | "tools" | "turtle") => void;

    heartbeat: (message: Message) => void;

    constructor(turtleId: string, connection: ws) {
        this.connection = connection;
        this.turtleId = turtleId;

        this.name = "";
        this.position = new Position(0, 0, 0);
        this.direction = "north";
        this.fuelLevel = 0;
        this.selectedSlot = 0;
        this.inventory = [new InventorySlot("minecraft:air", 0)];



        this.turtleEval = (expression: string) => {
            expression = Buffer.from(expression, 'base64').toString('base64')
            this.connection.send(JSON.stringify({'command': 'eval', 'expression': expression}))
        };

        this.turtleFuncCall = (func, args, module) => {
            this.connection.send(JSON.stringify({'command': 'callFunc', 'function': func, 'arguments': args.toString().replace("[", "").replace("]", ""), 'module': module}))
        };

        this.turn = (rotations: number, direction: 'right' | 'left') => {
            let directionString = direction[0].toUpperCase() + direction.slice(1);
            this.turtleEval(`for i = 1, ${rotations}, 1 do turtle.turn${directionString}() end`)
        };

        this.move = (blocks: number, direction: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward') => {
            this.turtleFuncCall("move", [direction, blocks.toString()], "tools");
        };

        this.dig = (direction: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward') => {
            this.turtleFuncCall("dig", [direction], "tools");
        }

        this.place = (direction) => {
            this.turtleFuncCall("place", [direction], "tools");
        }

        this.drop = (direction, count) => {
            this.turtleFuncCall("drop", [direction, count.toString()], "tools");
        }

        this.inspect = (direction) => {
            this.turtleFuncCall("inspect", [direction], "tools");
        }

        this.suck = (direction, count) => {
            this.turtleFuncCall("suck", [direction, count.toString()], "tools");
        }

        this.select = (slot) => {
            this.turtleFuncCall("select", [slot.toString()], "turtle");
        }

        this.craft = (limit) => {
            this.turtleFuncCall("craft",[limit.toString()], "tools");
        }

        this.refuel = (count) => {
            this.turtleFuncCall("refuel", [count.toString()], "tools");
        }

        this.heartbeat = (message: Message) => {
            this.fuelLevel = message.fuelLevel as number;
            this.blockFront = message.blockFront as string;
            this.blockBelow = message.blockBelow as string;
            this.blockAbove = message.blockAbove as string;
            this.inventory = message.inventory as InventorySlot[];
            this.selectedSlot = message.selectedSlot as number;
        }

        this.incrementDirection = (count) => {
            for (let i = 0; i < count; i++) {
                switch (this.direction) {
                    case "north": this.direction = "east";  break;
                    case "east":  this.direction = "south"; break;
                    case "south": this.direction = "west";  break;
                    case "west":  this.direction = "north"; break;
                }
            }
        }

        this.decrementDirection = (count) => {
            for (let i = 0; i < count; i++) {
                switch (this.direction) {
                    case "north": this.direction = "west";  break;
                    case "west":  this.direction = "south"; break;
                    case "south": this.direction = "east";  break;
                    case "east":  this.direction = "north"; break;
                }
            }
        }
    }

}
