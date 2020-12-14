import "./App.css";
import React from "react";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { Route, Switch, Redirect } from "react-router-dom";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { setCurrentNav } from "./redux/nav/nav.actions";
import { checkUserSession } from "./redux/user/user.actions";

// CONNECT UNTUK MENGAMBIL STATE DARI REDUX STORAGE DAN MENGUBAHNYA JADI PROPS
import { connect } from "react-redux";

class App extends React.Component {
  unsubscribeFromAuth = null;
  unsubscribeFromSnapShot = null;

  componentDidMount() {
    this.props.setCurrentNav(null);
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    // TUTUP LISTEN PERUBAHAN AUTH AGAR TIDAK ADA MEMORY LEAK
    this.unsubscribeFromAuth();
    this.unsubscribeFromSnapShot();
  }

  render() {
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
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

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
