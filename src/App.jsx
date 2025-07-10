import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import OrderForm from "./pages/OrderForm";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/order" component={OrderForm} />
        <Route path="/success" component={OrderSuccess} />
      </Switch>
    </Router>
  );
}

export default App;
