import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log("Hello");
  };

  return (
    <div>
      <div class="register">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <h1 class="display-4 text-center">Login</h1>
              <p class="lead text-center">Sign into your account</p>
              <form onSubmit={e => onSubmit(e)}>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                    required
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                  />
                </div>
                <input type="submit" class="btn btn-info btn-block mt-4" />
                <p className="my-1">
                  Don't have an account? <Link to="/register">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
