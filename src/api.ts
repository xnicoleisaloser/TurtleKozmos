// interface Message {
//     name: String,
//     command: String,
//     target?: String,
//     is_admin(): Boolean,
// }

import {Turtle} from "./turtle";

export class Message {
    name: string;
    command: string;
    target: string;

    isAdmin: () => boolean;

    constructor(command: string, name: string, target: string) {
        this.name = name;
        this.command = command;
        this.target = target;

        this.isAdmin = () => this.name === 'Admin';
    }
}

export class Api {
    static parseMessage(message: string) {
        let messageJson = JSON.parse(message);

        return new Message(
            messageJson['command'],
            messageJson['name'],
            messageJson['target']
        );
    }

    static listClients() {

    }

    static handleCommandAdmin(message: Message, clients: Map<string, Turtle>) {
    }

    static handleCommandTurtle(message: Message, clients: Map<string, Turtle>) {

    }
}