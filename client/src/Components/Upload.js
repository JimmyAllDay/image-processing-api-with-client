import React, { useState } from "react";

import DimensionInput from "./DimensionInput";

import { Link } from "react-router-dom";

import { Container, Row, Col, Form, Spinner, Button } from "react-bootstrap";

import { HiArrowCircleRight } from "react-icons/hi";

export default function Upload(props) {
  const { formSubmit, userMessage, loading } = props;

  const [file, setFile] = useState("");
  const ref = React.useRef();

  const [height, setHeight] = useState(undefined);
  const [width, setWidth] = useState(undefined);

  const widthHandler = (width) => {
    setWidth(width);
  };

  const heightHandler = (width) => {
    setHeight(width);
  };

  const clearFileInput = () => {
    return (ref.current.value = "");
  };

  return (
    <Container fluid className="p-0 h-100 d-flex flex-column">
      <Container
        className="rounded-3 justify-content-center shadow-lg bg-blur mt-auto "
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
                  ref={ref}
                  type="file"
                  name={file}
                  accept="image/png, image/jpeg, image/jpg, image/svg"
                  onChange={(e) => {
                    setFile(e.target.files);
                  }}
                />
              </Form.Group>
              <DimensionInput
                axis="height"
                handler={heightHandler}
                value={height}
              />
              <DimensionInput
                axis="width"
                handler={widthHandler}
                value={width}
              />
              <Form.Group className="mb-2 d-flex" controlId="selectwidth">
                <Button
                  className="w-100 mt-3"
                  variant="primary"
                  type="submit"
                  disabled={!height || !width || !file ? true : false}
                  onClick={(e) => {
                    formSubmit(e, file, width, height);
                    setHeight("");
                    setWidth("");
                    clearFileInput();
                  }}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <div className="w-100 d-flex mb-auto mt-3" style={{ height: "25px" }}>
        {loading ? (
          <Spinner
            variant="primary"
            className="mx-auto"
            animation="border"
            size="sm"
          />
        ) : (
          <p className="p-0 w-auto mx-auto my-0 text-secondary">
            {userMessage}
          </p>
        )}
      </div>
      <h1 className="align-self-end me-3 mb-3">
        <Link to="/display">
          <HiArrowCircleRight
            className="rounded-2 shadow bg-light"
            style={{ width: "60px", height: "40px" }}
          />
        </Link>
      </h1>
    </Container>
  );
}
