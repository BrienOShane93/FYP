import React from "react";

import { Col, Card, Button } from "react-bootstrap"

const Member = (props) => {
  return (
    <Col>
      <Card style={{ width: '14rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.ImgOverlay>
          <Button variant="primary">X</Button>
        </Card.ImgOverlay>
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  )
};

export default Member;