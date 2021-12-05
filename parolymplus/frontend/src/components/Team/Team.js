import React from "react";
import { Grid, Header, Segment } from "semantic-ui-react";
import MenuItem from "./MemberCard/MemberCard";

const Team = (props) => {
  return (
    <Grid.Column width={12}>
      <Grid>
        {props.menu.map((toppings, index) => {
          return (
            <MemberCard
              key={toppings.id}
              image={toppings.image}
              alt={toppings.alt}
              price={toppings.price}
            />
          );
        })}
      </Grid>
    </Grid.Column>
  );
};

export default Team;
