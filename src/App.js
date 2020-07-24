import React from "react";
import MainPage from "./MainPage";
import ResponsiveCard from "./responsiveCards";
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
        <ResponsiveCard />
        {/* <MainPage /> */}
      </div>
    );
  }
}
export default App;
