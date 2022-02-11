import React from "react";

import { Col, Card, Button } from "react-bootstrap"

const Meal = (props) => {
  return (
    <Col>
      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>
            Description
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
};

export default Meal;