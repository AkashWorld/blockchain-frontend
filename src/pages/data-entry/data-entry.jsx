import React, { Component } from "react";
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
} from "reactstrap";
// import { useQuery } from "@apollo/react-hooks";
// import { useMutation } from "@apollo/react-hooks";
// import { gql } from "apollo-boost";

// const units = gql`
//   {
//     getAllAvailableUnits
//     }
//   }
// `;

// const insertMutation = gql`
//   mutation InsertMutation(
//     $unit: String!
//     $value: Float!
//     $latitude: Float!
//     $longitude: Float!
//   ) {
//     insertValue(
//       unit: $unit
//       value: $value
//       latitude: $latitude
//       longitude: $longitude
//     )
//   }
// `;

// function DataFunction() {
//   const { loading, error, data } = useQuery(units);

//   if (loading) return "Loading...";
//   if (error) return `Error! ${error.message}`;

//   return data.getAllAvailableUnits;
// }

export class DataEntryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: 0,
      sex: "",
      weight: 0,
      wunits: "lb",
      height: 0,
      hunits: "in",
      showMenuHeight: false,
      showMenuWeight: false,
      showMenuSex: false,
      // errorsex: false,
      // errorhunits: false,
      // errorwunits: false
    };

    this.addweight = this.addweight.bind(this);
    this.addweightUnits = this.addweightUnits.bind(this);
    this.addheight = this.addheight.bind(this);
    this.addheightUnits = this.addheightUnits.bind(this);
    this.addage = this.addage.bind(this);
    this.setsex = this.setsex.bind(this);
    this.enterForm = this.enterForm.bind(this);
    this.showMenuSex = this.showMenuSex.bind(this);
    this.showMenuHeight = this.showMenuHeight.bind(this);
    this.showMenuWeight = this.showMenuWeight.bind(this);
    this.closeMenuS = this.closeMenuS.bind(this);
    this.closeMenuH = this.closeMenuH.bind(this);
    this.closeMenuW = this.closeMenuW.bind(this);
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
    // let weightUnitsArray = DataFunction();

    // unitw.target.value.toLowerCase();

    // this.setState({ ...this.state, ...{ errorwunits: true } });
    // for (let i = 0; i < WeightUnitsArray.length; i++) {
    //   if (unitw.target.value === WeightUnitsArray[i][0]) {
    //     this.setState({ ...this.state, ...{ errorwunits: false } });
    //     this.setState({ ...this.state, ...{ wunits: unitw.target.value } });
    //   }
    // }
    this.setState({ ...this.state, ...{ wunits: unitw.target.value } });
  }

  addheight(h) {
    h.preventDefault();

    this.setState({ ...this.state, ...{ height: h.target.value } });
  }
  addheightUnits(unith) {
    unith.preventDefault();
    // var HeightUnitsArray = DataFunction();

    // unith.target.value.toLowerCase();

    // this.setState({ ...this.state, ...{ errorhunits: true } });
    // for (let i = 0; i < HeightUnitsArray.length; i++) {
    //   if (unith.target.value === HeightUnitsArray[i][0]) {
    //     this.setState({ ...this.state, ...{ errorhunits: false } });
    //     this.setState({ ...this.state, ...{ hunits: unith.target.value } });
    //   }
    // }
    this.setState({ ...this.state, ...{ hunits: unith.target.value } });
  }

  addage(a) {
    a.preventDefault();

    this.setState({ ...this.state, ...{ age: a.target.value } });
  }
  setsex(gen) {
    this.setState({ ...this.state, ...{ sex: gen.target.value } });
  }
  enterForm() {
    // if (this.state.errorhunits) {
    //   let newunith = prompt(
    //     "We do not recognize this unit. What is it's ratio to 1 foot?"
    //   );
    //   if (isNaN(newunith)) {
    //     this.enterForm();
    //   } else {
    //     let [insertValue, { data }] = useMutation(insertMutation);
    //     insertValue({
    //       variables: {
    //         unit: this.state.unith,
    //         value: newunith,
    //         longitude: 0,
    //         lattitude: 0
    //       }
    //     });

    //     this.setState({ errorhunits: false });
    //   }
    // }

    // if (this.state.errorwunits) {
    //   let newunitw = prompt(
    //     "We do not recognize this unit. What is it's ratio to 1 pound? (i.e. 0.4536 kg = 1 lb so you would enter 0.4536)"
    //   );
    //   if (isNaN(newunitw)) {
    //     this.enterForm();
    //   } else {
    //     let [insertValue, { data }] = useMutation(insertMutation);
    //     insertValue({
    //       variables: {
    //         unit: this.state.unitw,
    //         value: newunitw,
    //         longitude: 0,
    //         lattitude: 0
    //       }
    //     });

    //     this.setState({ errorwunits: false });
    //   }
    // }
    let confirmation = prompt(
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
    );
    if (confirmation.toLocaleLowerCase() === "y") {
      // Store data and proceed
    } else if (confirmation.toLocaleLowerCase() === "n") {
      // Allow user to change information
    } else {
      alert("Please enter Y for Yes or N for No");
      this.enterForm();
    }
  }
  render() {
    return (
      <div className="Form" style={{ backgroundColor: "#FBB9FD" }}>
        <form onSubmit={this.enterForm}>
          <CardDeck>
            <Card style={{ backgroundColor: "#E200A2" }}>
              <CardBody>
                <CardTitle style={{ color: "#D7B7FF", fontWeight: "bold" }}>
                  Enter Age:{" "}
                </CardTitle>
                <CardText>
                  <label htmlFor="Entry">
                    <input
                      className="form-control"
                      type="input"
                      name="age"
                      placeholder="Age is..."
                      onChange={this.addage}
                    />
                  </label>
                </CardText>
              </CardBody>
            </Card>
            <Card style={{ backgroundColor: "#E200A2" }}>
              <CardBody>
                <CardTitle style={{ color: "#D7B7FF", fontWeight: "bold" }}>
                  Choose Sex:{" "}
                </CardTitle>
                <CardText>
                  <button
                    onClick={this.showMenuSex}
                    style={{ backgroundColor: "#69C1FF" }}
                  >
                    Choose Sex...
                  </button>

                  {this.state.showMenuSex ? (
                    <div className="menu">
                      <button
                        onClick={this.setsex}
                        value="Male"
                        style={{ backgroundColor: "#69C1FF", color: "white" }}
                      >
                        {" "}
                        Male{" "}
                      </button>
                      <button
                        onClick={this.setsex}
                        value="Female"
                        style={{ backgroundColor: "#69C1FF", color: "white" }}
                      >
                        {" "}
                        Female{" "}
                      </button>
                      <button
                        onClick={this.setsex}
                        value="Other"
                        style={{ backgroundColor: "#69C1FF", color: "white" }}
                      >
                        {" "}
                        Other{" "}
                      </button>
                    </div>
                  ) : null}
                </CardText>
              </CardBody>
            </Card>
            <Card style={{ backgroundColor: "#E200A2" }}>
              <CardBody>
                <CardTitle style={{ color: "#D7B7FF", fontWeight: "bold" }}>
                  Enter Height and Choose Units:{" "}
                </CardTitle>
                <CardText>
                  <input
                    className="form-control"
                    type="input"
                    name="height"
                    placeholder="Height is..."
                    onChange={this.addheight}
                  />
                  <button
                    onClick={this.showMenuHeight}
                    style={{ backgroundColor: "#69C1FF" }}
                  >
                    Choose Unit of Height...
                  </button>
                  {this.state.showMenuHeight ? (
                    <div className="menu">
                      <button
                        onClick={this.addheightUnits}
                        value="ft"
                        style={{ backgroundColor: "#69C1FF", color: "white" }}
                      >
                        {" "}
                        feet{" "}
                      </button>
                      <button
                        onClick={this.addheightUnits}
                        value="in"
                        style={{ backgroundColor: "#69C1FF", color: "white" }}
                      >
                        {" "}
                        inches{" "}
                      </button>
                      <button
                        onClick={this.addheightUnits}
                        value="m"
                        style={{ backgroundColor: "#69C1FF", color: "white" }}
                      >
                        {" "}
                        meters{" "}
                      </button>
                      <button
                        onClick={this.addheightUnits}
                        value="cm"
                        style={{ backgroundColor: "#69C1FF", color: "white" }}
                      >
                        {" "}
                        centimeters{" "}
                      </button>
                    </div>
                  ) : null}
                </CardText>
              </CardBody>
            </Card>
            <Card style={{ backgroundColor: "#E200A2" }}>
              <CardBody>
                <CardTitle style={{ color: "#D7B7FF", fontWeight: "bold" }}>
                  {" "}
                  Enter Weight and it's Units:{" "}
                </CardTitle>
                <CardText>
                  <label htmlFor="Entry">
                    {" "}
                    <input
                      className="form-control"
                      type="input"
                      name="weight"
                      placeholder="Weight is..."
                      onChange={this.addweight}
                    />
                    <button
                      onClick={this.showMenuWeight}
                      style={{ backgroundColor: "#69C1FF" }}
                    >
                      Choose Unit of Weight...
                    </button>
                    {this.state.showMenuWeight ? (
                      <div className="menu">
                        <button
                          onClick={this.addweightUnits}
                          value="lb"
                          style={{ backgroundColor: "#69C1FF", color: "white" }}
                        >
                          {" "}
                          pounds{" "}
                        </button>
                        <button
                          onClick={this.addweightUnits}
                          value="kg"
                          style={{ backgroundColor: "#69C1FF", color: "white" }}
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
          <input type="submit" value="SUBMIT" />
        </form>
      </div>
    );
  }
}
