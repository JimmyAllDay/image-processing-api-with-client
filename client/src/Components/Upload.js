import React from "react";

import { Link } from "react-router-dom";

import { Container, Row, Form } from "react-bootstrap";

import { HiArrowCircleRight } from "react-icons/hi";

export default function Upload({ formSubmit, handleImageSelect }) {
  return (
    <Container fluid className="p-0 h-100 d-flex flex-column">
      <Container
        className="rounded-3 m-auto justify-content-center shadow-lg"
        style={{ width: "auto", height: "200px" }}
      >
        <Row className="mx-auto">
          <Form>
            <Form.Group className="mb-3 mt-4" controlId="fileupload">
              <Form.Control
                type="file"
                accept="image/png, image/jpeg image/svg"
                onChange={(e) => handleImageSelect(e)}
              />
              <Form.Select className="mt-3" aria-label="Default select example">
                <option>Select image size</option>
                <option value="200">200 x 200</option>
                <option value="300">300 x 300</option>
                <option value="400">400 x 400</option>
              </Form.Select>
              <Form.Control
                className="mt-3"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  formSubmit();
                }}
              />
            </Form.Group>
          </Form>
        </Row>
      </Container>
      <h1 className="align-self-end me-3 mb-3">
        <Link to="/display">
          <HiArrowCircleRight
            className="rounded-2 shadow"
            style={{ width: "60px", height: "40px" }}
          />
        </Link>
      </h1>
    </Container>
  );
}
