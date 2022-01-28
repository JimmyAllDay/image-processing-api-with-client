import React from "react";

import { Link } from "react-router-dom";

import { Container, Row, Col, Form } from "react-bootstrap";

import { HiArrowCircleRight } from "react-icons/hi";

export default function Upload({
  handleImageSelect,
  handleHeightSelect,
  handleWidthSelect,
  selectedFiles,
  formSubmit,
  userMessage,
}) {
  return (
    <Container fluid className="p-0 h-100 d-flex flex-column">
      <Container
        className="rounded-3 m-auto justify-content-center shadow-lg"
        style={{ width: "auto", height: "235px" }}
      >
        <Row className="mx-auto">
          <Col>
            <Form>
              <Form.Group className="mb-2 mt-4 d-flex" controlId="fileupload">
                <Form.Label className="my-auto me-2">
                  <h5 className="my-auto">Image:</h5>
                </Form.Label>
                <Form.Control
                  type="file"
                  name={selectedFiles && selectedFiles[0].name}
                  accept="image/png, image/jpeg, image/jpg, image/svg"
                  onChange={(e) => handleImageSelect(e)}
                  // TODO: Set up for multiple files using 'multiple' tag below
                />
              </Form.Group>
              <Form.Group className="mb-2 mt-2 d-flex" controlId="selectheight">
                <Form.Label className="my-auto me-2">
                  <h5 className="my-auto">Height:</h5>
                </Form.Label>
                <Form.Select
                  aria-label="select height"
                  onChange={(e) => handleHeightSelect(e)}
                >
                  <option value={null}>Select height</option>
                  <option value="200">200 px</option>
                  <option value="300">300 px</option>
                  <option value="400">400 px</option>
                  <option value="500">500 px</option>
                  <option value="600">600 px</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mt-2 d-flex" controlId="selectwidth">
                <Form.Label className="my-auto me-3">
                  <h5 className="my-auto">Width:</h5>
                </Form.Label>
                <Form.Select
                  aria-label="select width"
                  onChange={(e) => handleWidthSelect(e)}
                >
                  <option value={null}>Select width</option>
                  <option value="200">200 px</option>
                  <option value="300">300 px</option>
                  <option value="400">400 px</option>
                  <option value="500">500 px</option>
                  <option value="600">600 px</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2 d-flex" controlId="selectwidth">
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
  );
}
