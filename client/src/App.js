import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// Redux
import { Provider } from 'react-redux'; // Connects react to redux
import store from './store';
import { createStore, applyMiddleware } from "redux";

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
