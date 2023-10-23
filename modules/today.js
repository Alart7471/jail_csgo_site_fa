import { checkDbTables } from './db.js'

var todayDate = new Date
var todayDateformatted = `${todayDate.getDate()}.${todayDate.getMonth() + 1}.${todayDate.getFullYear()}`
console.log(todayDateformatted)
console.log('================================================')
console.log('================================================')
console.log('================================================')
console.log('================================================')
console.log('================================================')

startTimer()
export function getTodayDate(){
    updateDate()
    return todayDate
}
export function getTodayDateformatted(){
    updateDate()
    return todayDateformatted
}

function updateDate(){
    todayDate = new Date
    var d = todayDate.getDate()
    var m = todayDate.getMonth()+1
    var y = todayDate.getFullYear()
    if(d < 10){
        d = '0'+d
    }
    if(m < 10){
        m = '0'+m
    }
    todayDateformatted = d+''+m+''+y
    //todayDateformatted = `${todayDate.getDate()}.${todayDate.getMonth() + 1}.${todayDate.getFullYear()}`
}

function startTimer() {
    setInterval(() => {
        updateDate()
        let date = new Date()
        console.log(date)
        if(date.getDay() == todayDate.getDay()){
            checkDbTables()
        }
    }, 300000) // 5 minutes in milliseconds
}


