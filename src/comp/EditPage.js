import Axios from "axios";
import React from "react";
import Appbar from "./materials/Appbar";

export default class EditPage extends React.Component {
  
  constructor(props)
  {
    super(props)
    this.state = {
      userid:"",
      id:"",
      title: "",
      prep: "",
      ingr: "",
      steps: "",
      genre: ""
    }
    this.EditRecipe=this.EditRecipe.bind(this)
    this.chtitle=this.chtitle.bind(this)
    this.chprep=this.chprep.bind(this)
    this.chsteps=this.chsteps.bind(this)
    this.chingr=this.chingr.bind(this)
    this.chgenre=this.chgenre.bind(this)
    this.logout=this.logout.bind(this)
    this.back=this.back.bind(this)
    this.profile=this.profile.bind(this)
  }
  
  componentDidMount() {
    const { handle } = this.props.match.params;
    const { userid } = this.props.location.state;
    const { id } = this.props.location.state;
    console.log(handle);

    Axios.get(`http://localhost:5000/mydb/findf/${id}`).then((res) => {
      this.setState({
        userid:userid,
        id:id,
        title: res.data.title,
        prep: res.data.prep,
        ingr: res.data.ingr,
        steps: res.data.steps,
        genre: res.data.genre
      });
    });
  }


  EditRecipe(e) {
    e.preventDefault();
    let title = document.forms["editrecipe"]["title"].value;
    let prep =  document.forms["editrecipe"]["prep"].value;
    let ingr =  document.forms["editrecipe"]["ingr"].value;
    let steps = document.forms["editrecipe"]["steps"].value;
    let genre = document.forms["editrecipe"]["genre"].value;
    

    if (title.length < 4) {
      alert("Title is too short.");
      document.forms["editrecipe"]["title"].focus();
      return false;
    } 
    else if (prep <= 0) {
      alert("Invalid preparation-time value");
      document.forms["editrecipe"]["prep"].focus();
      return false;
    }
    else if(genre==="null")
    {
      alert("Select the Genre");
      document.forms["editrecipe"]["genre"].focus();
      return false;
    }
    
    else {
      const newRecipe = {
        title: title,
        prep: prep,
        ingr: ingr,
        steps: steps,
        genre: genre,
      };

      Axios.post(`http://localhost:5000/mydb/edit/${this.state.id}`, newRecipe)
      .then( res => {
          console.log(res);
          alert("Recipe updated successfully");
          this.props.history.go(-2,{ state: { userid: this.state.userid } });
        }
      )
      .catch( err => console.log(err))
    }
  }

  chtitle(e) {
    this.setState({
      title:e.target.value
    })
  }
  chprep(e) {
    this.setState({
      prep:e.target.value
    })
  }
  chingr(e) {
    this.setState({
      ingr:e.target.value
    })
  }
  chsteps(e) {
    this.setState({
      steps:e.target.value
    })
  }
  chgenre(e) {
    this.setState({
      genre:e.target.value
    })
  }


  profile() {
    if(!window.confirm('Are you sure to exit editing the recipe?'))return;
    this.props.history.push({pathname:'/profile', state:{check:true,userid:this.state.userid}})
  }

  logout() {
    if(!window.confirm('Are you sure to exit editing the recipe?'))return;
    this.props.history.push('/login')
  }

  back() {
    if(!window.confirm('Are you sure to exit editing the recipe?'))return;
    this.props.history.goBack({state:{id:this.state.userid}})
  }
  
  render()
  {

    return(
      <div>
        <Appbar logout={this.logout} profile={this.profile} back={this.back}/>
        <div className="editpage">
        <form
          className="forms"
          name="editrecipe"
          onSubmit={this.EditRecipe}
          method="POST"
        >
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            text-size="50"
            placeholder="Title of your recipe"
            autoComplete="off"
            required="required"
            onChange={this.chtitle}
            defaultValue={this.state.title}
          />
          <br />
          <br />
          <label htmlFor="prep">Preparation Time:</label>
          <input
            type="number"
            name="prep"
            text-size="50"
            placeholder="Preparation time"
            required="required"
            onChange={this.chprep}
            defaultValue={this.state.prep}
          />
          <br />
          <br />
          <label htmlFor="ingr">Ingredients:</label>
          <textarea
            cols="40"
            rows="10"
            name="ingr"
            text-size="50"
            placeholder="Ingredients"
            required="required"
            onChange={this.chingr}
            defaultValue={this.state.ingr}
          />
          <br />
          <br />
          <label htmlFor="steps">Procedure:</label>
          <textarea
            cols="40"
            rows="15"
            name="steps"
            text-size="50"
            placeholder="Procedure"
            required="required"
            onChange={this.chsteps}      
            defaultValue={this.state.steps}
          />
          <br />
          <br />
          <label htmlFor="genre">Category:</label>
          <select name="genre" required="required" value={this.state.genre} onChange={this.chgenre}>
            <option value="north">North Indian</option>
            <option value="south">South Indian</option>
            <option value="chinese">Chinese</option>
            <option value="snacks">Snacks</option>
            <option value="dessert">Desserts</option>
            <option value="beverage">Beverages</option>
            <option value="other">Other</option>
          </select>
          <br/><br/>
          <button>Update Recipe</button>
          <br/><br/>

        </form>
        </div>
      </div>
    )
  }
} 