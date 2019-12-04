import React from "react";

export const EtherAddrContext = React.createContext({
  context: "",
  setEtherContext: () => {}
});

export class ContextProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      context: "initial"
    };
  }

  render() {
    return (
      <EtherAddrContext.Provider
        value={{
          context: this.state.context,
          setEtherContext: signedMessage => {
            this.setState({ context: signedMessage });
          }
        }}
      >
        {this.props.children}
      </EtherAddrContext.Provider>
    );
  }
}
