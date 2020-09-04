/*

=========================================================
* Now UI Kit React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2020 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";


import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages for this kit
import HomePage from "views/main/HomePage.js";
import DeliveryPage from "views/main/DeliveryPage.js";
import CartPage from "views/main/CartPage.js";
import _404Page from "views/main/_404Page.js";
import SearchPage from "views/main/SearchPage";
import LoginPage from "views/examples/LoginPage";
import ProfilePage from "views/examples/ProfilePage";
import CheckoutPage from "views/main/CheckoutPage";

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
