import React from "react";
import "./data-entry.css";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { ApolloContext } from "../../apollo-context-provider";
import { TopNavigator } from "../../utilities/top-navigator";
import { ConfirmationCard } from "./confirmation-card";

const INSERT_VALUE = gql`
  mutation InsertValueMutation(
    $unit: String!
    $value: Float!
    $latitude: Float
    $longitude: Float
  ) {
    insertValue(
      unit: $unit
      value: $value
      latitude: $latitude
      longitude: $longitude
    )
  }
`;

export class DataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.onRadioButtonClick = this.onRadioButtonClick.bind(this);
    this.onUnitNameInputChange = this.onUnitNameInputChange.bind(this);
    this.onUnitValueInputChange = this.onUnitValueInputChange.bind(this);
    this.onSubmitButtonPress = this.onSubmitButtonPress.bind(this);
    this.onLocationCheckboxToggle = this.onLocationCheckboxToggle.bind(this);
    this.insertValueMutation = this.insertValueMutation.bind(this);
    this.unitNameInput = React.createRef();
    this.unitValueInput = React.createRef();
    this.state = {
      unitName: "",
      unitValue: "",
      locationEnabled: true,
      transactions: []
    };
  }

  onRadioButtonClick(event) {
    this.setState({
      ...this.state,
      unitName: event.currentTarget.value
    });
    this.unitNameInput.current.value = event.currentTarget.value;
  }

  onUnitNameInputChange(event) {
    this.setState({
      ...this.state,
      unitName: event.currentTarget.value
    });
  }

  onUnitValueInputChange(event) {
    this.setState({
      ...this.state,
      unitValue: event.currentTarget.value
    });
  }

  onSubmitButtonPress() {
    if (
      !this.state.unitName ||
      !this.state.unitValue ||
      isNaN(parseFloat(this.state.unitValue))
    ) {
      console.error("Submission failed");
      return;
    }
    const value = parseFloat(this.state.unitValue);
    if ("geolocation" in navigator && this.state.locationEnabled) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.insertValueMutation(
          this.state.unitName,
          value,
          pos.coords.latitude,
          pos.coords.longitude
        );
      });
    } else {
      this.insertValueMutation(this.state.unitName, value);
    }
  }

  insertValueMutation(unit, value, latitude, longitude) {
    this.context.client
      .mutate({
        mutation: INSERT_VALUE,
        variables: { unit, value, latitude, longitude }
      })
      .then(result => {
        console.log(result.data.insertValue);
        const tx = this.state.transactions;
        tx.push(result.data.insertValue);
        this.setState({
          ...this.state,
          transactions: tx
        });
      });
  }

  onLocationCheckboxToggle() {
    this.setState({
      ...this.state,
      locationEnabled: !this.state.locationEnabled
    });
  }

  render() {
    const transactionCards = this.state.transactions.map(val => {
      return <ConfirmationCard key={val} txHash={val}></ConfirmationCard>;
    });
    return (
      <div className="container">
        <TopNavigator page="dataEntry"></TopNavigator>
        <div id="display-container">
          <div className="form-container">
            <h3>Data Entry Form</h3>
            <UnitList onChange={this.onRadioButtonClick}></UnitList>
            <p>
              Please enter the unit name and value of any units you would like
              to store
            </p>
            <input
              ref={this.unitNameInput}
              type="text"
              placeholder="Unit Name (lb, inch)"
              onChange={this.onUnitNameInputChange}
            ></input>
            <input
              ref={this.unitValueInput}
              type="text"
              placeholder="Unit Value (numerical)"
              onChange={this.onUnitValueInputChange}
            ></input>
            <div style={{ display: "flex" }}>
              <input
                type="checkbox"
                onChange={this.onLocationCheckboxToggle}
                checked={this.state.locationEnabled}
              ></input>
              <br></br> {"Location Enabled"}
            </div>
            <button onClick={this.onSubmitButtonPress} id="submit-button">
              Submit
            </button>
          </div>
          {transactionCards}
        </div>
      </div>
    );
  }
}

DataEntry.contextType = ApolloContext;

const GET_UNITS = gql`
  query {
    getAllAvailableUnits
  }
`;

function UnitList(props) {
  const { error, data } = useQuery(GET_UNITS);
  if (error) {
    console.error(error);
  }
  if (data) {
    if (data.getAllAvailableUnits.length === 0) {
      return null;
    } else if (data.getAllAvailableUnits.length > 5) {
      data.getAllAvailableUnits = data.getAllAvailableUnits.slice(0, 5);
    }
    const radioButtons = data.getAllAvailableUnits.map(unit => {
      return (
        <span key={unit}>
          <input
            onClick={props.onChange}
            type="radio"
            name="unit"
            value={unit}
          ></input>{" "}
          {unit}
          <br></br>
        </span>
      );
    });
    return <div style={{ display: "flex" }}>{radioButtons}</div>;
  } else {
    return null;
  }
}
