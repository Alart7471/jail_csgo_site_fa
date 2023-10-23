import { getTodayServerHistoryDb, addToServerHistoryDb, checkDbTables, showOneServerHistoryDb } from "./db.js"

export var serverHistory = []

loadServerHistory()

async function loadServerHistory() {
    console.log('loadServerHistory RUN');
    let result = await checkDbTables();
    console.log(result);
    if (result == true) {
        console.log('7');
        serverHistory = await getTodayServerHistoryDb();
    } else {
        console.log('14 else');
        await new Promise((resolve) => {
            setTimeout(async () => {
                try {
                    serverHistory = await getTodayServerHistoryDb();
                    resolve();
                } catch (error) {
                    resolve();
                }
            }, 60000);
        });
    }
}



export function showAllServerHistory(){
    console.log(serverHistory)
    return serverHistory
}

export function showLastServerHistory(){
    if(serverHistory.length > 10){
        let s = 0
        let serverHistoryLatest = []
        console.log(serverHistory)
        for(let i = serverHistory.length-1; i>0; i--){
            console.log(i)
            s++
            serverHistoryLatest.push(serverHistory[i])
            if(s == 10){
                let serverHistoryLatestNew = []
                for(let j = serverHistoryLatest.length-1; j>=0 ; j--){
                    serverHistoryLatestNew.push(serverHistoryLatest[j])
                }
                return serverHistoryLatestNew
            }
        }
    }
    else return serverHistory
}

export function addToServerHistory(query){
    console.log('Push !')
    console.log(query)
    checkDbTables()
    console.log('add??')
    addToServerHistoryDb(query)
    // serverHistory.push({
    //     text: query.str,
    //     date: new Date()
    // })
    loadServerHistory()
    console.log(serverHistory)
    console.log('SERVER HISTORYTTT')
}


export async function showOneServerHistory(query) {
    let query_showOne = 'SELECT * from `serverevents-' + query + '`';
  
    try {
      const response = await showOneServerHistoryDb(query_showOne);
      console.log(response)
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

export function checkDateFormat(str) {
    const regex = /^\d{2}\d{2}\d{4}$/;
    return regex.test(str);
}