import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class RecipeNode extends React.Component {
  constructor(props)
  {
    super(props)
    this.state={
      userid:"",
      id:"",
      title:"",
      prep: "",
      ingr: "",
      steps: "",
      genre: "",
      auth:""
    }
  }
  
  componentDidMount(){
    Axios.get(`http://localhost:5000/mydb/findf/${this.props.id}`)
    .then(res => {
      if(res.data!==null)
      this.setState({
        userid:this.props.userid,
        id:this.props.id,
        title:res.data.title,
        prep:  res.data.prep,
        ingr:  res.data.ingr,
        steps: res.data.steps,
        genre: res.data.genre,
        auth: res.data.auth
      })
    })
    .catch(err => console.log(err))
  }

  render()
  {
    const data = {
      userid:this.props.userid,
      id:this.props.id,
      title: this.state.title,
      prep:  this.state.prep,
      ingr:  this.state.ingr,
      steps: this.state.steps,
      genre: this.state.genre,
      auth:  this.state.auth
    }
    return(
      <div className="nodewrap" >
          <Link className="node" to={{pathname:"/read",state:{data:data, userid:this.props.userid}}}>{this.state.title}</Link>
      </div>
    )
  }
}