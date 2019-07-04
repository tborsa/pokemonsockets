
module.exports = function(io){
  let playerHealth = {opponentOne: 100, opponentTwo: 100};
  let playerOne = null;
  let playerTwo = null;
  io.on('connection', (socket)=>{
    console.log("Client Connected");
    socket.emit("connection", {opponentOne: playerOne, opponentTwo: playerTwo});
    
    socket.on('setPokemon', (data)=>{
      console.log("setPokemon", data)
      if(data.opponent === "opponentOne"){
        playerOne = data.number;
      }else{
        playerTwo = data.number;
      }
      socket.broadcast.emit("incomingPokemon", data);
      playerHealth.opponentOne = 100;
      playerHealth.opponentTwo = 100;
    })

    socket.on('attack', (data)=>{
      console.log(data);
      let opponent = "opponentOne";
      if(data.opponent === 2){
        opponent = "opponentTwo";
      }
      playerHealth[opponent] --;
      data.health = playerHealth[opponent];
      socket.broadcast.emit("incomingAttack", data);
    })

    socket.on('anything', (data)=>{

    })



  })

}