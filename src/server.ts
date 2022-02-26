import http from "http";
import app from "./app";

const port = process.env.PORT || "5000";

app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("listening", onListening);






function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr!.port;
  console.log("Listening on " + bind);
}
