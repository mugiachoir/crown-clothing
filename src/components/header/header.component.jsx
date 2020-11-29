import React from "react";
import "./header.style.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrentNav } from "../../redux/nav/nav.selectors";
import { setCurrentNav } from "../../redux/nav/nav.actions";

class Header extends React.Component {
  activeNav = () => {
    setTimeout(() => {
      const currentLocation = window.location.href;
      const pageName = currentLocation.split("/");
      this.props.setCurrentNav(pageName[3]);
    }, 100);
  };

  render() {
    return (
      <div className="header">
        <Link onClick={this.activeNav} to="/" className="logo-container">
          <Logo className="logo" />
        </Link>
        <div className="options">
          <Link
            onClick={this.activeNav}
            className={`option ${this.props.nav === "shop" ? "active" : ""} `}
            to="/shop"
          >
            SHOP
          </Link>
          <Link
            onClick={this.activeNav}
            className={`option ${
              this.props.nav === "contact" ? "active" : ""
            } `}
            to="/contact"
          >
            CONTACT
          </Link>
          {this.props.currentUser ? (
            <div className="option" onClick={() => auth.signOut()}>
              SIGN OUT
            </div>
          ) : (
            <Link
              onClick={this.activeNav}
              className={`option ${
                this.props.nav === "signin" ? "active" : ""
              } `}
              to="/signin"
            >
              SIGN IN
            </Link>
          )}
          <CartIcon />
        </div>
        {this.props.hidden ? null : <CartDropdown />}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
  nav: selectCurrentNav,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentNav: (location) => dispatch(setCurrentNav(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
