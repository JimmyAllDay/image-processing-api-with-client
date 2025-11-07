import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import AppRoutes from "./AppRoutes";
import { axiosInstance, healthCheckInstance } from "./config";

import { Container } from "react-bootstrap";

import "../styles/App.scss";

function App() {
  const [userImages, setUserImages] = useState([]);
  const [userMessage, setUserMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState("checking"); // checking, waking, ready, error

  //Controls messages to UI about req errors and status
  const statusMessage = (message, duration = 2000) => {
    setUserMessage(message);
    if (duration > 0) {
      setTimeout(() => {
        setUserMessage(null);
      }, duration);
    }
  };

  // Check server health on component mount
  useEffect(() => {
    const checkServerHealth = async () => {
      setServerStatus("waking");
      statusMessage("Waking server... This may take up to 60 seconds on first visit.", 0);
      
      try {
        await healthCheckInstance.get("/health");
        setServerStatus("ready");
        statusMessage("Server ready!", 2000);
      } catch (error) {
        setServerStatus("error");
        statusMessage("Server unavailable. Please refresh the page.", 0);
      }
    };

    checkServerHealth();
  }, []);

  const formSubmit = (e, fileName, height, width) => {
    e.preventDefault();
    
    // Don't allow submission if server isn't ready
    if (serverStatus !== "ready") {
      statusMessage("Please wait for server to be ready before uploading.", 3000);
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("file", fileName && fileName[0]);
    data.append("height", height);
    data.append("width", width);

    function sendHandler(data) {
      if (fileName && width && height) {
        axiosInstance
          .post("/sendImage", data, {
            responseType: "blob",
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            const image = URL.createObjectURL(res.data);
            setUserImages([...userImages, image]);
            setLoading(false);
            statusMessage("Image ready. Check images tab.", 2000);
          })
          .catch((err) => {
            setLoading(false);
            if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
              statusMessage("Request timed out. Server may be waking up. Please try again.", 5000);
            } else {
              statusMessage(err.message + ". Try again or come back later", 5000);
            }
          });
      }
    }
    sendHandler(data);
  };

  return (
    <Container fluid className="p-0 h-100 d-flex flex-column bg-light">
      <Navigation />
      <AppRoutes
        formSubmit={formSubmit}
        userMessage={userMessage}
        loading={loading}
        userImages={userImages}
        serverStatus={serverStatus}
      />
    </Container>
  );
}

export default App;
