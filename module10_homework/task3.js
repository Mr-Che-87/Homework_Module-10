const wsUri = "wss://echo-ws-service.herokuapp.com";  //тут лежит серверная часть 

    
  const chatInput = document.querySelector(".chat-input");
  const input = document.querySelector(".input");
  const btnSend = document.querySelector(".btn-send");
  const chatOutput = document.querySelector(".chat-output");

  const infoOutput = document.querySelector(".info-output");

  const btnGeo = document.querySelector(".btn-geo");
  const statusGeo = document.querySelector('#status-Geo');
  const mapLink = document.querySelector('#map-link');



  let websocket = new WebSocket(wsUri);  //переменная для хранения объекта websocket

/*  websocket.onopen = () => {
    infoOutput.innerHTML = 'Соединение установлено';
  } */
  

//Функция отправки/приёма сообщений:
  const sendMessage = () => {
    const message = input.value;
    websocket.send (message);   //ОТПРАВКА сообщения
    writeToChat(message, "fromUser");   //fromUser - класс сообщений пользователя для задания стилей
   
    websocket.onmessage = () => {  //ПОЛУЧЕНИЕ сообщения
      const message = input.value;  //чтобы КАЖДЫЙ РАЗ отвечал тоже самое  
      //РЕЗРЕВ - const message = event.data;

      writeToChat(message, "fromServer");   //fromServer - класс сообщений пользователя для задания стилей.
      //???ПОЧЕМУ ТУТ writeToChat ВНУТРИ, а в websocket.send - СНАРУЖИ???
    };


    // Функция ошибки обычного сообщения:
    websocket.onerror = () => {
        infoOutput.innerText = 'При передаче данных произошла ошибка';
      }

  }

  
//Функция формирования html-вёрстки для сообщений: 
  const writeToChat = (message, className) => {  
    let messageHTML = `<div class="${className}">${message}</div>`
    chatOutput.innerHTML += messageHTML;  //каждое следующее сообщение добавляется после предыдущего
  }





/*ГЕОЛОКАЦИЯ*/ 

// Функция отправки геолокации в качестве сообщения:
const sendGeoLocation = () => {
    const success = (position) => {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        const locationMessage = `Широта: ${latitude} °, Долгота: ${longitude} °`;
        const mapURL = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  
        writeToChat(locationMessage, "fromUser");
        writeToChat(`<a href="${mapURL}" target="_blank">Ссылка на карту</a>`, "fromUser");
  };

    // Функция гео-ошибки:
    const error = () => {
        statusGeo.textContent = 'Невозможно получить ваше местоположение';
    }

       
    if (!navigator.geolocation) {
      statusGeo.textContent = 'Geolocation не поддерживается вашим браузером';
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }

};



  
//Событие на кнопку с функцией отправки обычного сообщения:
btnSend.addEventListener('click', sendMessage);

//дубляж события на клавишу Enter:
input.addEventListener('keyup', function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        btnSend.click();
    }
});

   

// Событие на кнопку отправки геолокации
btnGeo.addEventListener('click', sendGeoLocation);
    
  
  
  