import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCarts,
  removeFromCart,
  updateQuantity,
} from "../redux/Slice/Cart";

const Cart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarts());
  }, []);
  const { carts, isLoading } = useSelector((store) => store.carts);

  const handleDelete = async (id) => {
    try {
      await dispatch(removeFromCart(id)).unwrap();
      alert("Cart deleted");
    } catch (error) {
      alert(error.message);
    }
  };
  const handleUpdateQty = async (opr, id, qty) => {
    try {
      if (opr == "+") {
        let data = {
          id,
          qty: qty + 1,
        };
        await dispatch(updateQuantity(data)).unwrap();
      } else {
        let data = {
          id,
          qty: qty - 1,
        };
        await dispatch(updateQuantity(data)).unwrap();
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div>
      {carts.length > 0 && (
        <table className="table table-dark table-hover w-50 table-striped">
          <thead>
            <tr>
              <th>img</th>
              <th>title</th>
              <th>price</th>
              <th>qty</th>

              <th>total price</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {carts.map(({ title, price, qty, id, img }) => (
              <tr>
                <td>
                  <img
                    src={img}
                    alt=""
                    className="img-fluid"
                    style={{ height: "50px", width: "50px" }}
                  />
                </td>
                <td>{title}</td>
                <td>{price}</td>
                <td>
                  <button
                    className="btn btn-light"
                    onClick={() => handleUpdateQty("-", id, qty)}
                    disabled={qty == 1 ? true : false}
                  >
                    -
                  </button>
                  <button className="btn text-light">{qty}</button>
                  <button
                    className="btn btn-light"
                    onClick={() => handleUpdateQty("+", id, qty)}
                  >
                    +
                  </button>
                </td>
                <td>{price * qty}</td>
                <td>
                  <div
                    className="btn btn-danger"
                    onClick={() => handleDelete(id)}
                  >
                    delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cart;
