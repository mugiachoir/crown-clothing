import React from "react";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrentNav } from "../../redux/nav/nav.selectors";
import { setCurrentNav } from "../../redux/nav/nav.actions";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.style";
import { signOutStart } from "../../redux/user/user.actions";

class Header extends React.Component {
  activeNav = () => {
    setTimeout(() => {
      const currentLocation = window.location.href;
      const pageName = currentLocation.split("/");
      this.props.setCurrentNav(pageName[3]);
    }, 100);
  };

  componentWillUnmount() {
    this.props.setCurrentNav(null);
  }

  render() {
    const { signOutStart } = this.props;

    return (
      <HeaderContainer>
        <LogoContainer onClick={this.activeNav} to="/">
          <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
          <OptionLink
            onClick={this.activeNav}
            className={`${this.props.nav === "shop" ? "active" : ""} `}
            to="/shop"
          >
            SHOP
          </OptionLink>
          <OptionLink
            onClick={this.activeNav}
            className={` ${this.props.nav === "contact" ? "active" : ""} `}
            to="/contact"
          >
            CONTACT
          </OptionLink>
          {this.props.currentUser ? (
            <OptionLink
              as="div"
              onClick={() => {
                signOutStart();
                this.activeNav();
              }}
            >
              SIGN OUT
            </OptionLink>
          ) : (
            <OptionLink
              onClick={this.activeNav}
              className={` ${this.props.nav === "signin" ? "active" : ""} `}
              to="/signin"
            >
              SIGN IN
            </OptionLink>
          )}
          <CartIcon />
        </OptionsContainer>
        {this.props.hidden ? null : <CartDropdown />}
      </HeaderContainer>
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
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
