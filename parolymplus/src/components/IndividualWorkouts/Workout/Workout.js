import React from "react";

import { Col, Card, Button } from "react-bootstrap"

const Workout = (props) => {
  return (
    <Col>
      <Card style={{ width: '14rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            Description
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  )
};

export default Workout;