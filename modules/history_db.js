import { addToServerHistory } from './history_bar.js';


function getRandomMessage() {
    const messages = [
      "Привет!",
      "Как дела?",
      "Что нового?",
      "Погода сегодня отличная!",
      "Ура, выходной!",
      //Тестовые сообщения...использовалось для тестирования
    ];
  
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  function generateRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  function generateRandomMessagesArray(count) {
    const messagesArray = [];
  
    let id = 1;
    for (let i = 0; i < count; i++) {
      const message = {
        id: id,
        text: getRandomMessage(),
        date: generateRandomDate(new Date(2023, 0, 1), new Date())
      };
  
      messagesArray.push(message);
      id++;
    }
  
    return messagesArray;
  }
  
  const randomMessages = generateRandomMessagesArray(30);

export function rand(){

    return generateRandomMessagesArray(30);
}

export function history_db_add(req, res){
  console.log('add ')
  console.log(req.query.str)

  if(req.query.str != undefined | req.query.str != null){
    if(!checkHistoryStr(req.query)){
      //наверное лучше передават сразу строку, 
      //раз я решил передават толко строку, которую будет генеритт игра
      //в формате 12:00 Round has been ended!,
      //а дату можно закидыватb чисто для базы данных где-то тут или ниже
      return false
    }
    addToServerHistory(req.query)
  }


  
}
//Проверка на правилност данных для запроса
function checkHistoryStr(query){
  console.log(`checkHistoryStr:`)
  console.log(query)
  if(/*str.id == null || str.id == undefined ||*/ 
  query.str == null || query.str == undefined || query.str == '' 
  /* || query.date == null || query.date == undefined || query.date == ''*/){
    console.log('checkHistoryStr : false')
    return false
  }
  return true
}