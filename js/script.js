
class Pokemon{
  constructor(name,image,types,height, stats){
    this._name = name;
    this._image = image;
    this._types = types;
    this._height = height;
    this._stats = stats;
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
  
  getStats(){
  	return this._stats;
  }
  
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


  