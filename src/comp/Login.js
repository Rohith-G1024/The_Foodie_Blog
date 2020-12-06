import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      islogged: false,
      userid: "",
    };
    this.validate=this.validate.bind(this)
    this.chname=this.chname.bind(this)
    this.chpass=this.chpass.bind(this)
  }

  validate(event) {
    event.preventDefault();
    var x = document.forms["Login"]["Name"].value;
    var y = document.forms["Login"]["Pass"].value;

    axios
      .get(`http://localhost:5000/mydb/find?name=${x}&password=${y}`)
      .then(res => {
        this.setState({
          name: res.data.name,
          password: res.data.password,
          islogged: true,
          userid: res.data._id,
        });
        
        this.props.history.push({
          pathname: "/page1",
          state: { id: this.state.userid },
        });
      })
      .catch((err) => {
        alert("Invalid Credentials");
        this.setState({name:"", password:""});
        console.log(err);
      });
  }

  chname(e){
    this.setState({name:e.target.value})
  }

  chpass(e){
    this.setState({password:e.target.value})
  }
  render() {
    return (
      <div className="login">
        <h1 className="foodie">Foodie</h1>
        <h1 className="loginh1">Log in</h1>
        <form
          className="forms"
          name="Login"
          action="./page2"
          onSubmit={this.validate}
          method="POST"
        >
          <input
            type="text"
            name="Name"
            text-size="50"
            placeholder="Username"
            value={this.state.name}
            onChange={this.chname}
            autoComplete="off"
          />
          <br />
          <br />
          <input
            type="password"
            name="Pass"
            text-size="50px"
            value={this.state.password}
            onChange={this.chpass}
            placeholder="Password"
          />
          <br />
          <br />
          <button>Submit</button>
          <br />
          <br />
          <div className="linkb">
            <Link className="links" to={"/signup"}>
              Sign Up
            </Link>
          </div>
          <br />
          <br />
          <br />
          <div className="linkb">
            <Link className="links" to={"/"}>
              Back
            </Link>
          </div>
        </form>
      </div>
    );

  }
}

export default Login;
