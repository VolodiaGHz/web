function isOnline() {
    return window.navigator.onLine;
}

const feedback = (title, text,photo) => ` 
   <div class=" text-center col-md-4">
				<img src=${photo} id="col1">
				<h1 id="h1">${title}</h1>
				<p>${text}</p>
			</div>
`

function addElementNews(){
	if(isOnline()){
		console.log("Виконано");
		for(var i = 0; i < JSON.parse(localStorage.getItem("list_news")).length ;i++){
			$('#News').prepend(
		    	feedback(JSON.parse(localStorage.getItem("list_news"))[i].title,
		    		JSON.parse(localStorage.getItem("list_news"))[i].text,
		    		JSON.parse(localStorage.getItem("list_news"))[i].photo)
		  	);
		}
	}
}

addElementNews();

