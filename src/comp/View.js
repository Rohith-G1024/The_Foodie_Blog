import React from "react";
import Axios from "axios";
import RecipeNode from "./RecipeNode"
import Appbar from "./materials/Appbar";


export default class View extends React.Component {
  constructor(props)
  {
    super(props)
    this.state ={
      userid :"",
      recipes:[],
      currdata:{},
    }
    this.back=this.back.bind(this)
    this.logout=this.logout.bind(this)
    this.profile=this.profile.bind(this)
  }

  componentDidMount() {
    const { handle } = this.props.match.params;
    const { id } = this.props.location.state;
    console.log(handle);
    Axios.get(`http://localhost:5000/mydb/${id}`)
    .then((res) => {
      this.setState({
        userid: id,
        recipes: res.data.recipes,
      })
    })
    .catch(err => console.log(err))

  }
    
  profile() {
    this.props.history.push({pathname:'/profile', state:{check:true,userid:this.state.userid}})
  }
  
  logout() {
    this.props.history.go(-2)
  }

  back() {
    this.props.history.goBack({state:{id:this.state.userid}})
  }
  
  render() {
    const viewlist1 = this.state.recipes.map(food => <RecipeNode key={food} id={food} userid={this.state.userid}/>)
    return (
    <div>
      <Appbar logout={this.logout} back={this.back} profile={this.profile}/>
    <div className="view">
      <h1>My recipes</h1>
      {viewlist1}
    </div>
    </div>
    );
  }
}

