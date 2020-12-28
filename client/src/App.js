import "./App.css";
import React, { useCallback, useEffect, lazy, Suspense } from "react";
import Header from "./components/header/header.component";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { setCurrentNav } from "./redux/nav/nav.actions";
import { checkUserSession } from "./redux/user/user.actions";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

// CONNECT UNTUK MENGAMBIL STATE DARI REDUX STORAGE DAN MENGUBAHNYA JADI PROPS
import { connect } from "react-redux";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);

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
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
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
          </Suspense>
        </ErrorBoundary>
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
