var marvel = {
	render: function() {
		var url = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=b89508034bfeab38dfa4d135c6c96e26&hash=d3a36f12dcdbe4c6fb5f01f854adba63"
		var message = document.getElementById("message");
    
		var marvelContainer = document.getElementById("marvel-container"); 
		
	  $.ajax({
		url: url,
		type:"GET",
		beforeSend: function() {
			message.innerHTML = "Loading...";
		},
		complete: function() {
			 message.innerHTML = "Successful!";
		},
		success: function(data) {
			footer.innerHTML = data.attributionHTML; 
			var string = "";
			string += "<div class ='row'>";
			for(var i = 0; i <data.data.results.length;i++) {
				var element = data.data.results[i];
				 
				string += "<div class='col-sm-3'>";
				string += "<a href='" + element.urls[0].url+ "' target='_blank'>"

				string += "<img src='"+ element.thumbnail.path +"/portrait_incredible."+element.thumbnail.extension+"'  />";
				string += "</a>";
				string += "<h3>" +element.name + "</h3> "; 
				string += "</div>";
				if((i+1) % 4 == 4) {   
		 string += "<div>";
		 string += "<div class='row'>";
		 


	  }
			 }
			 marvelContainer.innerHTML = string;
		},
		error: function() {
			message.innerHTML = "we are sorry!";
		}
	});
}
};
marvel.render(); 