import { httpServer } from "./src/http_server/index.js";
import { createWebSocketStream, WebSocket, WebSocketServer } from "ws";
import { proceedData } from "./src/proceedData.js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const WS_PORT = 8080;
const ws = new WebSocketServer({
  port: WS_PORT,
});

ws.on("connection", (websocket) => {
  console.log("connected");
  const duplexStream = createWebSocketStream(websocket, {
    decodeStrings: false,
  });
  let msg = "";
  duplexStream.on("data", async (data) => {
    const msg = await proceedData(data);
    duplexStream.write(msg);
  });
});
