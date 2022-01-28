import React from "react";

import { Link } from "react-router-dom";

import { Container, Col, Row } from "react-bootstrap";

import { IoReturnUpBackOutline } from "react-icons/io5";

export default function Display(props) {
  console.log(props);
  const { userImages } = props;
  const imageMap = userImages.map((image, i) => {
    return (
      <Col key={i} className="d-flex flex-wrap">
        <img className="mx-auto" src={image} alt="" />
      </Col>
    );
  });

  return (
    <Container fluid className="h-100 d-flex flex-column">
      <Row>
        <Link to="/">
          <h1>
            <IoReturnUpBackOutline
              className="rounded-2 shadow"
              style={{ width: "60px" }}
            />
          </h1>
        </Link>
      </Row>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-2">
        {imageMap}
      </Row>
    </Container>
  );
}
