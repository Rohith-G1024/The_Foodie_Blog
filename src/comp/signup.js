import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeBio = this.onChangeBio.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePass2 = this.onChangePass2.bind(this);
    this.validate = this.validate.bind(this);

    this.state = {
      name: "",
      ph: "",
      email: "",
      bio: "",
      password: "",
      pass2:""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeBio(e) {
    this.setState({
      bio: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangePass2(e) {
    this.setState({
      pass2: e.target.value,
    });
  }

  validate(event) {
    event.preventDefault();
    var name = document.forms["Signup"]["Name"].value;
    var ph = document.forms["Signup"]["Phone"].value;
    var email = document.forms["Signup"]["Email"].value;
    var pass1 = document.forms["Signup"]["Pass1"].value;
    var pass2 = document.forms["Signup"]["Pass2"].value;
    var bio = document.forms["Signup"]["Bio"].value;
    if (!(name.length >= 3)) {
      alert("Username must be atleast 3 chars long.");
      document.forms["Signup"]["Name"].focus();
      return false;
    } else if (!(ph.length === 10)) {
      alert("Enter valid Phone Number");
      document.forms["Signup"]["Phone"].focus();
      return false;
    } else if (email.indexOf("@") === -1 || !email.includes(".com")) {
      alert("Enter valid Email");
      document.forms["Signup"]["Email"].focus();
      return false;
    } else if (pass1 !== pass2) {
      alert("Passwords dont match.");
      document.forms["Signup"]["Pass1"].focus();
      this.setState({
        password:"",
        pass2:""
      })
      return false;
    } else if (pass1 === "") {
      alert("Password can't be blank.");
      document.forms["Signup"]["Pass1"].focus();
      return false;
    } else {
      alert("Successfully Registered!")
      if(bio==="")
      {
        this.setState({bio:"Hey there! I'm using Foodie."})
      }
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        bio: this.state.bio,
        password: this.state.password,
      };

      axios.post("http://localhost:5000/mydb/add", newUser)
        .then((res) => {
          console.log(res.statusText)
          this.setState({
            name: "",
            phone: "",
            bio: "",
            email: "",
            password: "",
            pass2:""
          });
          this.props.history.go(-1)
        });

    
    }
  }

  render() {
    return (
      <div className="signup">
        <h1>Fill in the details</h1>
        <form
          className="forms"
          name="Signup"
          onSubmit={this.validate}
          method="POST"
        >
          <input
            type="text"
            name="Name"
            text-size="50"
            onChange={this.onChangeName}
            value={this.state.name}
            placeholder="Name"
            autoComplete="off"
          />
          <br />
          <br />
          <input
            type="tel"
            name="Phone"
            text-size="50px"
            onChange={this.onChangePhone}
            value={this.state.phone}
            placeholder="Phone"
            autoComplete="off"
          />
          <br />
          <br />
          <input
            type="email"
            name="Email"
            text-size="50px"
            onChange={this.onChangeEmail}
            value={this.state.email}
            placeholder="Email"
            autoComplete="off"
          />
          <br />
          <br />
          <input
            type="password"
            name="Pass1"
            text-size="50px"
            onChange={this.onChangePassword}
            value={this.state.password}
            placeholder="Password"
          />
          <br />
          <br />
          <input
            type="password"
            name="Pass2"
            text-size="50px"
            onChange={this.onChangePass2}
            value={this.state.pass2}
            placeholder="Re-enter Password"
          />
          <br />
          <br />
          <input
            type="text"
            name="Bio"
            text-size="50px"
            placeholder="Bio(optional)"
            onChange={this.onChangeBio}
            value={this.state.bio}
          />
          <br />
          <br />
          {/* <input type="submit" value="Submit">  --> */}
          <button>Submit</button>
          <br />
          <br />
          <div className="imag"></div>

          <div className="linkb">
            <Link className="links" to={"/login"}>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
