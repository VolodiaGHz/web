  const getById = id => document.getElementById(id);
  const namearea = getById('name');
  const textarea = getById('text');
  const feedbackContainer = getById('reviewsList');
  const form = getById('form');

const feedbackArea = (name, text, date, time) => ` 
    <div class="container">
        <br>
        <p>
        <br>
        ${text}
        </p>
        <br>
        <span class="review-date col-md-6">${date}, ${time}</span>
        <span class="review-author col-md-6">${name}</span>
    </div>
    <div class="divider"></div>
    <div id="ball1" class="col-md-24 text-center">
		<img src="ball.png" alt="ball" style="width: 25px; margin-top: 30px; margin-bottom:30px">
		<img src="ball.png" alt="ball" style="width: 25px; margin-top: 30px; margin-bottom:30px">
		<img src="ball.png" alt="ball" style="width: 25px; margin-top: 30px; margin-bottom:30px">
	</div>
`

function isOnline() {
    return window.navigator.onLine;
}

var feedbacs = [];

function complete(){
  if (namearea.value.length == 0 && textarea.value.length == 0){ 
    alert("Всі поля повинні бути заповненні") 
    return;
  }

  const date = new Date();
  if(!isOnline()){
      var fb = {
        name:document.getElementById('name').value,
        text: document.getElementById('text').value
      }
    
      feedbacs.push(fb);

      localStorage.setItem("feedbacs",JSON.stringify(feedbacs));

      console.log(feedbacs);
    }if(isOnline()){
      console.log("Додається на сервер");
      $('#reviewsList').prepend(
      feedbackArea(document.getElementById('name').value, document.getElementById('text').value, date.toLocaleDateString(), date.toLocaleTimeString())
      );
    }
  
  
  document.getElementById('name').value = '';
    document.getElementById('text').value = '';
}
	function addElementLocalStorig(){
  const date = new Date();
  if(isOnline()){
    for(var i = 0; i < JSON.parse(localStorage.getItem("feedbacs")).length ;i++){
      $('#reviewsList').prepend(
          feedbackArea(JSON.parse(localStorage.getItem("feedbacs"))[i].name,
            JSON.parse(localStorage.getItem("feedbacs"))[i].text,
            date.toLocaleDateString(), date.toLocaleTimeString())
        );
    }
  }
}
addElementLocalStorig();