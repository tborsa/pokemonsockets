import React, { Component } from 'react';
import Pokemon from './Pokemon.jsx';
import MainPokemon from './MainPokemon.jsx';

class Pokedex extends Component {
  constructor(props){
    super(props);
    this.state ={
      name: "bulbasaur",
      number: 1,
      description: "stuff",
      start: 1
    }
    
  }
  
  changePokemon = (num) => {
    this.setState({
      number: num
    })
    console.log(this.state.number);
  }

  changeWindow = (num) => {
    this.setState({
      start: this.state.start + num
    })
  }

  render() {
      let pokemonNumbers = [];
      for(let i=1; i<300; i++){
        pokemonNumbers.push(i);
      }
      pokemonNumbers = pokemonNumbers.splice(this.state.start, 4);
      const pokemonList = pokemonNumbers.map((num) => {
        return  <Pokemon key={num} selected={this.state.number} changePokemon={this.changePokemon} number={num}/>
      })
      return (
        <div className="pokedex">
          <div className="preview">
            <div onClick={()=>{this.changeWindow(-1)}}>^</div>
              {pokemonList}
            <div onClick={()=>{this.changeWindow(1)}}>v</div>
          </div>
          <MainPokemon setPokemon={this.props.setPokemon} name={this.state.name} number={this.state.number} />
        </div>
    );
  }
}

export default Pokedex;