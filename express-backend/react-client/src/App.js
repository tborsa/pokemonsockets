import React from 'react';
import ReactDOM from 'react-dom';
import Battle from './Battle';
import Pokedex from './Pokedex';
import Attacker from './Attacker';
import Menu from './Menu';
import openSocket from 'socket.io-client';
import './index.css';
import './App.css';
import './Battle.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      opponentOne:{
          number: null,
          health: 100,
          attacked: false
      },
      opponentTwo:{
          number: null,
          health: 100,
          attacked: false
      },
      menu: "attack"
    }
  }
  setPokemon = (pokeNum) => {
    let opponent = "opponentOne";
    if(this.state.opponentOne.number !== null){
      opponent = "opponentTwo";
    }
    this.setState({[ opponent ]: { number: pokeNum, health: this.state[opponent].health, attacked: false}})
  }
  
  sendAttack = (opponent) => {
    this.socket.emit('attack', {opponent: opponent});
  }
  
  componentDidMount(){
    this.socket = openSocket('http://supercoolstuff:3000');
    this.socket.on('attack', (data)=>{
      console.log(data);
      if(data.opponent == 1 ){
          this.setState({opponentOne: { number: this.state.opponentOne.number, health: this.state.opponentOne.health -1, attacked: true}}, ()=>{
            setTimeout(()=>{ 
              this.setState({opponentOne: { number: this.state.opponentOne.number, health: this.state.opponentOne.health, attacked: false}})
            }, 500);
          })
      }else{
          this.setState({opponentTwo: { number: this.state.opponentTwo.number, health: this.state.opponentTwo.health -1, attacked: true}}, ()=>{
            setTimeout(()=>{ 
              this.setState({opponentTwo: { number: this.state.opponentTwo.number, health: this.state.opponentTwo.health, attacked: false}})
            }, 500);
          })
      }
    });
    this.socket.emit('attack', {opponent: 1});
  }

  render(){
    return (
        <div className="app">
          {this.state.menu ==="battle" && !this.state.opponentTwo.number &&<Pokedex setPokemon={this.setPokemon}></Pokedex> }
          {this.state.menu ==="battle" && this.state.opponentTwo.number && <Battle opponentOne={this.state.opponentOne} opponentTwo={this.state.opponentTwo}></Battle>}
          {this.state.menu ==="attack" && <Attacker sendAttack={this.sendAttack} ></Attacker>}
        </div>
      );
  }
}

export default App;


