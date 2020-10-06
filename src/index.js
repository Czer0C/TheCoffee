import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "evolution/assets/css/core.min.css"
import "evolution/assets/css/custom.css"
import "evolution/assets/css/customize.css"
import "evolution/assets/css/main.min.css"
import "evolution/assets/css/popup.min.css"

// pages for this kit
import HomePage from "evolution/views/HomePage.js";
import DeliveryPage from "evolution/views/DeliveryPage.js";
import CartPage from "evolution/views/CartPage.js";
import _404Page from "evolution/views/_404Page.js";
import SearchPage from "evolution/views/SearchPage";
import CheckoutPage from "evolution/views/CheckoutPage";

ReactDOM.render(  
  <BrowserRouter>
    <Switch>
        <Switch>
            <Route
              exact path="/"
              render={(props) => <HomePage {...props} />}
            />
            <Route
              path="/cart"
              render={(props) => <CartPage {...props} />}
            />
            <Route
              path="/delivery"
              render={(props) => <DeliveryPage {...props} />}
            />
            <Route
              path="/search/:search"
              render={(props) => <SearchPage {...props} />}
            />
            <Route
              path="/checkout"
              render={(props) => <CheckoutPage {...props} />}
            />
            <Route
              path="/:wrong"
              render={(props) => <_404Page {...props} />}
            />
        </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
