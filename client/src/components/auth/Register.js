import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match!");
    } else {
      console.log("Success");
    }
  };

  return (
    <div>
      <div class="register">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <h1 class="display-4 text-center">Sign Up</h1>
              <p class="lead text-center">Create your DevConnector account</p>
              <form onSubmit={e => onSubmit(e)}>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Name"
                    value={name}
                    onChange={e => onChange(e)}
                    name="name"
                    required
                  />
                </div>
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
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={e => onChange(e)}
                  />
                </div>
                <input type="submit" class="btn btn-info btn-block mt-4" />
                <p className="my-1">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
