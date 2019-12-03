import React, { Component } from "react";

export class DataEntryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: "",
      sex: "",
      weight: "",
      wunits: "",
      height: "",
      hunits: "",
      errorsex: false,
      errorhunits: false,
      errorwunits: false
    };

    this.addweight = this.addweight.bind(this);
    this.addweightUnits = this.addweightUnits.bind(this);
    this.addheight = this.addheight.bind(this);
    this.addheightUnits = this.addheightUnits.bind(this);
    this.addage = this.addage.bind(this);
    this.setsex = this.setsex.bind(this);
    this.enterForm = this.enterForm.bind(this);
  }

  addweight(w) {
    this.setState({ ...this.state, ...{ weight: w.target.value } });
  }
  addweightUnits(unitw) {
    if (unitw.target.value !== "lb" && unitw.target.value !== "kg") {
      this.setState({ ...this.state, ...{ errorwunits: true } });
    } else {
      this.setState({ ...this.state, ...{ wunits: unitw.target.value } });
      this.setState({ ...this.state, ...{ errorwunits: false } });
    }
  }
  addheight(h) {
    this.setState({ ...this.state, ...{ height: h.target.value } });
  }
  addheightUnits(unith) {
    if (
      unith.target.value !== "cm" &&
      unith.target.value !== "m" &&
      unith.target.value !== "in" &&
      unith.target.value !== "ft"
    ) {
      this.setState({ ...this.state, ...{ errorhunits: true } });
    } else {
      this.setState({ ...this.state, ...{ hunits: unith.target.value } });
      this.setState({ ...this.state, ...{ errorhunits: false } });
    }
  }
  addage(a) {
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
  }
  enterForm() {
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
    if (confirmation === "Y" || confirmation === "y") {
      //Store data and proceed
    } else if (confirmation === "N" || confirmation === "n") {
      //Allow user to change information
    } else {
      alert("Please enter Y for Yes or N for No");
      this.enterForm();
    }
  }
  render() {
    return (
      <div className="Form">
        <form onSubmit={this.enterForm}>
          <label htmlFor="Entry">
            Enter Age:
            <input
              className="form-control"
              type="input"
              name="age"
              value={this.state.age}
              placeholder="Age is..."
              onChange={this.addage}
            />
          </label>
          <span key={0}>
            <br />
            <br />
          </span>
          <label htmlFor="Entry">
            Choose Sex:
            <input
              className="form-control"
              type="text"
              name="sex"
              placeholder="Male, Female, or Other..."
              onChange={this.setsex}
            />
            <React.Fragment>
              {this.state.errorsex ? <h1>Invalid entry for sex</h1> : null}
            </React.Fragment>
          </label>
          <span key={1}>
            <br />
            <br />
          </span>
          <label htmlFor="Entry">
            Enter Height and it&apos;s Units:
            <input
              className="form-control"
              type="input"
              name="height"
              placeholder="Height is..."
              onChange={this.addheight}
            />
            <input
              className="form-control"
              type="input"
              name="hunits"
              placeholder="in, ft, cm, or m"
              onChange={this.addheightUnits}
            />
            <React.Fragment>
              {this.state.errorhunits ? (
                <h1>Invalid entry for units of height</h1>
              ) : null}
            </React.Fragment>
          </label>
          <span key={2}>
            <br />
            <br />
          </span>
          <label htmlFor="Entry">
            {" "}
            Enter Weight and it&apos;s Units:
            <input
              className="form-control"
              type="input"
              name="weight"
              placeholder="Weight is..."
              onChange={this.addweight}
            />
            <input
              className="form-control"
              type="input"
              name="wunits"
              placeholder="lb or kg"
              onChange={this.addweightUnits}
            />
            <React.Fragment>
              {this.state.errorwunits ? (
                <h1>Invalid entry for units of weight</h1>
              ) : null}
            </React.Fragment>
          </label>
          <span key={3}>
            <br />
            <br />
          </span>
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
