class character{
	constructor(name,description,image){
  	this.name=name;
    this.description=description;
    this.image=image;
  }
  //getName is method , name is variable
  getName(){
    return this.name;
  }
  getDescription(){
  	return this.description;
  }
  getImage(){
   	return this.image;
  }

}
// to handle event 
find = (event) =>{
event.preventDefault();
var param= document.getElementById("name").value;
var marvelUrl="https://gateway.marvel.com/v1/public/characters?name="+param+"&ts=1&apikey=72469e3c574bb2c9b801a5a820cb1544&hash=c3943e7f8e5b58c6d62d81b7393fe03b";

$.ajax({
      url: marvelUrl,
      dataType:'json',
    }).then(resultAPI => {
     console.log(resultAPI);
     document.getElementsByClassName("characterName")[0].innerHTML = resultAPI.data.results[0].name;
	 
     document.getElementsByClassName("characterImage")[0].src= resultAPI.data.results[0].thumbnail.path + "." 
     																								+resultAPI.data.results[0].thumbnail.extension;
	document.getElementsByClassName("characterDescription")[0].innerHTML = resultAPI.data.results[0].description;																								
     
    }).catch( e  => console.log(e));

}; 
//Onload event 
window.onload=function(){
	document.getElementById("marvelform").addEventListener('submit',find);
    var marvelUrl="https://gateway.marvel.com/v1/public/characters?limit=20&ts=1&apikey=72469e3c574bb2c9b801a5a820cb1544&hash=c3943e7f8e5b58c6d62d81b7393fe03b";

	$.ajax({
      url: marvelUrl,
      dataType:'json',
    }).then(resultAPI => {
     console.log(resultAPI);
    
		$( ".chip" ).each(function( index ) {
			document.getElementsByClassName("characterName")[index].innerHTML = resultAPI.data.results[index].name;
			
		    document.getElementsByClassName("characterImage")[index].src= resultAPI.data.results[index].thumbnail.path + "." 
	    																		+resultAPI.data.results[index].thumbnail.extension;
			document.getElementsByClassName("characterDescription")[index].innerHTML = resultAPI.data.results[index].description;
		});
		
			
    }).catch( e  => console.log(e));

};