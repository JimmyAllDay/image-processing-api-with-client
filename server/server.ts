//Server
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

//Middleware

const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

//Routes
import apiRoute from "./routes/api/api";
import clientResize from "./routes/client/clientResize";
import routeError from "./routes/api/index";
import path from "path";
const fs = require("fs");

// Ensure required directories exist on startup
// Use process.cwd() to get the server root directory regardless of build location
const serverRoot = process.cwd();
const thumbDir = path.join(serverRoot, "thumb");
const clientResizeDir = path.join(serverRoot, "clientResize");

if (!fs.existsSync(thumbDir)) {
  fs.mkdirSync(thumbDir, { recursive: true });
}

if (!fs.existsSync(clientResizeDir)) {
  fs.mkdirSync(clientResizeDir, { recursive: true });
}

//Initialise middleware
// Allow requests from GitHub Pages and localhost
const allowedOrigins = [
  'https://jimmyallday.github.io',
  'http://localhost:3000',
  'http://localhost:5000'
];

// Add CLIENT_URL from environment if it exists
if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}), morgan("dev"));

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many API requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 uploads per windowMs
  message: 'Too many upload requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

//API
app.use("/api", apiLimiter, apiRoute);

// Return image to client
app.use("/sendImage", uploadLimiter, clientResize);

// Health check endpoint (no rate limiting for this)
app.use("/health", routeError);

//Global route matcher
app.use("*", routeError);

// Log server listening
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}...`);
});

export default app;
