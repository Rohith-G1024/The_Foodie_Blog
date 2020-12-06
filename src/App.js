import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';
import Welcome from "./comp/Welcome"
import Login from "./comp/Login"
import Page2 from './comp/Page2';
import FirstPage from './comp/Firstpage';
import Signup from './comp/signup';
import View from './comp/View';
import RecipePage from './comp/RecipePage';
import Profile from './comp/Profile';
import EditPage from './comp/EditPage';
import Category from './comp/Category';
import Results from './comp/Results';

function App() {
  return (
    <Router>
    <div className="App">
        <Route exact path="/" component={FirstPage}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/page1" component={Welcome}/>
        <Route exact path="/edit" component={EditPage}/>
        <Route exact path="/category" component={Category}/>
        <Route exact path="/results" component={Results}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/page2" component={Page2}/>
        <Route exact path="/view" component={View}/>
        <Route exact path="/read" component={RecipePage}/>
        <Route exact path="/signup" component={Signup}/>
    </div>
    </Router>
    );
}

export default App;