import { Inventory, InventorySlot, Turtle } from "./turtle";
import { Log } from "./log";
import request from "sync-request";
import { Admin } from "./admin";

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
  private admin: Admin;

  constructor(log: Log, admin: Admin) {
    this.log = log;
    this.admin = admin;
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

  handleCommandAdmin(message: Message, clients: Map<string, Turtle>, admin: Turtle) {
    if (this.admin.endpoints.has(message.command)) {
      this.admin.endpoints.get(message.command)?.func(clients, message.target, admin);
    }
  }

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
