import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/Slice/User";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  let [userDetails, setUserDetails] = useState({
    username: "",
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
      let res = await dispatch(createUser(userDetails)).unwrap();

      toast.success("🦄 user created !", {
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
      // setTimeout
      navigate("/");
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
        type="text"
        name="username"
        value={userDetails.username}
        onChange={updateInput}
      />
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
      <input type="submit" />
      <ToastContainer />
    </form>
  );
};

export default Signup;
