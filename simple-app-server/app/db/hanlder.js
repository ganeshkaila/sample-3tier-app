const db = require("./config.js")

const listUsers = () => {
	return new Promise(function (resolve, reject) {
		db.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
			if (error) {
				reject(error)
			}
			resolve(results.rows)
		})
	})
}

const getUserByID = (id) => {
	return new Promise(function (resolve, reject) {
		db.query("SELECT * FROM users WHERE id=$1", [id], (error, results) => {
			if (error) {
				reject(error)
			}
			resolve(results.rows)
		})
	})
}

const createUser = (body) => {
	return new Promise(function (resolve, reject) {
		const {name, email} = body
		db.query(
			"INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
			[name, email],
			(error, results) => {
				if (error) {
					reject(error)
				}
				resolve(`A new user has been added added.`)
			}
		)
	})
}

const updateUser = (user_id, body) => {
	return new Promise(function (resolve, reject) {
		const id = parseInt(user_id)
		const {name, email} = body
		db.query(
			"UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
			[name, email, id],
			(error, results) => {
				if (error) {
					reject(error)
				}
				resolve(`User updated with ID: ${id}`)
			}
		)
	})
}

const deleteUser = (user_id) => {
	return new Promise(function (resolve, reject) {
		const id = parseInt(user_id)
		db.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
			if (error) {
				reject(error)
			}
			resolve(`User deleted with ID: ${id}`)
		})
	})
}

const deleteAllUsers = () => {
	return new Promise(function (resolve, reject) {
		db.query("TRUNCATE TABLE users", (error, results) => {
			if (error) {
				reject(error)
			}
			resolve(`All users deleted.`)
		})
	})
}

const findByName = (name) => {
	return new Promise(function (resolve, reject) {
		db.query(
			"SELECT * FROM users WHERE name=$1 ORDER BY id ASC",
			[name],
			(error, results) => {
				if (error) {
					reject(error)
				}
				resolve(results.rows)
			}
		)
	})
}

module.exports = {
	listUsers,
	getUserByID,
	createUser,
	updateUser,
	deleteUser,
	deleteAllUsers,
	findByName
}
