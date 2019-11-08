import React, { Component } from "react";

export class DataEntryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: "",
      sex: "",
      weight: "",
      //For all of our units, we have hypothetical arrays called WeightUnitsArray and HeightUnitsArray
      //These are 2-D arrays with the first column dedicated to the unit name, and the second part dedicated to its ratio in comparison to 1 kg or 1 m.
      //These Arrays should be initialized with the any common units (kg, lb, m, and ft).
      wunits: "",
      height: "",
      hunits: "",
      errorsex: false,
      errorhunits: false,
      errorwunits: false,
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
    /*
    this.setState({ ...this.state, ...{errorwunits : true}});
    for (i = 0; i < WeightUnitsArray.length; i++){
      if (unitw.target.value === WeightUnitsArray[i]){
        this.setState({ ...this.state, ...{errorwunits : false}});
        this.setState({ ...this.state, ...{ wunits: unitw.target.value } });
      }
    }
    */
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
    /*
    this.setState({ ...this.state, ...{errorhunits : true}});
    for (i = 0; i < WeightUnitsArray.length; i++){
      if (unith.target.value === HeightUnitsArray[i]){
        this.setState({ ...this.state, ...{errorhunits : false}});
        this.setState({ ...this.state, ...{ hunits: unith.target.value } });
      }
    }
    */
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
    if (this.state.errorhunits) {
      {
        let newunith = prompt(
          "We do not recognize this unit. What is it's ratio to 1 ?"
        );
        if (isNaN(newunith)){
          this.enterForm();
        }else{
        //HeightUnitsArray.push([hunits, newunith])
        this.setState({errorhunits : false});
        }
      }
    }

    if (this.state.errorwunits) {
      {
        let newunitw = prompt(
          "We do not recognize this unit. What is it's ratio to 1 kilogram? (i.e. 1 kg = 2.205 lb so you would enter 2.205)"
        );
        if (isNaN(newunitw)){
          this.enterForm();
        }else{
        //WeightUnitsArray.push([wunits, newunitw])
        this.setState({errorwunits : false});
        }
        }
      }
    }

    {
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
                <h1>We do not recognize this unit, and will ask you about it.</h1>
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
                <h1>We do not recognize this unit, and will ask you about it.</h1>
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
