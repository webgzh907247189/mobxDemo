let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')

let api = require('./api')
let { port } = require('./config')
let app = express()

app.use(bodyParser.json({type: 'application/json'}))

Object.keys(api).map((item,index)=>{
	let method = {
		'get': 'get',
		'p': 'post',
		'd': 'delete',
		't': 'put'
	}[item.includes(':') && item.substr(0,1) || 'get']
	
	let url = item.includes(':') && item.substr(2) || item
	
 	app[method](url,(req,res,next)=>{
		res.json(api[item])
	})
})

app.get('/',(req,res,next)=>{
	res.json({check: '应用是否存活!'})
})


app.set('port',process.env.port || port)

let getPort = app.get('port')
let server = app.listen(getPort,()=>{
	let port = server.address().port
	let host = server.address().address
	console.log('服务启动成功  http://%s:%s',host,port)
})

