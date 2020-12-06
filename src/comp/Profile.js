import React from "react";
import Axios from "axios";
import Appbar from "./materials/Appbar";
import {Person, Call, Mail, Info} from "@material-ui/icons";
export default class Profile extends React.Component {
  
  constructor(props)
  {
    super(props)
    this.state = {
      userid:"",
      name:"",
      phone:"",
      email:"",
      bio:"",
      check:false
    }

    this.logout=this.logout.bind(this)
    this.back=this.back.bind(this)
    this.deleter=this.deleter.bind(this)
  }

  componentDidMount() {
    const { handle } = this.props.match.params;
    console.log(handle)
    const { userid } = this.props.location.state;
    const { check } = this.props.location.state;
    Axios.get(`http://localhost:5000/mydb/${userid}`)
    .then(res => {
      var biovar = res.data.bio 
      if(!res.data.bio || res.data.bio==="")biovar="Hey there! I'm using Foodie."
      this.setState({
        name: res.data.name,
        userid: res.data._id,
        phone:res.data.phone,
        email:res.data.email,
        bio:biovar,
        check:check
      })
    } 
    )
    .catch(err => console.log(err))
  }
  
  deleterecipe(food)
  {
    Axios.delete(`http://localhost:5000/mydb/deletef/${food}`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  deleter(){
    if(!window.confirm("Are you sure to permanently delete your account?\nAll your recipes will be deleted too."))return;
    Axios.delete(`http://localhost:5000/mydb/delete/${this.state.userid}`)
    .then(res => {
      var rlist=res.data.recipes.map(food => this.deleterecipe(food))
      console.log(rlist)
      this.props.history.push('/login')
    })
  }

  logout() {
    this.props.history.push('/login')
  }
  
  back() {
    this.props.history.goBack()
  }  
  
  render()
  {
    var visible = {
      display:"block"
    }
    if(this.state.check===false)
      visible = {
        display:"none"
      }
    return(
      <div>
        <Appbar logout={this.logout} back={this.back}/>
        <div className="profile">
          <div className="icon"><Person /><h2>: {this.state.name}</h2><br/></div>
          <div className="icon"><Call /><h2>: {this.state.phone}</h2><br/></div>
          <div className="icon"><Mail /><h2>: {this.state.email}</h2><br/></div>
          <div className="icon"><Info /><h2>: {this.state.bio}</h2></div><br/><br/>
        </div>
        <div style={visible}>
        <button className="linkb" onClick={this.deleter}>Delete My Account</button><br/><br/>
        </div>
      </div>
    );
  }
}