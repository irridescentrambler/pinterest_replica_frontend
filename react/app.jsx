import React from "react";
import ReactDOM from "react-dom";
import Header from "./shared/Header.jsx";
import Home from "./pages/home.jsx";
import SignIn from "./pages/signin.jsx";
import SignUp from "./pages/signup.jsx";
import Main from "./layout/main.jsx";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import Dashboard from "./pages/dashboard.jsx";
import Profile from "./pages/profile.jsx";
import UploadPin from "./pages/UploadPin.jsx";
import Board from "./pages/Board.jsx";
import Pin from "./pages/Pin.jsx";

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home}/>
      <Route path="signin" component={ SignIn }/>
      <Route path="signup" component={ SignUp }/>
      <Route path="dashboard" component={ Dashboard } />
      <Route path="profile" component={ Profile }/>
      <Route path="upload_pin" component={ UploadPin }/>
      <Route path="board/:id" component={ Board } />
      <Route path="pin/:id" component={ Pin } />
    </Route>
  </Router >,
  document.getElementById("app")
);