const Pool = require("pg").Pool

let postgres_host

if (process.env.POSTGRES_HOST.split(":")[1] == undefined) {
	postgres_host = process.env.POSTGRES_HOST + ":" + process.env.POSTGRES_PORT
} else {
	postgres_host = process.env.POSTGRES_HOST
}

const connectionString =
	"postgresql://" +
	process.env.POSTGRES_USER +
	":" +
	process.env.POSTGRES_PASSWORD +
	"@" +
	postgres_host +
	"/" +
	process.env.POSTGRES_DB

const pool = new Pool({
	connectionString
})

new Promise(function (resolve, reject) {
	pool.query("SELECT NOW()", (err, res) => {
		if (err) {
			reject(err)
		}
		console.log("Database connection successful.")
	})
})

module.exports = pool
