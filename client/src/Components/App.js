import React, { useState } from "react";
import Navigation from "./Navigation";
import Upload from "./Upload.js";
import Display from "./Display.js";
import Footer from "./Footer";

import axios from "axios";

import { Routes, Route } from "react-router-dom";

import { Container } from "react-bootstrap";

import "../styles/App.scss";

function App() {
  // TODO: Add CSS slide transition, using Transition Group

  const [selectedFiles, setSelectedFiles] = useState(null);
  const [sizeData, setSizeData] = useState(null);
  const [userMessage, setUserMessage] = useState(null);

  const handleImageSelect = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSizeSelect = (e) => {
    setSizeData(e.target.value);
  };

  const statusMessage = (message) => {
    setUserMessage(message);
    setTimeout(() => {
      setUserMessage(null);
    }, 3000);
    return message;
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", selectedFiles);
    data.append("dimensions", sizeData);
    const url = "http://localhost:5000/sendimage";
    if (selectedFiles && sizeData) {
      statusMessage("Sending image");
      axios
        .post(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else if (selectedFiles && !sizeData) {
      return statusMessage("Please choose an image size");
    } else if (sizeData && !selectedFiles) {
      return statusMessage("Please select an image");
    } else {
      return statusMessage("Please select an image and an image size");
    }
  };

  return (
    <Container fluid className="p-0 h-100 d-flex flex-column">
      <Navigation />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Upload
              userMessage={userMessage}
              handleImageSelect={handleImageSelect}
              handleSizeSelect={handleSizeSelect}
              formSubmit={formSubmit}
              selectedFiles={selectedFiles}
            />
          }
        />
        <Route exact path="/display" element={<Display />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
