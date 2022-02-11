import React from "react";

import Workout from './Workout/Workout';

import { Row } from "react-bootstrap"

const Workouts = (props) => {
  return (
    <React.Fragment>
      <h2> Workouts </h2>
      <Row>
          {props.team.map((workouts, index) => {
              return <Workout 
                  id={workouts.id}
                  title={workouts.title}
                  description={workouts.description}
              />
          })}
      </Row>
    </React.Fragment>
  )
};

export default Workouts;