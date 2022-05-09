//Server
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

//Middleware

const cors = require("cors");
const morgan = require("morgan");

//Routes
import apiRoute from "./routes/api/api";
import clientResize from "./routes/client/clientResize";
import routeError from "./routes/api/index";
import path from "path";

const client = path.join(__dirname, "/client/build");

app.use(express.static(client));

//Initialise middleware
app.use(cors(), morgan("dev"));

//API
app.use("/api", apiRoute);

// Return image to client
app.use("/sendImage", clientResize);

// Serve client
app.get("/", (req: any, res: any) => {
  res.sendFile(client, "index.html");
});

//Global route matcher
app.use("*", routeError);

// Log server listening
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}...`);
});

export default app;
