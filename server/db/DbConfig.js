import mongoose from "mongoose";

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
  console.log("closed")
})


export default class DbConnection {
  static async connect(connectionstring = process.env.CONNECTION_STRING || "") {
    let status = 0;
    try {
      let status = await mongoose.connect(connectionstring);
      console.log("\x1b[36m%s\x1b[0m", `[CONNECTION TO DB ${mongoose.connection.name}]`);
      return status;
    } catch (e) {
      console.error(
        "[MONGOOSE CONNECTION ERROR]:",
        "Invalid connection string"
      );
      return status;
    }
  }
}
