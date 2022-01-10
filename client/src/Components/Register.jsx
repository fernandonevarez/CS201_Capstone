import React, {useState, useEffect} from "react";

import axios from "axios";
import Input from "./Input";
import {FaApple, FaEnvelope, FaEye, FaFacebookF, FaGoogle, FaTimes} from "react-icons/fa";

import '../styles/components/Register.scss'

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWQwZWM3ODI5MmYzMjgwZDY2NzE1YTciLCJuYW1lIjp7ImZpcnN0TmFtZSI6IkZlcm5hbmRvIiwibWlkZGxlTmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJOZXZhcmV6In0sImlhdCI6MTY0MTU5MjQ3OCwiZXhwIjoxNjQ0MTg0NDc4fQ.ZztCiKHlAU5LSJZYK7EVPa9qwlgyMNrUwyJnZiA06Lw`;

const Register = ({close, change}) => {
  const [error, setError] = useState("")

  async function registerUser() {
    const response = await axios.post(
      "http://localhost:3000/api/v1/register",
      {
        // DATA GOES HERE
        name: {
          firstName: "",
          lastName: "",
        },
        username: "",
        email: "",
        password: "",
      },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // "Access-Control-Allow-Origin": "http://localhost:3001",
      }
    );
  }

  // FORM VALIDATION STILL NEEDS TO BE DONE. (IE. PASSWORD IS INNCORRECT OR NAME IS TOO LONG)
  // IF YOU NEED HELP WITH THIS CONTACT ETHAN
  const formSubmit = (e) => {
    e.preventDefault();
    const {target} = e;

    // setError("some error triggered when form validation is failed")
    // To chnage styles

    // Do whatever you need with the form data
  }

  // The valid provider names are "google", "facebook", or "apple"
  // Feel free to disassemble and reassemble however you'd like
  const provider = (name) => {
    // Do whatever you need to do with the providers
  }

  return (
    <div className="register-popup">
      <div className="darken"></div>
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
        <form onSubmit={formSubmit}>
          <div className="traditional">
            <div className="name">
              <Input name="fname" title="First Name" placeholder="John" />
              <Input name="lname" title="Last Name" placeholder="Doe" />
            </div>
            <Input name="email" placeholder="example@gmail.com" icon={<FaEnvelope />} />
            <Input name="password" type="password" icon={<FaEye />} />
            <Input name="confirm" type="password" icon={<FaEye />} />
          </div>

          <button type="submit">
            Submit
          </button>

          <div className="sep">
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
          </div>
        </form>
      </div>
    </div>
  )

  // return (
  //   // user Register form
  //   <div>
  //     <h1>Create an Acount</h1>
  //     <p>Registration is easy.</p>
  //     <form>
  //       <label>
  //         First Name:
  //         <input type="text" />
  //       </label>
  //       <label>
  //         Last Name:
  //         <input type="text" />
  //       </label>
  //       <label>
  //         Email:
  //         <input type="text" />
  //       </label>
  //       <label>
  //         Password:
  //         <input type="text" />
  //       </label>
  //       <label>
  //         Comfirm Password:
  //         <input type="text" />
  //       </label>
  //       <input
  //         onSubmit={(e) => {
  //           e.preventDefault();
  //           registerUser();
  //         }}
  //         type="submit"
  //         value="Submit"
  //       />
  //     </form>
  //   </div>
  // );
};

export default Register;
