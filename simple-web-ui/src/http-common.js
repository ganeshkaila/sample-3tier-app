import axios from "axios"

var host_url
if (process.env.APP_HOST != undefined) {
	host_url = window.location.host
} else {
	host_url = "34.150.211.237.nip.io"
}

export default axios.create({
	baseURL: "http://" + host_url + "/app",
	headers: {
		"Content-type": "application/json"
	}
})
