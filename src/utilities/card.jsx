import React from "react";
import PropTypes from "prop-types";

const styles = {
  card: {
    boxShadow: "2px 2px 6px grey",
    display: "inline-block",
    width: "-moz-fit-content",
    height: "-moz-fit-content",
    margin: "15px",
    padding: "20px",
    backgroundImage: "linear-gradient(to top, white 0%, white 100%)",
    backgroundBlendMode: "screen",
    borderRadius: "7px"
  },
  titleContainer: {
    display: "flex",
    marginTop: "-25px",
    justifyContent: "space-between"
  },
  title: {
    fontSize: "1em",
    color: "#495057",
    fontWeight: "600",
    fontFamily:
      "Nunito Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif"
  },
  menuBar: {
    width: "15px",
    height: "2px",
    backgroundColor: "#495057",
    margin: "4px 0"
  },
  menu: {
    marginTop: "10px"
  }
};

/**
 * A component that looks like a card and can host content.
 * Accepts title, style, and children props.
 */
export class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    /**
     * If the card color is something else like red, auto switch the text color to white
     */
    if (props.style && props.style.color) {
      styles.title.color = "white";
      styles.menuBar.backgroundColor = "white";
    }
  }
  render() {
    return (
      <div className="card" style={{ ...styles.card, ...this.props.style }}>
        <div style={styles.titleContainer}>
          <h1 style={styles.title}>{this.props.title}</h1>
          <div style={styles.menu}>
            <div style={styles.menuBar}></div>
            <div style={styles.menuBar}></div>
            <div style={styles.menuBar}></div>
          </div>
        </div>
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
