import { Server } from "socket.io";

const io = new Server({
	cors: {
		origin: "http://localhost:5173",
	},
	path: "/ws",
});

io.on("connection", (socket) => {
	console.log(socket.id, "connected");

	socket.on("name", (name) => {
		console.log(socket.id, "set name to", name);
	});
});
io.listen(5005);
