import React from "react";
import "./cart-icon.style.scss";
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

// const CartIcon = ({ toggleCartHidden, cartItems }) => {
//   let itemCount = 0;
//   itemCount = cartItems.map((cartItem) => itemCount + cartItem.quantity);
//   return (
//     <div className="cart-icon">
//       <ShoppingIcon className="shopping-icon" onClick={toggleCartHidden} />
//       <span className="item-count">{itemCount}</span>
//     </div>
//   );
// };

const CartIcon = ({ toggleCartHidden }) => (
  <div className="cart-icon">
    <ShoppingIcon className="shopping-icon" onClick={toggleCartHidden} />
    <span className="item-count">0</span>
  </div>
);

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems: cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
