export const addItemToCart = (cartItems, cartItemsToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemsToAdd.id
  );
  if (existingCartItem) {
    //   ME RETURN JIKA IDNYA SAMA MAKA QUANTITI DITAMBAH
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemsToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //   MENAMBAHKAN ITEM DAN MENG-ATTACH QUANTITY
  return [...cartItems, { ...cartItemsToAdd, quantity: 1 }];
};
