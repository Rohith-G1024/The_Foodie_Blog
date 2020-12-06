import Axios from "axios"
import React from "react"
import {Link} from "react-router-dom"
import Appbar from "./materials/Appbar"

function LinedText(prop){
  const text = prop.text
  return (<div className="texts">{text}</div>)
}


export default class RecipePage extends React.Component {
  constructor(props)
  {
    super(props)
    this.state ={
      name: "",
      userid:"",
      id:"",
      title:"",
      prep: "",
      ingr: "",
      steps: "",
      genre: "",
      auth:"",
      check:true,
      search:false
    }
    this.deleter=this.deleter.bind(this)
    this.editer=this.editer.bind(this)
    this.logout=this.logout.bind(this)
    this.back=this.back.bind(this)
    this.profile=this.profile.bind(this)
  }
  
  componentDidMount() {
    const { handle } = this.props.match.params;
    const { data } = this.props.location.state;
    const { userid } = this.props.location.state;
    console.log(handle)
    var check=true;
    if(userid!==data.auth)check=false;
    Axios.get(`http://localhost:5000/mydb/${data.auth}`).then((res) => {
      console.log(res);
      this.setState({
        name: res.data.name,
        userid: userid,
        id:    data.id,
        title: data.title,
        prep:  data.prep,
        ingr:  data.ingr,
        steps: data.steps,
        genre: data.genre,
        auth:  data.auth,
        check:check
      });
    });
  }

  deleter(){
    if(!window.confirm("Are you sure to delete this recipe?"))return;
    console.log(this.state.userid)
    Axios.delete(`http://localhost:5000/mydb/deletef/${this.state.id}`)
    .then(res => {
      Axios.get(`http://localhost:5000/mydb/${this.state.auth}`)
      .then(user => {
        const recipes=user.data.recipes
        const index = recipes.indexOf(this.state.id)
        if(index>-1)recipes.splice(index,1)
        this.setState({name:user.data.name})
        const updateduser = {
            name:     user.data.name,
            userid:   user.data._id,
            email:    user.data.email,
            password: user.data.password,
            phone:    user.data.phone,
            bio:      user.data.bio,
            recipes: recipes,
        }
        Axios.post(`http://localhost:5000/mydb/update/${this.state.auth}`,updateduser)
        .then(response => {
          this.props.history.goBack({state: {userid:this.state.userid}})
        })
        .catch(err=>{
          console.log(err)
          this.props.history.goBack({state: {userid:this.state.userid}})
        })
      })
      .catch(err=>{
        console.log(err)
        this.props.history.goBack({state: {userid:this.state.userid}})
      })
      
    })
    .catch(err=>{
      console.log(err)
      this.props.history.goBack({state: {userid:this.state.userid}})
    })
  }



  editer() {
    this.props.history.push({pathname:'/edit', state:{userid:this.state.userid, id:this.state.id}})
  }

  profile() {
    this.props.history.push({pathname:'/profile', state:{check:this.state.check,userid:this.state.userid}})
  }

  logout() {
    this.props.history.push('/login')
  }

  back() {
    this.props.history.goBack({state:{id:this.state.userid}})
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
    return (
      <div>
        <Appbar logout={this.logout} back={this.back} profile={this.profile}/>  
        <div className="read">
          <h1>{this.state.title}</h1><hr/>
          <h4>Preparation time: {this.state.prep} minutes</h4><hr/>
          <h2>Ingredients:</h2>
          <LinedText text={this.state.ingr} />
          <h2>Procedure:</h2>
          <LinedText text={this.state.steps} />
          <br/><br/>
          <h3>By: </h3>
          <div className="author">
            <Link className="links" to={{ pathname: "/profile", state: { check:this.state.check,userid:this.state.auth } }}>
              {this.state.name}
              </Link>
          </div>
          <br/><br/>
          <div style={visible}>
          <button className="linkb" onClick={this.deleter}>Delete Recipe</button><br/><br/> 
          <button className="linkb" onClick={this.editer}>Update Recipe</button> 
          </div>
        </div>
      </div>
    )
  }
}