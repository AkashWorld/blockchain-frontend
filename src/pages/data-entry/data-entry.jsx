/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import { Redirect } from "react-router";
import { Card, CardTitle, CardText, CardDeck, CardBody } from "reactstrap";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const insertMutation = gql`
mutation insertMutation(
    $unit: String!,
    $value: Float!,
    $latitude: Float!,
    $longitude: Float!
){
    insertValue(value: $value, unit: $unit, latitude: $latitude, longitude: $longitude)
}
`;

export class DataEntryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: 0,
      sex: "Choose Sex...",
      weight: 0,
      wunits: "Choose Unit...",
      height: 0,
      hunits: "Choose Unit...",
      showMenuHeight: false,
      showMenuWeight: false,
      showMenuSex: false,
    };

    this.addheight = this.addheight.bind(this);
    this.addheightUnits = this.addheightUnits.bind(this);
    this.addweight = this.addweight.bind(this);
    this.addweightUnits = this.addweightUnits.bind(this);
    this.addage = this.addage.bind(this);
    this.setsex = this.setsex.bind(this);
    this.enterForm = this.enterForm.bind(this);
    this.showMenuSex = this.showMenuSex.bind(this);
    this.showMenuHeight = this.showMenuHeight.bind(this);
    this.showMenuWeight = this.showMenuWeight.bind(this);
    this.closeMenuS = this.closeMenuS.bind(this);
    this.closeMenuH = this.closeMenuH.bind(this);
    this.closeMenuW = this.closeMenuW.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  showMenuSex(event) {
    event.preventDefault();

    this.setState({ showMenuSex: true }, () => {
      document.addEventListener("click", this.closeMenuS);
    });
  }

  showMenuHeight(event) {
    event.preventDefault();

    this.setState({ showMenuHeight: true }, () => {
      document.addEventListener("click", this.closeMenuH);
    });
  }

  showMenuWeight(event) {
    event.preventDefault();

    this.setState({ showMenuWeight: true }, () => {
      document.addEventListener("click", this.closeMenuW);
    });
  }

  closeMenuS() {
    this.setState({ showMenuSex: false }, () => {
      document.removeEventListener("click", this.closeMenuS);
    });
  }
  closeMenuH() {
    this.setState({ showMenuHeight: false }, () => {
      document.removeEventListener("click", this.closeMenuH);
    });
  }
  closeMenuW() {
    this.setState({ showMenuWeight: false }, () => {
      document.removeEventListener("click", this.closeMenuW);
    });
  }

  addweight(w) {
    w.preventDefault();

    this.setState({ ...this.state, ...{ weight: w.target.value } });
  }
  addweightUnits(unitw) {
    unitw.preventDefault();

    this.setState({ ...this.state, ...{ wunits: unitw.target.value } });
  }

  addheight(h) {
    h.preventDefault();

    this.setState({ ...this.state, ...{ height: h.target.value } });
  }
  addheightUnits(unith) {
    unith.preventDefault();
    this.setState({ ...this.state, ...{ hunits: unith.target.value } });
  }

  addage(a) {
    a.preventDefault();
    this.setState({ ...this.state, ...{ age: a.target.value } });
  }
  setsex(gen) {
    gen.preventDefault();

    this.setState({ ...this.state, ...{ sex: gen.target.value } });
  }

  getLocation() {
    const status = document.querySelector("#status");

    function error() {
      alert("Unable to retrieve your location");
    }
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      navigator.geolocation.getCurrentPosition(this.enterForm, error);
    }
  }

  enterForm(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // eslint-disable-next-line no-restricted-globals
    if (
      confirm(
        "Do the following look correct (Y/N)? \n Age is: " +
          this.state.age +
          "\n Sex is: " +
          this.state.sex +
          "\n Height is: " +
          this.state.height +
          " " +
          this.state.hunits +
          "\n Weight is: " +
          this.state.weight +
          " " +
          this.state.wunits
      )
    ) {
      let [insertValue, { data }] = useMutation(insertMutation);
        insertValue({
          variables: {
            value: this.state.height,
            unit: this.state.hunits,
            longitude: longitude,
            lattitude: latitude
          }
        });
        insertValue({
          variables: {
            value: this.state.weight,
            unit: this.state.wunits,
            longitude: longitude,
            lattitude: latitude
          }
        });
      return <Redirect to="dashboard" />;
    }
  }

  render() {
    return (
      <div className="Form" style={{ backgroundColor: "#FBB9FD" }}>
        <form onSubmit={this.getLocation}>
          <header>
            <center>
              <font size="18" color="#3E007E">
                Please Enter Your Health Data
              </font>
            </center>
          </header>
          <center>
            <CardDeck>
              <Card
                style={{
                  backgroundColor: "#E83CEB",
                  width: "9rem",
                  borderRadius: 10,
                  padding: 1,
                  margin: 20,
                  
                }}
              >
                <CardBody>
                  <CardTitle style={{ color: "#001ABF", fontWeight: "bold" }}>
                    <font size="5">Enter Age: </font>
                  </CardTitle>
                  <CardText>
                    <label htmlFor="Entry">
                      <input
                        className="form-control"
                        type="input"
                        name="age"
                        size="9"
                        style={{ borderRadius: 3 }}
                        placeholder="Age is..."
                        onChange={this.addage}
                      />
                    </label>
                  </CardText>
                </CardBody>
              </Card>
              <Card
                style={{
                  backgroundColor: "#E83CEB",
                  width: "13rem",
                  padding: 1,
                  borderRadius: 10,
                  margin: 20
                }}
              >
                <CardBody>
                  <CardTitle style={{ color: "#001ABF", fontWeight: "bold" }}>
                    <font size="5">Click to Pick Sex: </font>
                  </CardTitle>
                  <CardText>
                    <button
                      onClick={this.showMenuSex}
                      style={{ backgroundColor: "#69C1FF", borderRadius: 5 }}
                    >
                      {this.state.sex}
                    </button>

                    {this.state.showMenuSex ? (
                      <div className="menu">
                        <button
                          onClick={this.setsex}
                          value="Male"
                          style={{
                            backgroundColor: "#69C1FF",
                            color: "white",
                            borderRadius: 10,
                          }}
                        >
                          {" "}
                          Male{" "}
                        </button>
                        <button
                          onClick={this.setsex}
                          value="Female"
                          style={{
                            backgroundColor: "#69C1FF",
                            color: "white",
                            borderRadius: 10,
                          }}
                        >
                          {" "}
                          Female{" "}
                        </button>
                        <button
                          onClick={this.setsex}
                          value="Other"
                          style={{
                            backgroundColor: "#69C1FF",
                            color: "white",
                            borderRadius: 10,
                          }}
                        >
                          {" "}
                          Other{" "}
                        </button>
                      </div>
                    ) : null}
                  </CardText>
                </CardBody>
              </Card>
              <Card
                style={{
                  backgroundColor: "#E83CEB",
                  width: "20rem",
                  padding: 1,
                  borderRadius: 10,
                  margin: 20
                }}
              >
                <CardBody>
                  <CardTitle style={{ color: "#001ABF", fontWeight: "bold" }}>
                    <font size="5">Enter Height and It's Units: </font>
                  </CardTitle>
                  <CardText>
                    <input
                      className="form-control"
                      type="input"
                      name="height"
                      size="10"
                      style={{ borderRadius: 3 }}
                      placeholder="Height is..."
                      onChange={this.addheight}
                    />
                    <button
                      onClick={this.showMenuHeight}
                      style={{ backgroundColor: "#69C1FF", borderRadius: 5 }}
                    >
                      {this.state.hunits}
                    </button>
                    {this.state.showMenuHeight ? (
                      <div className="menu">
                        <button
                          onClick={this.addheightUnits}
                          value="ft"
                          style={{
                            backgroundColor: "#69C1FF",
                            color: "white",
                            borderRadius: 10,
                          }}
                        >
                          {" "}
                          feet{" "}
                        </button>
                        <button
                          onClick={this.addheightUnits}
                          value="in"
                          style={{
                            backgroundColor: "#69C1FF",
                            color: "white",
                            borderRadius: 10,
                          }}
                        >
                          {" "}
                          inches{" "}
                        </button>
                        <button
                          onClick={this.addheightUnits}
                          value="m"
                          style={{
                            backgroundColor: "#69C1FF",
                            color: "white",
                            borderRadius: 10,
                          }}
                        >
                          {" "}
                          meters{" "}
                        </button>
                        <button
                          onClick={this.addheightUnits}
                          value="cm"
                          style={{
                            backgroundColor: "#69C1FF",
                            color: "white",
                            borderRadius: 10,
                          }}
                        >
                          {" "}
                          centimeters{" "}
                        </button>
                      </div>
                    ) : null}
                  </CardText>
                </CardBody>
              </Card>
              <Card
                style={{
                  backgroundColor: "#E83CEB",
                  width: "20rem",
                  padding: 1,
                  borderRadius: 10,
                  margin: 20
                }}
              >
                <CardBody>
                  <CardTitle style={{ color: "#001ABF", fontWeight: "bold" }}>
                    <font size="5">Enter Weight and It's Units: </font>
                  </CardTitle>
                  <CardText>
                    <label htmlFor="Entry">
                      {" "}
                      <input
                        className="form-control"
                        type="input"
                        size="10"
                        style={{ borderRadius: 3 }}
                        name="weight"
                        placeholder="Weight is..."
                        onChange={this.addweight}
                      />
                      <button
                        onClick={this.showMenuWeight}
                        style={{ backgroundColor: "#69C1FF", borderRadius: 5 }}
                      >
                        {this.state.wunits}
                      </button>
                      {this.state.showMenuWeight ? (
                        <div className="menu">
                          <button
                            onClick={this.addweightUnits}
                            value="lb"
                            style={{
                              backgroundColor: "#69C1FF",
                              color: "white",
                              borderRadius: 10,
                            }}
                          >
                            {" "}
                            pounds{" "}
                          </button>
                          <button
                            onClick={this.addweightUnits}
                            value="kg"
                            style={{
                              backgroundColor: "#69C1FF",
                              color: "white",
                              borderRadius: 10,
                            }}
                          >
                            {" "}
                            kilograms{" "}
                          </button>
                        </div>
                      ) : null}
                    </label>
                  </CardText>
                </CardBody>
              </Card>
            </CardDeck>
          </center>

          <center>
            <input type="submit" value="SUBMIT"></input>
          </center>
        </form>
      </div>
    );
  }
}
