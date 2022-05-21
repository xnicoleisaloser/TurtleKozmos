import { Turtle } from "./turtle";

class Endpoint {
  name: string;
  func: () => string;

  constructor(name: string, func: () => string) {
    this.name = name;
    this.func = func;
  }
}

export class Admin {
  public endpoints: Endpoint[] = [];

  command(name: string, command: () => string) {
    this.endpoints.push(new Endpoint(name, command));
  }

  getSelectedSlot(turtle: Turtle) {
    return turtle.selectedSlot;
  }
}
