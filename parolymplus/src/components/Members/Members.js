import React from "react";

import Member from './Member/Member';
import AddMember from './AddMember/AddMember';

import { Row } from "react-bootstrap"

const Members = (props) => {
  return (
    <React.Fragment>
      <h2> Team Members </h2>
      <AddMember />
      <Row>
          {props.team.map((members, index) => {
              return <Member 
                  id={members.id}
                  name={members.name}
              />
          })}
      </Row>
    </React.Fragment>
  )
};

export default Members;