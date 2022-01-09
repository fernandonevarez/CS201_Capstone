import React, { useState, useEffect } from "react";

import axios from "axios";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWQwZWM3ODI5MmYzMjgwZDY2NzE1YTciLCJuYW1lIjp7ImZpcnN0TmFtZSI6IkZlcm5hbmRvIiwibWlkZGxlTmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJOZXZhcmV6In0sImlhdCI6MTY0MTU5MjQ3OCwiZXhwIjoxNjQ0MTg0NDc4fQ.ZztCiKHlAU5LSJZYK7EVPa9qwlgyMNrUwyJnZiA06Lw`;

const RegisterForm = () => {
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

  return (
    // user Register form
    <div>
      <h1>Create an Acount</h1>
      <p>Registration is easy.</p>
      <form>
        <label>
          First Name:
          <input type="text" />
        </label>
        <label>
          Last Name:
          <input type="text" />
        </label>
        <label>
          Email:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="text" />
        </label>
        <label>
          Comfirm Password:
          <input type="text" />
        </label>
        <input
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default RegisterForm;
