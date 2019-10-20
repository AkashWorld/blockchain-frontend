import React, { Component } from 'react';


class Practice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      age: 0,
      sex: "male",
      weight: 0,
      height: 0
    };
  }

  addweight(w){
    const { val } =w.target;

    this.setState({weight: val});

    alert("Weight set to" + this.state.weight);
  }
  addheight(h){
    const { val } =h.target;

    this.setState({height: val});

    alert("Height set to" + this.state.height)
  }
  addage(a){
    const { val } =a.target;

    this.setState({age: val});
    alert("Age set to" + this.state.age);
  }
  setsex(gen){
    this.setState({sex: gen});
    alert("Sex set to" + this.state.age)
  }
  what(){
    alert("What do I do with the submit button?")
  }

  render() {
    return (
      <div className="Practice">
        <form>

          <label htmlFor="Entry">Enter Age 
          </label>

          <input
            className="form-control"
            type="input"
            name="age"
            placeholder="Age is..." 
            onInput={this.addage(value)}/>
                      
          <label htmlFor="Entry">Choose Sex</label>

          <ButtonGroup toggle className="mt-3" size="sm">
            <ToggleButton type="Female" name="Female" onClick={this.setsex("female")} defaultChecked value="1" active>
              Female
            </ToggleButton>
            <ToggleButton type="Male" name="Male" onClick={this.setsex("male")} value="2" active>
              Male
            </ToggleButton>
            <ToggleButton type="Other" name="Other" onClick={this.setsex("other")}value="3" active>
              Other
            </ToggleButton>
          </ButtonGroup>

          <label htmlFor="Entry">Enter Height</label>

          <input
            className="form-control"
            type="input"
            name="height"
            placeholder="Height is..." 
            onInput={this.addheight(value)}/>

          <label htmlFor="Entry">Enter Weight</label>

            <input
            className="form-control"
            type="input"
            name="weight"
            placeholder="Weight is..."
            onInput={this.addweight(value)}/>            

            <button type="Submit" className='btn btn-success' size="lg" block onClick={this.what}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Practice;
