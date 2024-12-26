import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCarts, updateQuantity } from "../redux/Slice/Cart";

const ProductCard = ({ id, title, price, img }) => {
  const dispatch = useDispatch();

  const { carts, isLoading } = useSelector((store) => store.carts);

  const handletoCart = async () => {
    let data = {
      title: title,
      price: price,
      img: img,
      qty: 1,
      productId: id,
    };

    let isExits = carts.filter((item) => item.productId == id);
    if (isExits.length == 0) {
      await dispatch(addToCart(data));
      alert("added to cart");
    } else {
      console.log("isExits", isExits);
      alert("alredy added to cart");
      let pro = isExits[0];

      let updateCart = {
        ...pro,
        qty: pro.qty + 1,
      };
      dispatch(updateQuantity(updateCart));
    }
  };
  return (
    <div>
      <img
        src={img}
        alt=""
        width="300px"
        height="300px"
        style={{
          objectFit: "cover",
        }}
      />
      <h6>{title}</h6>
      <p>{price}</p>
      <button onClick={handletoCart}>Buy</button>
    </div>
  );
};

export default ProductCard;
