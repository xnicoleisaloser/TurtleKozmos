import { Message } from "./api";
import { log } from "util";
import {createWriteStream, WriteStream} from "fs";

import { appendFile } from "fs";

export class Log {
  output: string;
  logging_level: number;
  file_stream: WriteStream;
  private date: Date;

  constructor(output: string, logging_level: number) {
    this.output = output;
    this.logging_level = logging_level;
    this.file_stream = createWriteStream(this.output, { flags: "a" });
    this.date = new Date();
  }

  get_timestamp() {
    return `${(this.date.getMonth() + 1).toString().padStart(2, "0")}/${this.date
      .getDate()
      .toString()
      .padStart(2, "0")}/${this.date.getFullYear().toString().padStart(4, "0")} ${this.date
      .getHours()
      .toString()
      .padStart(2, "0")}:${this.date.getMinutes().toString().padStart(2, "0")}:${this.date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;
  }

  write(log_str: string) {
    appendFile(this.output, `{${this.get_timestamp()}} ${log_str} \n`, (err: any) => {
      if (err) {
        console.error(err);
        return false;
      }
      return true;
    });
  }

  log_connection(turtleId: string) {
    const log_str = `[Client connected with ID: ${turtleId}]`;
    console.log(log_str);
    this.write(log_str);
  }

  log_message(message: Message) {
    const log_str = `[${message.name}: ${message.command}] -> [${
      message.target ? message.target : "Server"
    }]`;
    console.log(log_str);
    this.write(log_str);
  }

  log_error(error: string) {
    console.error(error);
    this.write(error);
  }

  end_logging() {
    this.file_stream.end();
  }
}
