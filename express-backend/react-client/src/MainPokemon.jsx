import React, { Component } from 'react';

class MainPokemon extends Component {
  constructor(props){
    super(props);
    this.state = {
      number: 1
    }
  }
  selectPokemon(num){
    this.setState({number: this.state.number+1});
    this.props.setPokemon(num);
  }
  render() {
    return (
      <div className="main-pokemon">
        <img src={`/animated/${this.props.number}.gif`} />
        <h1>
          <span>#{this.props.number}</span> {this.props.name}
        </h1>
        <p>One green boi.</p>
        <button onClick={()=>{this.selectPokemon(this.props.number) }}>Select {this.state.number}</button>
    </div>
    );
  }
}

export default MainPokemon;