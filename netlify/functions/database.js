import {readFile} from "fs"
import path from "path"

export class Database {
  data = []
  constructor() {
    const folderPath1 = path.join(__dirname, "json", "output1.json")
    const folderPath2 = path.join(__dirname, "json", "output2.json")
    readFile(folderPath1, "utf-8", (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);
      this.data.push(json)
    })
    readFile(folderPath2, "utf-8", (err, data) => {
      if (err) throw err;
      const json = JSON.parse(data);
      this.data.push(json)
    })
  }
}