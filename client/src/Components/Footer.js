import React from "react";

import { Container, Col, Row } from "react-bootstrap";

import { FaGithubAlt } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { RiGatsbyLine } from "react-icons/ri";

import "../styles/footer.scss";

export default function Footer() {
  return (
    <Container fluid className="bg-dark h-25 mt-auto">
      <Container className="h-100 d-flex flex-column">
        <Row className="mt-auto">
          <Col className="text-light p-2 text-center my-auto">
            <h3 className="m-0">
              <a className="text-info" href="mailto:jameswhmarshall@gmail.com">
                jameswhmarshall@gmail.com
              </a>
            </h3>
          </Col>
        </Row>
        <Row className="">
          <Col md={5} className="d-flex justify-content-evenly mx-auto">
            <a href="https://twitter.com/?lang=en" className="m-0">
              <h2 className="text-info">
                <FiTwitter />
              </h2>
            </a>
            <a href="https://github.com/JimmyAllDay" className="m-0">
              <h2 className="text-info">
                <FaGithubAlt />
              </h2>
            </a>
            <a href="https://www.gatsbyjs.com" className="m-0">
              <h2 className="text-info">
                <RiGatsbyLine />
              </h2>
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
