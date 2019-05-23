import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/authActions";
import PropTypes from 'prop-types'


const Register = ({ setAlert, register }) => {
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
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
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

// Setting the property types 
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
}

// Connect takes in the state that you want to map and a object with actions you want to use
export default connect(null, { setAlert, register } )(Register);
