import { Turtle } from "./turtle";

class Endpoint {
  func: (turtles: Map<string, Turtle>, targetTurtle: string, admin: Turtle) => void;

  constructor(func: (turtles: Map<string, Turtle>, targetTurtle: string, admin: Turtle) => void) {
    this.func = func;
  }
}

export class Admin {
  public endpoints = new Map<string, Endpoint>();

  command(
    name: string,
    command: (turtles: Map<string, Turtle>, targetTurtle: string, admin: Turtle) => void
  ) {
    this.endpoints.set(name, new Endpoint(command));
  }

  constructor() {
    this.command("listTurtles", (turtles, targetTurtle, admin) => {
      admin.connection.send(JSON.stringify({ turtles: turtles.toString() }));
    });
  }
}
