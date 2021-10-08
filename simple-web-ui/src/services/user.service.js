import http from "../http-common"

class UserDataService {
	getAll() {
		return http.get("/users")
	}

	deleteAll() {
		return http.delete(`/users`)
	}

	createUser(data) {
		return http.post("/users", data)
	}

	findByName(name) {
		return http.get(`/users?name=${name}`)
	}

	get(id) {
		return http.get(`/users/${id}`)
	}

	update(id, data) {
		return http.put(`/users/${id}`, data)
	}

	delete(id) {
		return http.delete(`/users/${id}`)
	}
}

export default new UserDataService()
