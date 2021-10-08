import axios from "axios"

const url = process.env.REACT_APP_SIMPLE_APP_SERVER_URL

export default axios.create({
	baseURL: url,
	headers: {
		"Content-type": "application/json"
	}
})
