const csgo_pswd = "hardestpasswordever!"
export var aaa = 0

export function plus() {
    aaa++
    return aaa
}

export var online = {
    "totalOnline" : 0,
}

export const getOnline = async (req, res) => {
    try {
        console.log(online)
        res.json({
            online: online
        })
    } catch (error) {
        console.log(error)
    }
}

export const setOnline = async (req, res) => {
    console.log('GET Handled!')
    console.log(req.query)
    console.log(req.query.online)
    if(req.query.alartpswd != csgo_pswd){
        res.json({
            message: "404"
        })
        return
    }
    //Добавитт проверки на нулевые или некоррекные значения
    console.log(online)
    online[req.query.server] = req.query.online
    console.log(online)
    calcOnline()
    res.json({
        message: "ok"
    })
}

export const test1 = (req, res) => {
    if(req.query.p == 1){
        console.log('aaa: ' + aaa)
        plus()
        console.log('aaa: ' + aaa)
        res.json({
            message: "ok"
        })
    }
    else{
        res.json(0)
    }
}

function calcOnline(){
    
    for(let i = 0; i < online.length; i++){
        console.log(i)
        online.total = 5
        console.log(online)
    }
    var totalOnline = 0
    // var totalServers = 0 //Для разного кол-ва серверов
    Object.keys(online).forEach(server => {
        if(server != 'totalOnline'){
            totalOnline += parseInt(online[server])
            // totalServers++ 
        }
    });
    online['totalOnline'] = totalOnline
    console.log(online)
}
