import React, { useState } from "react";
import Navigation from "./Navigation";
import Upload from "./Upload.js";
import Display from "./Display.js";
import Footer from "./Footer";

import * as formUtils from "./formUtils";

import { Routes, Route } from "react-router-dom";

import { Container } from "react-bootstrap";

import "../styles/App.scss";

function App() {
  // TODO: Add CSS slide transition, using Transition Group
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [heightData, setHeightData] = useState(null);
  const [widthData, setWidthData] = useState(null);
  const [userMessage, setUserMessage] = useState(null);

  const handleImageSelect = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleHeightSelect = (e) => {
    setHeightData(e.target.value);
  };
  const handleWidthSelect = (e) => {
    setWidthData(e.target.value);
  };

  //Return messages to UI about errors and request status
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
    data.append("height", heightData);
    data.append("width", widthData);
    data.append("file", selectedFiles && selectedFiles[0]);

    formUtils.sendHandler(data, statusMessage);
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
              handleHeightSelect={handleHeightSelect}
              handleWidthSelect={handleWidthSelect}
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
