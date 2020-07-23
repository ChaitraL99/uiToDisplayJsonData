import React from "react";
import MainPage from "./MainPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  render() {
    return (
      <div className="App">
        <MainPage />
      </div>
    );
  }
}
export default App;
