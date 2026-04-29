import {readFile} from "fs"

export class Database {
  data = []
  constructor() {
    readFile("./json/output1.json", "utf-8", (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);
      this.data.push(json)
    })
    readFile("./json/output2.json", "utf-8", (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);
      this.data.push(json)
    })
  }
}