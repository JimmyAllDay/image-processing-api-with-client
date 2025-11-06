import React from "react";

import { Routes, Route } from "react-router-dom";

import Upload from "./Upload";
import Display from "./Display";
import About from "./About";

export default function appRoutes(props) {
  const { formSubmit, userMessage, loading, userImages } = props;

  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Upload
              formSubmit={formSubmit}
              userMessage={userMessage}
              loading={loading}
            />
          }
        />
        <Route
          exact
          path="/display"
          element={<Display userImages={userImages} />}
        />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </>
  );
}
