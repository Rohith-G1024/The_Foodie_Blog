import Axios from "axios";
import React from "react";
import Appbar from "./materials/Appbar";



class Page2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userid: "" ,
      email:   "",
      password:"",
      phone: "" ,
      bio: "" ,
      recipes: [],
    }

    this.AddRecipe=this.AddRecipe.bind(this)
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
    const { id } = this.props.location.state;
    console.log(handle);

    Axios.get(`http://localhost:5000/mydb/${id}`).then((res) => {
      this.setState({
        name: res.data.name,
        userid: res.data._id,
        email: res.data.email,
        password: res.data.password,
        phone: res.data.phone,
        bio: res.data.bio,
        recipes: res.data.recipes,
      });
    });
  }

  AddRecipe(e) {
    e.preventDefault();
    let title = document.forms["addrecipe"]["title"].value;
    let prep = document.forms["addrecipe"]["prep"].value;
    let ingr = document.forms["addrecipe"]["ingr"].value;
    let steps = document.forms["addrecipe"]["steps"].value;
    let genre = document.forms["addrecipe"]["genre"].value;
    

    if (title.length < 4) {
      alert("Title is too short.");
      document.forms["addrecipe"]["title"].focus();
      return false;
    } 
    else if (prep <= 0) {
      alert("Invalid preparation-time value");
      document.forms["addrecipe"]["prep"].focus();
      return false;
    }
    else if(genre==="null")
    {
      alert("Select the Genre");
      document.forms["addrecipe"]["genre"].focus();
      return false;
    }
    
    else {
      const newRecipe = {
        title: title,
        prep: prep,
        ingr: ingr,
        steps: steps,
        genre: genre,
        auth: this.state.userid,
      };

      Axios.post("http://localhost:5000/mydb/addr", newRecipe).then(
        (response) => {
          const newarray = this.state.recipes;
          newarray[newarray.length] = response.data._id;
          const updated = {
            name: this.state.name,
            userid: this.state._id,
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            bio: this.state.bio,
            recipes: newarray,
          };
          this.setState(updated);
          Axios.post(
            `http://localhost:5000/mydb/update/${this.state.userid}`,
            updated
          )
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        }
      );
      alert("Recipe added successfully");
      this.props.history.goBack({ state: { id: this.state.userid } });
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
    this.props.history.push({pathname:'/profile', state:{check:true, userid:this.state.userid}})
  }

  logout() {
    if(!window.confirm("Are you sure to logout?"))return;
    this.props.history.go(-2)
  }

  back() {
    this.props.history.goBack({state:{id:this.state.userid}})
  }

  render() {
    return (
      <div>
        <Appbar logout={this.logout} back={this.back} profile={this.profile}/>
      <div className="page2">
        <h1>Type in your recipe.</h1>
        <form
          className="forms"
          name="addrecipe"
          onSubmit={this.AddRecipe}
          method="POST"
        >
          <input
            type="text"
            name="title"
            text-size="50"
            placeholder="Title of your recipe"
            autoComplete="off"
            onChange={this.chtitle}
            required="required"
          />
          <br />
          <br />

          <input
            type="number"
            name="prep"
            text-size="50"
            placeholder="Preparation time"
            onChange={this.chprep}
            required="required"
          />
          <br />
          <br />

          <textarea
            cols="40"
            rows="10"
            name="ingr"
            text-size="50"
            placeholder="Ingredients"
            onChange={this.chingr}
            required="required"
          />
          <br />
          <br />

          <textarea
            cols="40"
            rows="15"
            name="steps"
            text-size="50"
            placeholder="Procedure"
            onChange={this.chsteps}
            required="required"
          />
          <br />
          <br />
          <label htmlFor="genre">Category:</label>
          <select name="genre" required="required" defaultValue="null" onChange={this.chgenre}>
            <option value="null" disabled="disabled" >--Select--</option>
            <option value="north">North Indian</option>
            <option value="south">South Indian</option>
            <option value="chinese">Chinese</option>
            <option value="snacks">Snacks</option>
            <option value="dessert">Desserts</option>
            <option value="beverage">Beverages</option>
            <option value="other">Other</option>
          </select>
          <br/><br/>
          <button>Add my recipe</button>
          <br/><br/>
        </form>
      </div>
      </div>
    );

  }
}
export default Page2;
