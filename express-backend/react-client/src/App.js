import React from 'react';
import Battle from './Battle';
import Pokedex from './Pokedex';
import Attacker from './Attacker';

import './index.css';
import './App.css';
import './Battle.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opponentOne:{
          number: 20,
          health: 100,
          attacked: false
      },
      opponentTwo:{
          number: null,
          health: 150,
          attacked: false
      }
    }
  }
  setPokemon = (pokeNum) => {
    let opponent = "opponentOne";
    if(this.state.opponentOne.number !== null){
      opponent = "opponentTwo";
    }
    this.setState({[ opponent ]: { number: pokeNum, health: this.state[opponent].health, attacked: false}})
  }

  render(){
    return (
        <div className="app">
          {this.state.menu ==="battle" && !this.state.opponentTwo.number &&<Pokedex setPokemon={this.setPokemon}></Pokedex> }
          {this.state.menu ==="battle" && this.state.opponentTwo.number && <Battle opponentOne={this.state.opponentOne} opponentTwo={this.state.opponentTwo}></Battle>}
          {this.state.menu ==="attack" && <Attacker></Attacker>}
        </div>
      );
  }
}

export default App;


