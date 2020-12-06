import React from "react";
import { Link } from "react-router-dom";
import Appbar from "./materials/Appbar";

export default class Category extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      userid:"",
      name:""
    }
    this.back=this.back.bind(this)
    this.logout=this.logout.bind(this)
    this.profile=this.profile.bind(this)
  }
  
  componentDidMount(){
    const { handle } = this.props.match.params;
    const { userid } = this.props.location.state;
    console.log(handle)
    this.setState({
      userid:userid,
    })
  }
  
  profile() {
    this.props.history.push({pathname:'/profile', state:{check:true,userid:this.state.userid}})
  }
  
  logout() {
    if(!window.confirm("Are you sure to logout?"))return;
    this.props.history.go(-2)
  }

  back() {
    this.props.history.goBack({state:{id:this.state.userid}})
  }

  render() {
    return(
      <div>
      <Appbar logout={this.logout} back={this.back} profile={this.profile}/>
      <div className="category">
        <br/><br/>
        <div className="linkb" >
          <Link className="links" to={{pathname:"/results",state:{userid:this.state.userid,search:"north"}}}>
            North Indian
          </Link>
        </div>
        <br/><br/>
        <div className="linkb" >
        <Link className="links" to={{pathname:"/results",state:{userid:this.state.userid,search:"south"}}}>
            South Indian
          </Link>
        </div>
        <br/><br/>
        <div className="linkb" >
        <Link className="links" to={{pathname:"/results",state:{userid:this.state.userid,search:"chinese"}}}>
            Chinese
          </Link>
        </div>
        <br/><br/>
        <div className="linkb" >
        <Link className="links" to={{pathname:"/results",state:{userid:this.state.userid,search:"snacks"}}}>
            Snacks
          </Link>
        </div>
        <br/><br/>
        <div className="linkb" >
        <Link className="links" to={{pathname:"/results",state:{userid:this.state.userid,search:"dessert"}}}>
            Desserts
          </Link>
        </div>
        <br/><br/>
        <div className="linkb" >
        <Link className="links" to={{pathname:"/results",state:{userid:this.state.userid,search:"beverage"}}}>
            Beverages
          </Link>
        </div>
        <br/><br/>
        <div className="linkb" >
        <Link className="links" to={{pathname:"/results",state:{userid:this.state.userid,search:"other"}}}>
            Miscellaneous
          </Link>
        </div>
      </div>
      </div>
    )
  }
}