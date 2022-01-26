//Server
const express = require("express");
const app = express();
const port = 5000;

//Middleware
const cors = require("cors");
const morgan = require("morgan");

//Routes
import apiRoute from "./routes/api/api";
import clientResize from "./routes/client/clientResize";

//Initialise middleware
app.use(cors(), morgan("dev"));

//API
//Example query string http://localhost:5000/api?name=encenadaport&width=200&height=200
app.use("/api", apiRoute);

// Client
app.use("/sendImage", clientResize);

// Log server listening
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});

export default app;
