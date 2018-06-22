
class Pokemon{
  constructor(id,name,image,types,height, weight, stats){
  	this._id = id;
    this._name = name;
    this._image = image;
    this._types = types;
    this._height = height;
    this._weight = weight;
    this._stats = stats;
<<<<<<< HEAD
=======
    this._moves = [];
>>>>>>> master
  }
  
  getId(){
  	return this._id;
  }
  
 	getName(){
  	return this._name
  }
  
  getImage(){
  	return this._image;
  }
  
  getTypes(){
  	return this._types;
  }
  
  getHeight(){
  	return this._height;
  }
  
  getWeight(){
  	return this._weight;
  }
  
  getStats(){
  	return this._stats;
  }
  
<<<<<<< HEAD
=======
  getMoves(){
  	return this._moves;
  }
  
>>>>>>> master

  toString(){
		return this._name + "! A pokemon of " + this._types.map(a => a.getName()) + " type!";
  }
}

class Type{
	constructor(){
  	
  }
  
  setName(name){
  	this._name = name;
  }
  
  getName(){
  	return this._name;
  }
}

class Stats{
	constructor(speed,specialDefense,specialAttack, defense, attack , hp){
  	
  	this._speed = speed;
    this._specialDefense = specialDefense;
    this._specialAttack = specialAttack;
    this._defense = defense;
    this._attack = attack;
    this._hp = hp;
<<<<<<< HEAD
=======
    this._accuracy = 0;
    this._evasion = 0;
  }
  
  getEvasion(){
  	return this._evasion;
  }
  
  getAccuracy(){
  	return this._accuracy;
>>>>>>> master
  }
  
  getSpeed(){
  	return this._speed;
  }
  
  getSpecialDefense(){
  	return this._specialDefense;
  }
  
  getSpecialAttack(){
  	return this._specialAttack;
  }
  
  getDefense(){
  	return this._defense;
  }
  
  getAttack(){
  	return this._attack;
  }
  
  getHP(){
  	return this._hp;
  }
}

<<<<<<< HEAD
=======
class Move{
	constructor(name){
  	this._name = name;
  }
  
  getName(name){
  	return this._name;
  }

}

>>>>>>> master
//const $pokemons = $("#pokemons");
const addPokemon = (pokemon) => {
	document.getElementById("idpokemon").innerHTML = pokemon.getId();
  document.getElementById("pokename").innerHTML = pokemon.getName();
  document.getElementById("pokeimage").src = pokemon.getImage();
  document.getElementById("type").innerHTML = pokemon.getTypes().map(a => a.getName());
  document.getElementById("height").innerHTML = pokemon.getHeight();
  document.getElementById("weight").innerHTML = pokemon.getWeight();
  document.getElementById("hp").innerHTML = pokemon.getStats().getHP();
  document.getElementById("attack").innerHTML = pokemon.getStats().getAttack();
  document.getElementById("defense").innerHTML = pokemon.getStats().getDefense();
  document.getElementById("spattack").innerHTML = pokemon.getStats().getSpecialAttack();
  document.getElementById("spdefense").innerHTML = pokemon.getStats().getSpecialDefense();
  document.getElementById("speed").innerHTML = pokemon.getStats().getSpeed();
  
  //responsiveVoice.speak(pokemon.toString());
};

<<<<<<< HEAD
const search = (event) => {
=======
const searchPokemon = (event) => {
>>>>>>> master
		event.preventDefault();
    var param = document.getElementById("pokenumber").value;
    var pokeURL = "https://pokeapi.co/api/v2/pokemon/" + param;
    
    $.ajax({
      url: pokeURL,
      dataType:'json',
    }).then(data => {
<<<<<<< HEAD
    	console.log(data);
=======
    	//console.log(data);
>>>>>>> master
      const types = createArrayType(data.types);
     
      const stats = new Stats(data.stats[0].base_stat,
      												data.stats[1].base_stat,
                              data.stats[2].base_stat,
                              data.stats[3].base_stat,
                              data.stats[4].base_stat,
                              data.stats[5].base_stat);
<<<<<<< HEAD
   
=======
   		searchMove(data.moves[0].move.url);
>>>>>>> master
      const pokemon = new Pokemon(
      										"#" + data.id,
      										data.name.toUpperCase(), 
                          data.sprites.front_default ,
                          types,
                          data.height,
                          data.weight,
                          stats);
   	
      addPokemon(pokemon);
    }).catch( e  => console.log(e));
}

<<<<<<< HEAD
=======
const searchMove = (url) => {
		
    $.ajax({
      url: url,
      dataType:'json',
    }).then(data => {
    	console.log(data);
		const move = new Move(data.name);
      
    }).catch( e  => console.log(e));
}

>>>>>>> master
function createArrayType(data){
	var types = [];
  var type = new Type();
	data.forEach(function(element) {
    type.setName(element.type.name);
    types.push(type);
    type = new Type();
  });
  return types;
}
window.onload=function(){
<<<<<<< HEAD
	document.getElementById("pokeform").addEventListener('submit', search);
};
  
=======
	document.getElementById("pokeform").addEventListener('submit', searchPokemon);
};
>>>>>>> master
