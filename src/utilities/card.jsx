import React from "react";
import PropTypes from "prop-types";

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

/**
 * A traditional component that looks like a card and can host content.
 */
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

/**
 * Adds type definition to props
 */
CardComponent.propTypes = {
  children: PropTypes.element
};
