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

const Header = ({ nav, signOutStart, currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink className={`${nav === "shop" ? "active" : ""} `} to="/shop">
          SHOP
        </OptionLink>
        <OptionLink
          className={` ${nav === "contact" ? "active" : ""} `}
          to="/contact"
        >
          CONTACT
        </OptionLink>
        {currentUser ? (
          <OptionLink
            as="div"
            onClick={() => {
              signOutStart();
            }}
          >
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink
            className={` ${nav === "signin" ? "active" : ""} `}
            to="/signin"
          >
            SIGN IN
          </OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

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
