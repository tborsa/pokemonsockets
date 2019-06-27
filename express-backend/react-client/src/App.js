import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';



class MainPokemon extends React.Component  {
  render(){

    return(
      <div className="main-pokemon">
        <img src={`animated/${this.props.number}.gif`}></img>
        <h1><span>#{this.props.number}</span> {this.props.name} </h1>
        <p> {this.props.description} </p>
      </div>
    );
  }
}
  
class Pokemon extends React.Component  {
  render(){

    return(
      <div onClick={()=>{this.props.changePokemon(this.props.number)}} className={this.props.selected===this.props.number ? "pokemon selected" : "pokemon"} >
        <p>{this.props.number}</p>
        <img src={`animated/${this.props.number}.gif`}></img>
      </div>
    );
  }
}
  
class Pokedex extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      name : "bulbasaur",
      number: 1,
      description: "green boi",
      start: 0
    }
  }

  changePokemon = (newNum)=>{
    console.log("changed");
    this.setState({number: newNum});
  }

  slidePreview = (int)=>{
    this.setState({start: this.state.start + int});
  }

  render(){
    let pokemonArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    pokemonArray = pokemonArray.splice(this.state.start, 4);
    console.log(pokemonArray);
    let pokemons  = pokemonArray.map((element)=>{
        return(
            <Pokemon selected={this.state.number}  changePokemon={this.changePokemon} name="charizard" number={element}></Pokemon>
        );
    })

    return(
        <div className="pokedex">
        <div className="preview">
            <div onClick={()=>{this.slidePreview(-1)}}>^</div>
            {pokemons}
            <div onClick={()=>{this.slidePreview(1)}}>v</div>
        </div>
        <MainPokemon number={this.state.number} name={this.state.name} description={this.state.description}></MainPokemon>
        </div>
    );
  }
}
  
class App extends React.Component {
  render(){
      return (
        <div className="App">
          <Pokedex></Pokedex>
        </div>
      );
  }
}

export default App;


