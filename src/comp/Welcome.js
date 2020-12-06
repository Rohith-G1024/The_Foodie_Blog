import Axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Appbar from "./materials/Appbar";
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userid: "",
      recipes:"",
    };
    this.logout=this.logout.bind(this)
    this.back=this.back.bind(this)
    this.profile=this.profile.bind(this)
  }

  componentDidMount() {
    const { handle } = this.props.match.params;
    const { id } = this.props.location.state;
    console.log(handle);
    Axios.get(`http://localhost:5000/mydb/${id}`)
    .then((res) => {
      console.log(res);
      this.setState({
        name: res.data.name,
        userid: res.data._id,
        recipes: res.data.recipes
      });
    });
  }

  logout() {
    if(!window.confirm("Are you sure to logout?"))return;
    this.props.history.goBack()
  }
  
  back() {
    if(!window.confirm("Are you sure to logout?"))return;
    this.props.history.goBack()
  }

  profile() {
    this.props.history.push({pathname:'/profile', state:{check:true,userid:this.state.userid}})
  }

  render() {
    return (
      <div>
        <Appbar logout={this.logout} back={this.back} profile={this.profile}/>
      <div className="welcome">
        
        <h1>Welcome {this.state.name}!</h1>
        <br /><br/><br/>

        <div className="linkb">
          <Link className="links" to={{ pathname: "/page2", state: { id: this.state.userid } }}>
            Add a recipe
          </Link>
        </div>
        <br/><br/><br/>
        <div className="linkb">
        <Link className="links" to={{ pathname: "/view", state: { id:this.state.userid } }}>
            My recipes
          </Link>
        </div>
          <br/><br/><br/>
        <div className="linkb">
        <Link className="links" to={{ pathname: "/category", state: { userid:this.state.userid } }}>
            Search by Category
          </Link>
        </div>
      </div>
      </div>
    );
  }
}
export default Welcome;
