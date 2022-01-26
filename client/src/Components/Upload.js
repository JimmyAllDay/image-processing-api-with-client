import React from "react";

import { Link } from "react-router-dom";

import { Container, Row, Col, Form } from "react-bootstrap";

import { HiArrowCircleRight } from "react-icons/hi";

export default function Upload({
  handleImageSelect,
  handleSizeSelect,
  selectedFiles,
  formSubmit,
  userMessage,
}) {
  return (
    console.log(selectedFiles),
    (
      <Container fluid className="p-0 h-100 d-flex flex-column">
        <Container
          className="rounded-3 m-auto justify-content-center shadow-lg"
          style={{ width: "auto", height: "200px" }}
        >
          <Row className="mx-auto">
            <Col>
              <Form>
                <Form.Group className="mb-3 mt-4" controlId="fileupload">
                  <Form.Control
                    type="file"
                    name={selectedFiles && selectedFiles[0].name}
                    accept="image/png, image/jpeg image/svg"
                    onChange={(e) => handleImageSelect(e)}

                    // TODO: Set up for multiple files using multiple tag below
                    // multiple
                  />
                  <Form.Select
                    className="mt-3"
                    aria-label="Default select example"
                    onChange={(e) => handleSizeSelect(e)}
                  >
                    <option>Select image size</option>
                    <option value="200">200 x 200</option>
                    <option value="300">300 x 300</option>
                    <option value="400">400 x 400</option>
                  </Form.Select>
                  <Form.Control
                    className="mt-3"
                    type="submit"
                    onClick={(e) => {
                      formSubmit(e);
                    }}
                  />
                </Form.Group>
              </Form>
              <div className="w-100 d-flex">
                <p className="mt-5 w-auto mx-auto text-danger">{userMessage}</p>
              </div>
            </Col>
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
    )
  );
}
