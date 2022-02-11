import React from "react";

import { Navbar, Container, Nav} from "react-bootstrap"

const TrainerMenu = (props) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <img
            alt=""
            src="/parolymplus-logo.svg"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />{' '}
        <Navbar.Brand href="#home">
          Parolymplus
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#trainer">Home</Nav.Link>
          <Nav.Link href="#team">Team</Nav.Link>
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

export default TrainerMenu;