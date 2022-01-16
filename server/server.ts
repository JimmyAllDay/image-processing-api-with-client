const express = require("express");
import apiRoute from "./routes/api/api";
import clientResize from "./routes/client/clientResize";
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 5000;

app.use(cors(), morgan("combined"));

// write tests for code
// split functions into different modules
// POST resized images to client
// create functionality uploading images from front end, and resizing them

//API
app.use("/image", apiRoute);

// Client
app.use("/client", clientResize);

// Log server listening
app.listen(port, () => {
  console.log(`Example app listening on port ${port}...`);
});
