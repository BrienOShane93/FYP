import React from "react";
import { Grid, Image, Label } from "semantic-ui-react";

const MemberCard = (props) => {
  return (
    <Grid.Column mobile={4} computer={2} textAlign="center">
      <Image src={props.image} alt={props.alt} size="tiny" centered />
      <Label pointing>&euro; {props.price.toFixed(2)} </Label>
    </Grid.Column>

    <div class="ui card">
      <div class="image">
        <img src={props.image}>
        <Button color='green' icon onClick={props.delete}>
          <Icon name='close icon' />
          Delete
        </Button>
      </div>
      <div class="content">
        <a class="header">{props.name}</a>
        <div class="meta">
          <span class="date">{props.type}</span>
        </div>
      </div>
      <div class="extra content">
        <Button color='green' icon onClick={props.open}>
          Profile
        </Button>
      </div>
    </div>
  );
};

export default MemberCard;
