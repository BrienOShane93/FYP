import React from "react";

import { Navbar, Container, Nav} from "react-bootstrap"

const AthleteMenu = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <img
            alt=""
            src="/parolymplus-logo.svg"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{' '}
        <Container>
        <Navbar.Brand href="#home">
          Parolymplus
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#athlete">Home</Nav.Link>
          <Nav.Link href="#team">Workouts</Nav.Link>
          <Nav.Link href="#team">Diet</Nav.Link>
          <Nav.Link href="#team">Schedule</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link eventKey={2} href="#memes">
            <img
              alt=""
              src="/parolymplus-logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    </>
  )
};

export default AthleteMenu;