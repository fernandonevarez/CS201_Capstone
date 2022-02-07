import React, { useState, useEffect } from "react";

// require("dotenv").config();

import { useUser } from "../../contexts/useUser";

import axios from "axios";
import Input from "../Input";
import {
  FaApple,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
  FaGoogle,
  FaTimes,
} from "react-icons/fa";

import "../../styles/components/auth/Register.scss";
// import { useUser } from "../contexts/useUser";

// const token = localStorage.getItem("userToken");

const Register = ({ close, change }) => {
  const [error, setError] = useState("");

  // const [newPassword, setNewPassword] = useState("");
  const [userNewPassword, setUserNewPassword] = useState("");

  const { user, dispatch } = useUser();

  const registerUser = async (
    email,
    password,
    passwordConfirm,
    firstname,
    lastname
  ) => {
    if (password == passwordConfirm) {
      console.log("passwords match");
      // setUserNewPassword(passwordConfirm);

      close();

      // console.log("email", email, "password", password, "passwordConfirm", passwordConfirm, "firstName", firstName, "lastName", lastName);

      // $29Q.aVloO2Z4A/l7zrpRnG

      // try {
      const response = await axios
        .post(
          "http://localhost:3000/api/v1/auth/register",

          {
            // things the user submitted
            name: {
              firstName: firstname,
              // middleName: "",
              lastName: lastname,
            },
            email: email,
            password: passwordConfirm,
            // things we added to the user's account
            cart: [],
            favorites: [],
            profile_picture: "",
            hasStore: false,
          },
          {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3001",
          }
        )
        .catch((err) => {
          console.log(err);
        });

      console.log(response.data);

      dispatch({ type: "login", payload: response.data });

      // console.log(user);
      // } catch (error) {
      //   console.log(error);
      // }

      // const response = await axios.post(
      //   `https://dev-3osqrzua.us.auth0.com/dbconnections/signup`,
      //   {
      //     "Content-Type": "application/json",
      //   },
      //   {
      //     client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      //     email: email,
      //     password: newPassword,
      //     connection: process.env.REACT_APP_AUTH0_CONNECTION,
      //     name: `${firstName} ${lastName}`,
      //   }
      // );
    } else {
      console.log("passwords do not match");
    }
  };

  // FORM VALIDATION STILL NEEDS TO BE DONE. (IE. PASSWORD IS INNCORRECT OR NAME IS TOO LONG)
  // IF YOU NEED HELP WITH THIS CONTACT ETHAN
  const formSubmit = (e) => {
    e.preventDefault();
    const { target } = e;
    // registerUser()

    const email = target.email.value;
    const password = target.password.value;
    const passwordConfirm = target.confirm.value;
    // const username = target.username.value;

    const firstname = target.fname.value;
    const lastname = target.lname.value;

    // console.log("email", email);
    // console.log("password", password);
    // console.log("passwordConfirm", passwordConfirm);
    // console.log("firstName", firstname);
    // console.log("lastName", lastname);

    // console.log(email, password, passwordConfirm, firstname, lastname);

    if (
      email === "" ||
      password === "" ||
      passwordConfirm === "" ||
      firstname === "" ||
      lastname === ""
    ) {
      setError("Please fill out all fields");
    } else {
      registerUser(email, password, passwordConfirm, firstname, lastname);
      // console.log(email, password, passwordConfirm, firstname, lastname);
    }

    // setError("some error triggered when form validation is failed")
    // To chnage styles

    // Do whatever you need with the form data
  };

  // The valid provider names are "google", "facebook", or "apple"
  // Feel free to disassemble and reassemble however you'd like
  const provider = (name) => {
    // Do whatever you need to do with the providers
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="register-popup">
      <div className="darken" onClick={close}></div>
      <div className="content">
        <div className="title">
          <h2>Register</h2>
          <div className="switch" onClick={change}>
            Sign In
          </div>
          <div className="cancel-icon" onClick={close}>
            <FaTimes />
          </div>
        </div>
        <form onSubmit={(e) => formSubmit(e)}>
          <div className="traditional">
            <div className="name">
              <Input name="fname" title="First Name" placeholder="John" />
              <Input name="lname" title="Last Name" placeholder="Doe" />
            </div>
            <Input
              name="email"
              placeholder="example@gmail.com"
              icon={<FaEnvelope />}
            />
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              icon={
                showPassword ? (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                )
              }
            />
            <Input
              name="confirm"
              type={showPassword ? "text" : "password"}
              icon={
                showPassword ? (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                )
              }
            />
          </div>

          <button type="submit" onSubmit={(e) => formSubmit(e)}>
            Create an Account
          </button>

          {/* <div className="sep">
            <div className="dash"></div>
            <span>or</span>
            <div className="dash"></div>
          </div>

          <div className="with">
            <div className="google" onClick={() => provider("google")}>
              <FaGoogle />
              <span>Contuine with Google</span>
            </div>
            <div className="facebook" onClick={() => provider("facebook")}>
              <FaFacebookF />
              <span>Contuine with Facebook</span>
            </div>
            <div className="apple" onClick={() => provider("apple")}>
              <FaApple />
              <span>Contuine with Apple</span>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
