const getById = id => document.getElementById(id);
const title = getById('Title');
const news = getById('NewsField');
// const file = getElementById('EnterFile')

var list_news = [];

function adding(){
  // e.preventDefault();
	if(title.value.length == 0 && news.value.length == 0 ){
		alert("All fields should be completed");
		return;
	}

	if(!isOnline()){
      var Nws = {
        title:title.value,
        text:news.value
      }
    
      list_news.push(Nws);

      localStorage.setItem("list_news",JSON.stringify(list_news));

    console.log(list_news);
  }else{
    console.log("Додається на сервер");
  }


  alert('Вашу новину успішно збережено!');
  
  news.value=" ";
  title.value=" ";
}

// function readURL(input) {

//   if (input.files && input.files[0]) {
//     var reader = new FileReader();

//     reader.onload = function(e) {
//       $('#test').attr('src', e.target.result);                                                                                
//       }                                                            
    

//     reader.readAsDataURL(input.files[0]);
//   }
// }

// $("#EnterFile").change(function() {
//   readURL(this);
// });

// const addButton = document.getElementById('sub');
// addButton.onclick = onSubmitPress;
// }