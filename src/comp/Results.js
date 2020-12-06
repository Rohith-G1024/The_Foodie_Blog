import React from "react";
import Axios from "axios";
import RecipeNode from "./RecipeNode"
import Appbar from "./materials/Appbar";

export default class Results extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      userid:"",
      recipes:[],
      search:""
    }
    this.back=this.back.bind(this)
    this.logout=this.logout.bind(this)
    this.profile=this.profile.bind(this)
  }
  
  componentDidMount() {
    const { handle } = this.props.match.params;
    const { userid } = this.props.location.state;
    const { search } = this.props.location.state;
    console.log(handle);
    Axios.get(`http://localhost:5000/mydb/recipe?genre=${search}`)
    .then((res) => {
      this.setState({
        userid: userid,
        recipes: res.data,
        search:search
      })
    })
    .catch(err => console.log(err))

  }
  
  profile() {
    this.props.history.push({pathname:'/profile', state:{check:true,userid:this.state.userid}})
  }
  
  logout() {
    if(!window.confirm("Are you sure to logout?"))return;
    this.props.history.go(-3)
  }

  back() {
    this.props.history.goBack({state:{id:this.state.userid}})
  } 
  
  render(){
    const viewlist = this.state.recipes.map(food => <RecipeNode key={food.auth} id={food._id} userid={this.state.userid}/>)
    return (
      <div>
        <Appbar logout={this.logout} back={this.back} profile={this.profile}/>
        <div className="view">
          <h1>Results</h1>
          {viewlist}
        </div>
      </div>
    )
  }
}