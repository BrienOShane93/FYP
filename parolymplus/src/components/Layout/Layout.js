import React from "react";

import { Container } from "react-bootstrap"

import TrainerMenu from '../Menu/TrainerMenu';
import AthleteMenu from '../Menu/AthleteMenu';

const Layout = (props) => {
  return (
    <div>
      <TrainerMenu />
      <Container>
        <main>
          {props.children}
        </main>
      </Container>
    </div>
  )
};

export default Layout;