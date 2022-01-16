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

  const handleImageSelect = (e) => {
    setSelectedFiles(e.target.files);
  };

  const formSubmit = () => {
    const data = new FormData();
    data.append("file", selectedFiles);
    let url = "http://localhost:3001/sendimage";

    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    console.log(selectedFiles),
    (
      <Container fluid className="p-0 h-100 d-flex flex-column">
        <Navigation />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Upload
                handleImageSelect={handleImageSelect}
                formSubmit={formSubmit}
              />
            }
          />
          <Route exact path="/display" element={<Display />} />
        </Routes>
        <Footer />
      </Container>
    )
  );
}

export default App;
