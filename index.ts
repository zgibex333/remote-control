import { httpServer } from "./src/http_server/index";
import { AddressInfo, createWebSocketStream, WebSocketServer } from "ws";
import { proceedData } from "./src/proceedData";

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
  const duplexStream = createWebSocketStream(websocket, {
    decodeStrings: false,
  });
  duplexStream.on("data", async (data) => {
    const msg = await proceedData(data);
    console.log(`received: ${data.toString()}`);
    duplexStream.write(msg);
    if (msg?.includes("prnt_scrn")) {
      console.log(`sent: ${msg.substring(0, 30)}...`);
    } else {
      console.log(`sent: ${msg}`);
    }
  });
});
