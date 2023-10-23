import mysql from 'mysql'
import { getTodayDateformatted, getTodayDate } from './today.js'

var query_getNews="SELECT * from news"
var query_getServerEvents="SELECT * from "
var pass = 'Chip.acro.pro12'

export function getSqlPassword(pass){
    pass = pass
}

//Загрузка новостей из БД сайта
export function loadNewsDb(pass) {
    return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
        client:'mysql2',
        host: "185.255.135.162",
        user: "alartroot",
        database: "test_jail_site_ver1",
        password: pass
    });
    
    connection.connect( err => {
        if(err){
            console.log(err)
            console.log('con.connect.loadNewsDb error')
            reject(err)
        }
        else
        {
            //console.log("DATABASE CONNECTED");
        }
    });
  
    connection.query(query_getNews, (err, result) => {
        if(err){
            console.log(err)
            console.log('conn.query.loadNewsDb error')
            reject(err)
        }
        else{
            resolve(result)
        }
    })
  
    connection.end()
    })
}

export async function checkDbTables() {
    console.log('checkDbTables RUN');
    if (todayTableExist() == true) {
        return true;
    } else {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('55 return true');
                resolve(true);
            }, 1500);
        });
    }
}


async function todayTableExist(){
    console.log('todayTableExist RUN')
    let query = `SHOW TABLES LIKE 'serverevents-${getTodayDateformatted()}'`
    //let query = `SHOW TABLES LIKE 'serverevents-29092023'`
    console.log(query)
    var res
    res = await checkTodayTableDb(query)
    console.log('res 68')
    console.log(res)
    if(res.length == 0){
        console.log('Таблица не найдена!')
        createTodayTable()
        setTimeout(() => {
            console.log('todayTableExist false')
            return false
        }, 1500);
        
    }
    console.log('todayTableExist true')
    return true
}

function checkTodayTableDb(query){
    console.log('checkTodayTableDb RUN')
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            client:'mysql2',
host: "185.255.135.162",
            user: "alartroot",
            database: "test_jail_site_ver1",
            password: pass
        });
        
        connection.connect( err => {
            if(err){
                console.log(err)
                console.log('con.connect.loadNewsDb error')
                reject(err)
            }
            else
            {
                //console.log("DATABASE CONNECTED");
            }
        });
      
        connection.query(query, (err, result) => {
            if(err){
                console.log(err)
                console.log('conn.query.loadNewsDb error')
                reject(err)
            }
            else{
                resolve(result)
            }
        })
      
        connection.end()
        })
}

function createTodayTable(){
    console.log('createTodayTable RUN')
    let query_createTodayTable = 'CREATE TABLE `serverevents-'+getTodayDateformatted()+'` (`id` INT AUTO_INCREMENT PRIMARY KEY,`text` VARCHAR(255),`date` TEXT);'
    const connection = mysql.createConnection({
        client:'mysql2',
host: "185.255.135.162",
        user: "alartroot",
        database: "test_jail_site_ver1",
        password: pass
    });
    
    connection.connect( err => {
        if(err){
            console.log(err)
            console.log('con.connect.createTodayTable error')
        }
        else
        {
            //console.log("DATABASE CONNECTED");
        }
    });
  
    connection.query(query_createTodayTable, (err, result) => {
        if(err){
            console.log(err)
            console.log('conn.query.createTodayTable error')
            
        }
        else{
            console.log('OK')
            console.log(result)
        }
    })

    connection.end()
}

export function getTodayServerHistoryDb(){
    let query = 'SELECT * FROM `serverevents-'+getTodayDateformatted()+'` WHERE 1'
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            client:'mysql2',
host: "185.255.135.162",
            user: "alartroot",
            database: "test_jail_site_ver1",
            password: pass
        });
        
        connection.connect( err => {
            if(err){
                console.log(err)
                console.log('con.connect.getTodayServerHistoryDb error')
                reject(err)
            }
            else
            {
                //console.log("DATABASE CONNECTED");
            }
        });
      
        connection.query(query, (err, result) => {
            if(err){
                console.log(err)
                console.log('conn.query.getTodayServerHistoryDb error')
                reject(err)
            }
            else{
                resolve(result)
            }
        })
      
        connection.end()
        })
}

export function addToServerHistoryDb(str){
    let query = 'INSERT INTO `serverevents-'+getTodayDateformatted()+'`(text, date) VALUES (?,?)'
    const connection = mysql.createConnection({
        client:'mysql2',
host: "185.255.135.162",
        user: "alartroot",
        database: "test_jail_site_ver1",
        password: pass
    });
    
    connection.connect( err => {
        if(err){
            console.log(err)
            console.log('con.connect.addToServerHistoryDb error')
        }
        else
        {
            //console.log("DATABASE CONNECTED");
        }
    });
  
    let date = getTodayDate()

    connection.query(query, [str.str, date], (err, result) => {
        if(err){
            console.log(err)
            console.log('conn.query.addToServerHistoryDb error')
            
        }
        else{
            console.log(result)
        }
    })
  
    connection.end()
}

//Была идея закинутb плашку из футера acro2024 в базу данных, но не майsql.
// export function loadSiteContentDb(pass) {
//     return new Promise((resolve, reject) => {
//     const connection = mysql.createConnection({
//         client:'mysql2',
//         host: "185.255.135.162",
//         user: "alartroot",
//         database: "test_jail_site_ver1",
//         password: pass
//     });
    
//     connection.connect(err => {
//         if(err){
//             console.log(err)
//             console.log('con.connect.loadNewsDb error')
//             reject(err)
//         }
//         else
//         {
//             //console.log("DATABASE CONNECTED");
//         }    
//     });
  
//     connection.query(query_getNews, (err, result) => {
//         if(err){
//             console.log(err)
//             console.log('conn.query.loadNewsDb error')
//             reject(err)
//         }
//         else{
//             resolve(result)
//         }
//     })
  
//     connection.end()
//     })
// }

export function showOneServerHistoryDb(q){
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            client:'mysql2',
host: "185.255.135.162",
            user: "alartroot",
            database: "test_jail_site_ver1",
            password: pass
        });
        
        connection.connect( err => {
            if(err){
                console.log(err)
                console.log('con.connect.showOneServerHistoryDb error')
                reject(err)
            }
            else
            {
                //console.log("DATABASE CONNECTED");
            }
        });
      
        connection.query(q, (err, result) => {
            if(err){
                console.log(err)
                console.log('conn.query.showOneServerHistoryDb error')
                reject(err)
            }
            else{
                resolve(result)
            }
        })
      
        connection.end()
        })
}