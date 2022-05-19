import { Inventory, InventorySlot, Turtle } from "./turtle";
import { Log } from "./log";
import request from "sync-request";

export class Message {
  name: string;
  command: string;
  target: string;

  fuelLevel?: number;
  blockFront?: string;
  blockBelow?: string;
  blockAbove?: string;
  inventory?: InventorySlot[];
  selectedSlot?: number;

  isAdmin: () => boolean;

  constructor(
    command: string,
    name: string,
    target: string,
    blockFront?: string,
    blockBelow?: string,
    blockAbove?: string,
    inventory?: InventorySlot[],
    selectedSlot?: number,
    fuelLevel?: number
  ) {
    this.name = name;
    this.command = command;
    this.target = target;

    this.blockFront = blockFront;
    this.blockBelow = blockBelow;
    this.blockAbove = blockAbove;
    this.inventory = inventory;
    this.selectedSlot = selectedSlot;
    this.fuelLevel = fuelLevel;

    this.isAdmin = () => this.name === "Admin";
  }
}

export class Api {
  public log: Log;

  constructor(log: Log) {
    this.log = log;
  }

  parseMessage(message: string) {
    const messageJson = JSON.parse(message);

    return new Message(
      messageJson["command"],
      messageJson["name"],
      messageJson["target"],
      messageJson["blockFront"],
      messageJson["blockBelow"],
      messageJson["blockAbove"],
      Inventory.parseInventory(messageJson["inventory"]),
      messageJson["selectedSlot"],
      messageJson["fuelLevel"]
    );
  }

  listClients() {}

  handleCommandAdmin(message: Message, clients: Map<string, Turtle>) {}

  handleCommandTurtle(message: Message, clients: Map<string, Turtle>) {
    let currentTurtle =
      clients.get(message["name"]) || this.log.log_error(`Turtle not found! ${message["name"]}`);
    currentTurtle = currentTurtle as Turtle;

    switch (message["command"]) {
      case "heartbeat":
        currentTurtle.heartbeat(message);
    }
  }

  getIp() {
    return request("GET", "https://api.ipify.org").getBody().toString();
  }
}
