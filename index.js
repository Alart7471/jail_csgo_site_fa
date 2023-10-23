import express from 'express'
import path from 'path'
import http from 'http'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { aaa, getOnline, setOnline, plus, test1 } from './modules/csgo_server_info.js';
import {  } from './modules/csgo_server_admin.js';
import { serverHistory, showAllServerHistory, showLastServerHistory, addToServerHistory, showOneServerHistory, checkDateFormat } from './modules/history_bar.js';
import { rand, history_db_add } from './modules/history_db.js'
import { loadNewsDb, checkDbTables, getSqlPassword } from './modules/db.js'
import { getTodayDate,  getTodayDateformatted} from './modules/today.js'

import { copyFileSync } from 'fs';


const PORT = 8000
export const sql_password = ''
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'client')))
app.use(express.static(path.resolve(__dirname, 'client_admin'))) //???


getSqlPassword()


app.get('/', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client/sections/main', 'main.html'))
})
app.get('/rules', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client/sections/rules', 'rules.html'))
})
app.get('/players', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client/sections/top', 'top.html'))
})
app.get('/vip', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client/sections/vip', 'vip.html'))
})
app.get('/news', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client/sections/news', 'news.html'))
})
app.get('/events', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'client/sections/se', 'se.html'))
})
var alart_admin_pswd = "!(alart_very_strongest_pswd_ever)"

app.get('/admin', (req, res) => {
    console.log(req.query)
    if(req.query.alart_admin_pswd == alart_admin_pswd){
        
        res.sendFile(path.resolve(__dirname, 'client_admin', 'admin.html'))
    }
    else{
        res.sendFile(path.resolve(__dirname, 'client/sections/main', 'main.html'))
    }
})

app.get('/api/loadNews', async (req, res) =>{
    try {
        var data = await loadNewsDb(sql_password)
    } catch (error) {
        console.log(error)
        res.json('')
        // res.json({
        //     0:{
        //         text: 'error',
        //         title: 'aboba'
        //     }
        // })
        return
    }
    res.json(data)
})

app.get('/api/csgo/helloworld', setOnline)

app.get('/api/csgo/online', getOnline)

app.get('/test', test1)

app.get('/api/content', getContent)

function getContent(){ //тут я должен был подгружат плагки акро2024 из бд

}



app.post('/testt', (req, res) => {

    console.log('Test 1 started!')

    console.log(req.body)

    res.status(201).json({id: 11})
})

app.get('/api/csgo/history', async (req, res) => {

    console.log(req.query)

    if(req.query.todo == 'show'){
        // res.json('show')
        //res.json(rand())
        res.status(200).json(showLastServerHistory())
        return
    }
    else if(req.query.todo == 'add'){

        if(!history_db_add(req, res)){
            res.status(200).json(404)
            return
        }
    }
    else if(req.query.todo == 'this'){
        if(checkDateFormat(req.query.this)){
            res.status(200).json(await showOneServerHistory(req.query.this))
        }
        else{
            res.status(400).json(400)
        }
    }
    else{
        res.status(404).json(404)
        return
    }

    //res.json(showAllServerHistory())
})

app.get('/api/test', (req, res) =>{
    checkDbTables()
    res.status(200).json('ok')
})

app.listen(PORT, (err) => {
    if(err){
      return console.log(err);
    }
    console.log(`Server OK :${PORT}`)
})