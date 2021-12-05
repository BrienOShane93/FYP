import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import axios from "../../axios-orders";

import Team from "../../components/Team/Team";
import Member from "../../components/Member/Member";
import Loader from "../../components/Feedback/Loader/Loader";
import ErrorModal from "../../components/Feedback/ErrorModal/ErrorModal";

const Trainer = (props) => {

  // MENU, ERROR AND LOADING STATE AND GET TOPPINGS FROM FIREBASE
  const [teamState, setTeamState] = useState({
    athletes: [],
  });

  const [errorState, setErrorState] = useState({
    error: false,
    errorMessage: null,
  });

  const [loadingState, setLoadingState] = useState({
    isLoading: true,
    loadFailed: false,
  });

  useEffect(() => {
    axios
      .get("/")
      .then((response) => {
        let sortedAthletes = response.data.athletes.sort(function (a, b) {
          return a.id - b.id;
        });
        setMenuState({ athletes: sortedAthletes });
      })
      .catch((error) => {
        setErrorState({
          error: true,
          errorMessage: error.response.data.message,
        });
        setLoadingState({ isLoading: false, loadFailed: teamState.loadFailed });
        console.log(error.response);
      });
  }, []);

  // ORDER STATE

  // Set order state conditionally - either to old order state or starting state

  const [memberState, setMemberState] = useState({
    chosenAthletes: props.location.state
      ? props.location.state.member.chosenAthletes
      : [],
  });

  // EVENT HANDLERS - ADD TOPPING

  const addAthleteHandler = (id) => {
    let member = { ...memberState };

    // find the chosen topping in the menu
    const teamIndex = teamState.athletes.findIndex(
      (athlete) => athlete.id === id
    );

    // check if the topping has already been added to the orderToppings array
    const memberIndex = member.chosenAthletes.findIndex(
      (athlete) => athlete.id === id
    );

    // if so, increase its count by 1
    if (memberIndex > -1) {
      member.chosenAthletes[memberIndex].count++;
    }
    // otherwise (i.e. this topping is being added for the first time)
    // create this topping and add it to the order toppings array
    else {
      // Save the id, name and price of the chosen topping; set its count to 1
      const chosenAthlete = {
        id: teamState.athletes[teamIndex].id,
        name: teamState.athletes[teamIndex].name,
        email: teamState.athletes[teamIndex].email,
        count: 1,
      };
      member.chosenAthletes.push(chosenAthlete);
    }

    // Update the order state with the new price and updated toppings array
    setMemberState({
      chosenAthletes: member.chosenAthletes,
    });
  };

  // EVENT HANDLERS - REMOVE TOPPING

  const removeAthleteHandler = (id) => {
    let member = { ...memberState };

    // Find topping with matching id from the orderToppings
    const index = member.chosenAthletes.findIndex(
      (athlete) => athlete.id === id
    );

    // If topping was found, update the price and decrease the count
    if (index >= 0) {
      member.chosenAthletes[index].count--;

      // If the count is now 0, remove the topping completely
      if (member.chosenAthletes[index].count < 1) {
        member.chosenAthletes.splice(index, 1);
      }
    }

    // Update order state with updated price and updated toppings array
    setMemberState({
      chosenAthletes: member.chosenAthletes,
    });
  };

  // EVENT HANDLERS - CHECK OUT

  const checkoutHandler = () => {
    props.history.push({
      pathname: "place-order",
      state: {
        order: orderState,
        menu: menuState.toppings,
      },
    });
  };

  // ERROR HANDLER

  const errorHandler = () => {
    setErrorState({
      error: false,
      errorMessage: null,
    });
    setLoadingState({
      isLoading: false,
      loadFailed: true,
    });
  };

  // DISABLE CHECKOUT BUTTON IF NO TOPPINGS CHOSEN

  let checkoutDisabled = true;

  if (orderState.chosenToppings.length > 0) {
    checkoutDisabled = false;
  }

  // DISPLAY PIZZA PAL MENU AND CONTROLS

  let pizzapalMenu = errorState.error ? (
    <ErrorModal error={errorState.errorMessage} onClear={errorHandler} />
  ) : (
    <Loader active={loadingState.isLoading} />
  );

  if (menuState.toppings.length > 0) {
    pizzapalMenu = (
      <Grid divided="vertically" stackable>
        <Grid.Row centered>
          <Menu menu={menuState.toppings} />
        </Grid.Row>
        <Order
          menu={menuState.toppings}
          toppingAdded={addToppingHandler}
          toppingRemoved={removeToppingHandler}
          chosenToppings={orderState.chosenToppings}
          totalPrice={orderState.totalPrice}
          checkout={checkoutHandler}
          disabled={checkoutDisabled}
        />
      </Grid>
    );
  } else if (loadingState.loadFailed) {
    pizzapalMenu = (
      <p>
        We're having some issues loading the menu... Please try again later.
      </p>
    );
  }

  return <div>{pizzapalMenu}</div>;
};

export default Trainer;
