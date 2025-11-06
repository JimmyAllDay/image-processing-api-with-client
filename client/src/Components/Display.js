import React from "react";

import { Link } from "react-router-dom";

import { Container, Col, Row, Image } from "react-bootstrap";

import { IoReturnUpBackOutline } from "react-icons/io5";

const imageStyle = { width: "100%", height: "100%", objectFit: "contain" };

export default function Display(props) {
  const { userImages } = props;
  const imageMap = userImages.map((image, i) => {
    return (
      <Col key={i} className="d-flex flex-wrap p-3">
        <Image className="mx-auto" src={image} alt="" style={imageStyle} />
      </Col>
    );
  });

  return (
    <Container fluid className="h-100 d-flex flex-column bg-light">
      <Row>
        <Link to="/">
          <h1>
            <IoReturnUpBackOutline
              className="rounded-2 shadow bg-light"
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
