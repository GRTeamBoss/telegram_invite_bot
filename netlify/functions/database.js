import {readFile} from "fs"

export class Database {
  data = []
  constructor() {
    readFile("./netlify/functions/json/output1.json", "utf-8", (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);
      this.data.push(json)
    })
    readFile("./netlify/functions/json/output2.json", "utf-8", (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);
      this.data.push(json)
    })
  }
}