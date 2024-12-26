import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slice/User";
import { productReducer } from "./Slice/product";
import { cartReducer } from "./Slice/Cart";


const Store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    carts: cartReducer,

  },
});

export default Store;
