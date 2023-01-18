import { createWebSocketStream, WebSocketServer, AddressInfo } from "ws";
import { httpServer } from "./src/http_server/index.js";
import { proceedData } from "./src/proceedData.js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const WS_PORT = 8080;
const ws = new WebSocketServer({
  port: WS_PORT,
  host: "localhost",
});

ws.on("listening", () => {
  const info = ws.address() as AddressInfo;
  console.log(
    `WS server is listening: address ${info.address} | port: ${info.port}`
  );
});

ws.on("connection", (websocket) => {
  ws.on("error", () => {
    websocket.close();
    ws.close();
  });

  const duplexStream = createWebSocketStream(websocket, {
    decodeStrings: false,
  });
  duplexStream.on("data", async (data) => {
    try {
      const msg = await proceedData(data);
      console.log(`received: ${data.toString()}`);
      if (msg?.includes("prnt_scrn") || msg?.includes("mouse_position")) {
        duplexStream.write(msg);
      } else {
        duplexStream.write(msg?.replace(/ /g, "_"));
      }
      if (msg?.includes("prnt_scrn")) {
        console.log(`sent: ${msg.substring(0, 30)}...`);
      } else {
        console.log(`sent: ${msg}`);
      }
    } catch {
      console.log("Server Error has happened");
    }
  });
});
