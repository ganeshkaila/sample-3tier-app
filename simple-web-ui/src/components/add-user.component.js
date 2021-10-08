import React, {Component} from "react"
import UserDataService from "../services/user.service"

export default class AddUser extends Component {
	constructor(props) {
		super(props)
		this.onChangeName = this.onChangeName.bind(this)
		this.onChangeEmail = this.onChangeEmail.bind(this)
		this.saveUser = this.saveUser.bind(this)
		this.newUser = this.newUser.bind(this)

		this.state = {
			id: null,
			name: "",
			email: "",

			created: false
		}
	}

	onChangeName(e) {
		this.setState({
			name: e.target.value
		})
	}

	onChangeEmail(e) {
		this.setState({
			email: e.target.value
		})
	}

	saveUser() {
		var data = {
			name: this.state.name,
			email: this.state.email
		}

		UserDataService.createUser(data)
			.then((response) => {
				this.setState({
					id: response.data.id,
					name: response.data.name,
					email: response.data.email,

					created: true
				})
				console.log(response.data)
			})
			.catch((e) => {
				console.log(e)
			})
	}

	newUser() {
		this.setState({
			id: null,
			name: "",
			email: "",

			created: false
		})
	}

	render() {
		return (
			<div className="submit-form">
				{this.state.created ? (
					<div>
						<h4>You created successfully!</h4>
						<button className="btn btn-success" onClick={this.newUser}>
							Add
						</button>
					</div>
				) : (
					<div>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
								required
								value={this.state.name}
								onChange={this.onChangeName}
								name="name"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								className="form-control"
								id="email"
								required
								value={this.state.email}
								onChange={this.onChangeEmail}
								name="email"
							/>
						</div>

						<button onClick={this.saveUser} className="btn btn-success">
							Submit
						</button>
					</div>
				)}
			</div>
		)
	}
}
