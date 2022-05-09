import React, { useState } from "react";
import Navigation from "./Navigation";
import AppRoutes from "./AppRoutes";
import axios from "axios";

import { Container } from "react-bootstrap";

import "../styles/App.scss";

function App() {
  const [userImages, setUserImages] = useState([]);
  const [userMessage, setUserMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  //Controls messages to UI about req errors and status
  const statusMessage = (message) => {
    setUserMessage(message);
    setTimeout(() => {
      setUserMessage(null);
    }, 2000);
  };

  const formSubmit = (e, fileName, height, width) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("file", fileName && fileName[0]);
    data.append("height", height);
    data.append("width", width);

    function sendHandler(data) {
      const url = "http://localhost:5000/sendimage";
      if (fileName && width && height) {
        axios
          .post(url, data, {
            responseType: "blob",
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            const image = URL.createObjectURL(res.data);
            setUserImages([...userImages, image]);
            setLoading(false);
            statusMessage("Image ready");
          })
          .catch((err) => {
            setLoading(false);
            statusMessage(err.message + ". Try again or come back later");
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
      />
    </Container>
  );
}

export default App;
