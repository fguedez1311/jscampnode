import {createServer} from 'node:http'



process.loadEnvFile()

const port=process.env.PORT ?? 3000


function sendJson(res,statusCode,data){
    res.statusCode=statusCode
    res.setHeader('Content-Type','application/json; charset=utf-8')
    return res.end(JSON.stringify(data))
    
}

const sever=createServer((req,res)=>{
    
    if (req.url==='/users'){
       
       return sendJson(res,200,[
        {id:1,name:'Älice'},
        {id:2,name:'Bob'},
        
       ])
    }
    sendJson(res,404,{error:'Not Found'})

})
sever.listen(port,()=>{
    const address=sever.address()
    console.log(`Servidor escuchando en http://localhost:${address.port}`)
})
