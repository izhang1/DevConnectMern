import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import "./App.css";

import PrivateRoute from './components/commons/PrivateRoute';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from './components/dashboard/dashboard';
// Redux
import { Provider } from 'react-redux'; // Connects react to redux
import store from './store';

// Check for token
if(localStorage.jwtToken) {
  // Set the auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and exp 
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated 
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    // Reidrect to login 
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </section>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
