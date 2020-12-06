import React from "react";
import { Link } from "react-router-dom";

class FirstPage extends React.Component {
  render() {
    return (
      <div className="firstpage">
        <h1 className="foodie">Foodie</h1>
        <div className="linkb">
          <Link className="links" to={"/login"}>
            Login
          </Link>
        </div>
      </div>
    );
  }
}
export default FirstPage;
