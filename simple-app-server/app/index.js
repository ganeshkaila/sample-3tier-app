const express = require("express")
const app = express()
var cors = require("cors")
const dotenv = require("dotenv")
const data = require("./db/hanlder.js")

dotenv.config()

const port = process.env.APP_PORT
const web_server_host = process.env.WEB_SERVER_HOST

var whitelist = [
	"http://localhost",
	"http://127.0.0.1",
	"http://localhost:80",
	"http://127.0.0.1:80",
	"http://localhost:8082",
	"http://127.0.0.1:8082",
	"http://localhost:8081",
	"http://127.0.0.1:8081",
	"http://34.150.211.237.nip.io",
	"http://34.86.78.212",
	web_server_host
]
var corsOptionsDelegate = function (req, callback) {
	var corsOptions
	if (whitelist.indexOf(req.header("Origin")) !== -1) {
		corsOptions = {origin: true} // reflect (enable) the requested origin in the CORS response
	} else {
		corsOptions = {origin: false} // disable CORS for this request
	}
	callback(null, corsOptions) // callback expects two parameters: error and options
}

console.log()

app.use(express.json())

app.get("/healthz", (req, res) => {
	res.status(200).send({status: "OK"})
})

// get all users
app.get("/users", cors(corsOptionsDelegate), (req, res) => {
	if (req.query.name != null) {
		data
			.findByName(req.query.name)
			.then((response) => {
				res.status(200).send(response)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	} else {
		data
			.listUsers()
			.then((response) => {
				res.status(200).send(response)
			})
			.catch((error) => {
				res.status(500).send(error)
			})
	}
})

// get user by id
app.get("/users/:id", cors(corsOptionsDelegate), (req, res) => {
	data
		.getUserByID(req.params["id"])
		.then((response) => {
			res.status(200).send(response)
		})
		.catch((error) => {
			res.status(500).send(error)
		})
})

// create user
app.post("/users", cors(corsOptionsDelegate), (req, res) => {
	data
		.createUser(req.body)
		.then((response) => {
			res.status(200).send(response)
		})
		.catch((error) => {
			res.status(500).send(error)
		})
})

// update user
app.put("/users/:id", cors(corsOptionsDelegate), (req, res) => {
	data
		.updateUser(req.params["id"], req.body)
		.then((response) => {
			res.status(200).send(response)
		})
		.catch((error) => {
			res.status(500).send(error)
		})
})

app.delete("/users/:id", cors(corsOptionsDelegate), (req, res) => {
	data
		.deleteUser(req.params["id"])
		.then((response) => {
			res.status(200).send(response)
		})
		.catch((error) => {
			res.status(500).send(error)
		})
})

app.delete("/users", cors(corsOptionsDelegate), (req, res) => {
	data
		.deleteAllUsers()
		.then((response) => {
			res.status(200).send(response)
		})
		.catch((error) => {
			res.status(500).send(error)
		})
})

app.listen(port, () => {
	console.log(`Simple app server running on port ${port}.`)
})
