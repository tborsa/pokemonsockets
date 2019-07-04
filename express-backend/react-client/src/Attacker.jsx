import React, {Component} from 'react';

class Attacker extends Component{
    render(){
        return(
            <div className="battle">
                <div onClick={()=>{this.props.sendAttack(1)}} className="button one"> ATTACK! </div>
                <div onClick={()=>{this.props.sendAttack(2)}} className="button one"> ATTACK! </div>
            </div>
        );
    }
}

export default Attacker;