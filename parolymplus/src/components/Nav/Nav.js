import React from "react";
import { Menu } from 'semantic-ui-react';
import Button from 'react-bootstrap/Button';

const Nav = (props) => {
  return (
    <nav>
      <Menu text>
        <Menu.Item
          name='Workouts'
        />

        <Menu.Item
          name='Records'
        />

        <Menu.Item
          name='Diet'
        />

        <Menu.Item
          name='Training plan'
        />
      </Menu>
      <>
  <Button variant="primary">Primary</Button>{' '}
  <Button variant="secondary">Secondary</Button>{' '}
  <Button variant="success">Success</Button>{' '}
  <Button variant="warning">Warning</Button>{' '}
  <Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
  <Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
  <Button variant="link">Link</Button>
</>
    </nav>
  )
};

export default Nav;