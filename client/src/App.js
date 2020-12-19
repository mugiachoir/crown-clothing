import "./App.css";
import React, { useCallback, useEffect } from "react";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { setCurrentNav } from "./redux/nav/nav.actions";
import { checkUserSession } from "./redux/user/user.actions";

// CONNECT UNTUK MENGAMBIL STATE DARI REDUX STORAGE DAN MENGUBAHNYA JADI PROPS
import { connect } from "react-redux";

const App = ({ checkUserSession, currentUser, setCurrentNav }) => {
  const history = useHistory();
  const takeLocation = useCallback(() => {
    const currentLocation = window.location.href;
    const pageName = currentLocation.split("/");
    setCurrentNav(pageName[3]);
  }, [setCurrentNav]);

  useEffect(() => {
    takeLocation();
    checkUserSession();
    history.listen(() => {
      takeLocation();
    });
  }, [checkUserSession, history, setCurrentNav, takeLocation]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
};

// MENGAMBIL DATA DARI REDUX
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// MENGAMBIL METHOD SETCURRENTUSER
const mapDispatchToProps = (dispatch) => ({
  setCurrentNav: (location) => dispatch(setCurrentNav(location)),
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
