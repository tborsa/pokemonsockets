import React from 'react';
import Battle from './Battle';
import Pokedex from './Pokedex';
import Attacker from './Attacker';
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

  componentDidMount(){
    this.socket = openSocket('http://192.168.88.87:3000')
    this.socket.on("connection", (data)=>{
      console.log(data)
      this.setState({
        opponentOne : {number: data.opponentOne, health: this.state.opponentOne.health , attacked: false},
        opponentTwo : {number: data.opponentTwo, health: this.state.opponentTwo.health, attacked: false},
      });
      console.log("connected")
    });
    this.socket.on("incomingAttack", (data)=>{
      console.log(data);
      let opponent = "opponentOne";
      if(data.opponent === 2){
        opponent = "opponentTwo";
      }
      this.setState({
        [opponent] : {number: this.state[opponent].number, health: data.health, attacked: true}
      }, ()=>{
        setTimeout(()=>{
          this.setState({
            [opponent] : {number: this.state[opponent].number, health: this.state[opponent].health, attacked: false}
          });
        }, 80)
      })
    })

    this.socket.on('incomingPokemon', (data)=>{
      console.log("pokemon set", data);
      let opponent = "opponentOne";
      if(data.opponent == 2){
        opponent = "opponentTwo";
      }
      this.setState({
        [data.opponent] : {number: data.number, health: this.state[data.opponent].health, attacked: false}
      });
    })
    
  }



  attackPokemon = (num) => {
    this.socket.emit("attack", {opponent: num});
  }

  setPokemon = (pokeNum) => {
    let opponent = "opponentOne";
    if(this.state.opponentOne.number !== null){
      opponent = "opponentTwo";
    }
    this.socket.emit("setPokemon", {opponent: opponent, number: pokeNum });
    this.setState({[ opponent ]: { number: pokeNum, health: this.state[opponent].health, attacked: false}})
  }

  render(){
    return (
        <div className="app">
          {this.state.menu ==="battle" && !this.state.opponentTwo.number &&<Pokedex setPokemon={this.setPokemon}></Pokedex> }
          {this.state.menu ==="attack" && this.state.opponentTwo.number && <Battle opponentOne={this.state.opponentOne} opponentTwo={this.state.opponentTwo}></Battle>}
          {this.state.menu ==="attack" && <Attacker attackPokemon={this.attackPokemon}></Attacker>}
        </div>
      );
  }
}

export default App;


