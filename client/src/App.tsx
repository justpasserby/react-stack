import * as React from "react";
import Logo from "./assets/logo.png";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <img src={Logo} />
        <p className="App-intro">save to</p>
      </div>
    );
  }
}

export default App;
