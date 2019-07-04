import React, { Component } from "react";

function Pokemon(props) {
  return (
    <div className={props.selected == props.number ? "pokemon selected" : "pokemon" } >
      <p>{props.number}</p>
      <img onClick={()=>{ props.changePokemon(props.number) }} src={`/animated/${props.number}.gif`}>
      </img>
    </div>
    )
}

export default Pokemon;