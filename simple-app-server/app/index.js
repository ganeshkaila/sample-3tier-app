const express = require("express")
const app = express()

const dotenv = require("dotenv")
dotenv.config()

const port = process.env.APP_PORT
const webserver_host = process.env.WEB_SERVER_HOST

const data = require("./db/hanlder.js")

app.use(express.json())
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", webserver_host)
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Access-Control-Allow-Headers"
	)
	next()
})

app.get("/healthz", (req, res) => {
	res.status(200).send({status: "OK"})
})

// get all users
app.get("/users", (req, res) => {
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
app.get("/users/:id", (req, res) => {
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
app.post("/users", (req, res) => {
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
app.put("/users/:id", (req, res) => {
	data
		.updateUser(req.params["id"], req.body)
		.then((response) => {
			res.status(200).send(response)
		})
		.catch((error) => {
			res.status(500).send(error)
		})
})

app.delete("/users/:id", (req, res) => {
	data
		.deleteUser(req.params["id"])
		.then((response) => {
			res.status(200).send(response)
		})
		.catch((error) => {
			res.status(500).send(error)
		})
})

app.delete("/users", (req, res) => {
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
