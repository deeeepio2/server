import { Elysia } from "elysia";
import type { ElysiaWS } from "elysia/ws";
import { decode } from "./shared/websocket";

const port = 5005;

const connections: Record<string, ElysiaWS> = {};

const app = new Elysia()
	.ws("/", {
		open(ws) {
			connections[ws.id] = ws;

			ws.send("hi");
		},
		close(ws) {
			delete connections[ws.id];
		},
		message(ws, message) {
			console.log(decode(Buffer.from(message as never).buffer as ArrayBuffer));
		},
	})
	.onStart(({ server }) => {
		console.log(`Server started on port ${port}`);
	})
	.listen(port);
