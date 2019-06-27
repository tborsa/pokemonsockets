import React, { Component } from 'react';

class Battle extends Component {
    render() {
        return (
            <div className="battle arena">
                <div className="opponent">
                    <img src="/animated/2.gif"></img>
                </div>
                <div className="opponent"> 
                    <img src="/animated/4.gif"></img>
                </div>
            </div>
        );
    }
}

export default Battle;