import React, { Component } from 'react';

class Battle extends Component {
    render() {
      const effect = (  
        <div className="attack">
          <img src="/attack.gif"></img>
        </div> 
      )
      return (
          <div className="battle arena">
              <div className={ this.props.opponentOne.health>0 ? "opponent" : "hide"}>
                  <img src={`/animated/${this.props.opponentOne.number}.gif`}></img>
                  <div className="healthbar">
                      <div className="inner" style={{width: this.props.opponentOne.health+"%"}}></div>
                  </div>
                  { this.props.opponentOne.attacked ? effect : null }
              </div>
              <div className={ this.props.opponentTwo.health>0 ? "opponent" : "hide"}> 
                  <img src={`/animated/${this.props.opponentTwo.number}.gif`}></img>
                  <div className="healthbar">
                      <div className="inner" style={{width: this.props.opponentTwo.health+"%"}}></div>
                  </div>
                  { this.props.opponentTwo.attacked ? effect : null }
              </div>
      
          </div>
      );
    }
}

export default Battle;