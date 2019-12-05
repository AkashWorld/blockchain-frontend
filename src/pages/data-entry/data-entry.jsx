import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardDeck,
  CardBody,
} from "reactstrap";

export class DataEntryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: 0,
      weight: 0,
      wunits: "lb",
      height: 0,
      hunits: "in",
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
    if (
      gen.target.value !== "Male" &&
      gen.target.value !== "male" &&
      gen.target.value !== "Female" &&
      gen.target.value !== "female" &&
      gen.target.value !== "Other" &&
      gen.target.value !== "other"
    ) {
      this.setState({ ...this.state, ...{ errorsex: true } });
    } else {
      this.setState({ ...this.state, ...{ sex: gen.target.value } });
      this.setState({ ...this.state, ...{ errorsex: false } });
    }
    this.setState({ ...this.state, ...{ sex: gen.target.value } });
  }
  enterForm() {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(
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
      )) {
        //Store data and proceed
      } else{
        //Allow user to change information
      }
    }
  render() {
    return (
      <div className="Form" style={{ backgroundColor: "#FBB9FD" }} class="d">
        <form onSubmit={this.enterForm}>
          <header class="c"><center><font size="17">Please Enter Your Health Data</font></center></header>
          <span>
            <br />
          </span>
          <center>
          <CardDeck>
            <Card style={{ backgroundColor: "#E200A2" }}>
              <CardBody>
                <CardTitle style={{ color: "#D7B7FF", fontWeight: "bold"}}>
                  <font size="5">Enter Age:{" "}</font>
                </CardTitle>
                <CardText>
                  <label htmlFor="Entry">
                    <input
                      className="form-control"
                      type="input"
                      name="age"
                      size="11"
                      placeholder="Age is..."
                      onChange={this.addage}
                    />
                  </label>
                </CardText>
              </CardBody>
            </Card>
            <span>
              <br />
            </span>
            <Card style={{ backgroundColor: "#E200A2" }}>
              <CardBody>
                <CardTitle style={{ color: "#D7B7FF", fontWeight: "bold" }}>
                  <font size="5">Click to Pick Sex:{" "}</font>
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
            <span>
              <br />
            </span>
            <Card style={{ backgroundColor: "#E200A2" }}>
              <CardBody>
                <CardTitle style={{ color: "#D7B7FF", fontWeight: "bold" }}>
                  <font size="5">Enter Height and It's Units:{" "}</font>
                </CardTitle>
                <CardText>
                  <input
                    className="form-control"
                    type="input"
                    name="height"
                    size="10"
                    placeholder="Height is..."
                    onChange={this.addheight}
                  />
                  <button
                    onClick={this.showMenuHeight}
                    style={{ backgroundColor: "#69C1FF" }}
                  >
                    Choose Unit...
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
            <span>
              <br />
            </span>
            <Card style={{ backgroundColor: "#E200A2" }}>
              <CardBody>
                <CardTitle style={{ color: "#D7B7FF", fontWeight: "bold" }}>
                 <font size="5">Enter Weight and It's Units:{" "}</font>
                  
                </CardTitle>
                <CardText>
                  <label htmlFor="Entry">
                    {" "}
                    <input
                      className="form-control"
                      type="input"
                      size="10"
                      name="weight"
                      placeholder="Weight is..."
                      onChange={this.addweight}
                    />
                    <button
                      onClick={this.showMenuWeight}
                      style={{ backgroundColor: "#69C1FF" }}
                    >
                      Choose Unit...
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
          </center>
          <center>
            <input type="submit" value="SUBMIT" />
          </center>
        </form>
      </div>
      );
  }
}
