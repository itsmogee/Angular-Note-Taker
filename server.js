const http = require("node:http"); // How to import in nodejs
const app = require("./backend/app");
const { debug } = require("node:console");

const normalizePort = (val) => {
  const port = Number.parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof addr === "string" ? `pipe${addr}` : `port${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated priviledges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe${addr}` : `port${port}`;
  debug(`Listening on ${bind}`);
};

const port = normalizePort(process.env.PORT || 3000);
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
