import {createServer} from 'node:http'
import { uptime } from 'node:process'
import { json } from 'node:stream/consumers'
import { randomUUID } from 'node:crypto'


process.loadEnvFile()

const port=process.env.PORT ?? 3000


function sendJson(res,statusCode,data){
    res.statusCode=statusCode
    res.setHeader('Content-Type','application/json; charset=utf-8')
    return res.end(JSON.stringify(data))
    
}
const users=[
        {id:1,name:'Älice'},
        {id:2,name:'Bob'},
        
       ]
const sever=createServer(async (req,res)=>{

    const {method,url}=req
    if (method==='GET'){
        if (req.url==='/users'){
       
          return sendJson(res,200,users)

        }
        if (req.url === '/health'){
         res.statusCode = 200
         res.setHeader('Content-Type', 'application/json; charset=utf-8')

        const healthInfo = {
                            status: 'ok',
                            uptime: Math.floor(process.uptime()), // Segundos redondeados
                            timestamp: Date.now(),
                         }

        return res.end(JSON.stringify(healthInfo))
       }

    }
    if (method==='POST'){
        if(url==='/users'){
            //Hacer nuestra magia
            const body=await json(req)
            if (!body || !body.name){
                return sendJson(res,400,'Name is required')
            }
            const newUser={
                name:body.name,
                id:randomUUID()
            }
            
            users.push(newUser)
            return  sendJson(res,200,{
                message:"Usuario Creado"
            })

        }
    }


  
       
   return sendJson(res,404,{error:'Not Found'})

})
sever.listen(port,()=>{
    const address=sever.address()
    console.log(`Servidor escuchando en http://localhost:${address.port}`)
})
