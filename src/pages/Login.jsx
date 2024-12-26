import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { loginUser } from "../redux/Slice/User";

const Login = () => {
  let [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  let updateInput = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await dispatch(loginUser(userDetails)).unwrap();

      toast.success("🦄 user logged in !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast.error(error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        value={userDetails.email}
        onChange={updateInput}
      />
      <input
        type="text"
        name="password"
        value={userDetails.password}
        onChange={updateInput}
      />
      <input type="submit" value="Login" />
      <ToastContainer />
    </form>
  );
};

export default Login;
