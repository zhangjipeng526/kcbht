var express = require('express')
var bodyparser = require('body-parser')
var mysql = require('mysql')
var app = express()

app.use(bodyparser.urlencoded({}))
var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'',
	database:'mbxt',
	port:3306
})

app.get('/',(req,res) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql = `select * from kcb`
		connection.query(sql,function(err,data){
			if(err){
				console.log(err)
				return
		    }
			res.send(data)
			connection.end()
		})
	})
})

app.post('/updata',(req,res) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	var json = req.body
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql = `update kcb set xqy=?,xqe=?,xqs=?,xqsf=?,xqw=? where uid=${json.region}`
		connection.query(sql,[json.xqy,json.xqe,json.xqs,json.xqsf,json.xqw],function(err,data){
			if(err){
				console.log(err)
				return
		    }
			res.send(data)
			connection.end()
		})
	})
})

app.listen(3000)