import React from "react";

import { Navbar, Nav, NavItem, Container, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Navigation() {
  return (
    <Navbar
      style={{
        height: "60px",
        backgroundColor: "rgb(53,56,57)",
      }}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-white d-none d-sm-flex" style={{ cursor: "pointer" }}>
            Image Processing API
          </Navbar.Brand>
        </LinkContainer>
        <LinkContainer to="/">
          <Navbar.Brand className="text-white d-flex d-sm-none" style={{ cursor: "pointer" }}>
            Image API
          </Navbar.Brand>
        </LinkContainer>
        <Col xs={7} sm={5} lg={3} className="ms-auto ms-sm-5 me-sm-auto">
          <Nav className="me-auto text-light w-100 d-flex justify-content-between">
            <LinkContainer to="/">
              <NavItem>Home</NavItem>
            </LinkContainer>
            <LinkContainer to="/display">
              <NavItem>Images</NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem>About</NavItem>
            </LinkContainer>
          </Nav>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Navigation;
