import React from "react";

const style = {
  boxShadow: "5px 5px 10px grey",
  display: "inline-block",
  width: "-moz-fit-content",
  height: "-moz-fit-content",
  margin: "30px",
  padding: "25px",
  backgroundColor: "white",
  borderRadius: "7px"
};

export class CardComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="card" style={style}>
        {this.props.children}
      </div>
    );
  }
}
