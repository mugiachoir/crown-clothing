import "./App.css";
import React from "react";
import { HomePage } from "./pages/homepage/homepage.component.jsx";
import { Route, Switch } from "react-router-dom";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop/hats" component={HatsPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
