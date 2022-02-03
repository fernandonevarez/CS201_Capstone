import React, { useState, useEffect } from "react";

const LoginForm = () => {
  return (
    // login form
    <div>
      <h1>Login Form</h1>
      <form>
        <label>
          Email:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LoginForm;
