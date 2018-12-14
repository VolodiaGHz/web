var useLocalStorage = false;

function switchUseLS(){
  useLocalStorage = !useLocalStorage;
}

window.isOnline = () => this.navigator.onLine;
const getById = (id) => document.getElementById(id);


class ServerService {
  async sendToServer(data) {
    try {
      await fetch('/news', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Cannot fetch data: ', error);
    }
  }

 async getFromServer() {
    try {
      const data = await fetch('/news/all');
      return data.text();
    } catch (error) {
      console.error('Cannot fetch data: ', error);
    }
  }
}
//

const newsContainer = getById('News');

class News{
  constructor(picture,title, body){
    this.picture = picture;
    this.title = title;
    this.body = body;
  }
}

function newsTemplate(news) {
var picture = news.picture;
var title = news.title;
var body = news.body;
var button = document.createElement('input');

button.type  = 'button';
button.addEventListener('click', function() {
    alert(add);
}, false);

return `
  <div class=" text-center col-md-4">
        <img src=${picture} id="col1">
        <h1 id="h1">${title}</h1>
        <p>${body}</p>
      </div>
`
}

function myFunction() {
  if(useLocalStorage){
    localStorage.clear();
    alert("Вашу новину видалено успішно!");
    location.reload();
    show();
  }
  else {
      window.indexedDB.deleteDatabase("news_data");
      location.reload();
      show();
  }
}

const service = new ServerService();

const initAndRenderData = async () => {
  const items = await service.getFromServer();
  console.log(items);

  const itemsStringified = JSON.stringify(items);

  JSON.parse(items).forEach(({ picture,title, body }) => {
         var tempNews = new News(picture, title, body );
         $('#News').append(
           newsTemplate(tempNews),
         );
   });
}

const onOnline = () => {
  initAndRenderData();
  console.log('Network status: online');
}

const onOffline = () => {
  console.log('Connection lost');
}

window.addEventListener('online', onOnline);
window.addEventListener('offline', onOffline);
window.addEventListener('DOMContentLoaded', initAndRenderData);

