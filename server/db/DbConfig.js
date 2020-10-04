import mongoose from "mongoose";
import { COLORS } from "../../__tests__/_config/_ConsoleColors";

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connection.on("error", err => {
  console.error("[DATABASE ERROR]:", err);
});
mongoose.connection.on("connection", () => {
  console.log("DbConnection Successful");
});
mongoose.connection.on("close", () => {
  console.log("closed")
})
mongoose.connection.on("disconnected", () => {
  console.log("disconnected")
})


export default class DbConnection {
  static async connect(connectionstring = process.env.CONNECTION_STRING || "") {
    let status = 0;
    try {
      let status = await mongoose.connect(connectionstring);
      console.log(COLORS.Cyan, `[CONNECTION TO DB ${mongoose.connection.name}]`);
      return status;
    } catch (e) {
      console.error(
        "[MONGOOSE CONNECTION ERROR]:",
        "Invalid connection string",
        e
      );
      return status;
    }
  }
  static async disconnect() {
    try {
      await mongoose.disconnect()
      console.log(COLORS.Red, `[DISCONNECTED FROM DB]`);
    } catch (e) {
      console.error(
        "[MONGOOSE CONNECTION ERROR]:",
        e
      );
    }
  }
}
