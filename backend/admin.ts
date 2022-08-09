import { Turtle } from "./turtle";
import { Message } from "./api";

class Endpoint {
  func: (turtles: Map<string, Turtle>, targetTurtle: string, admin: Turtle, message: Message) => void;

  constructor(func: (turtles: Map<string, Turtle>, targetTurtle: string, admin: Turtle, message: Message) => void) {
    this.func = func;
  }
}

export class Admin {
  public endpoints = new Map<string, Endpoint>();

  command(
    name: string,
    command: (turtles: Map<string, Turtle>, targetTurtle: string, admin: Turtle, message: Message) => void
  ) {
    this.endpoints.set(name, new Endpoint(command));
  }

  constructor() {
    // Register "listTurtle" endpoint
    this.command("listTurtles", (turtles, targetTurtle, admin, message) => {
      admin.connection.send(JSON.stringify({ turtles: turtles.toString() }));
    });

    this.command("relay",(turtles, targetTurtle, admin, message) => {

    });

  }
}
