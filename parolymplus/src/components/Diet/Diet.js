import React from "react";

import Meal from './Meal/Meal';

import { Row } from "react-bootstrap"

const Diet = (props) => {
  return (
    <React.Fragment>
      <h2> Diet </h2>
      <Row>
          {props.team.map((diet, index) => {
              return <Meal 
                  id={diet.id}
                  title={diet.title}
                  description={diet.description}
              />
          })}
      </Row>
    </React.Fragment>
  )
};

export default Diet;