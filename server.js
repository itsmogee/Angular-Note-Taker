const http = require("http"); // How to import in nodejs
const app = require("./backend/app");

const port = process.env.PORT || 3000;

app.set("port", port);
const server = http.createServer(app);

server.listen(port);
