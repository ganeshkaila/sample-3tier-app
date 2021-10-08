import React, {Component} from "react"
import UserDataService from "../services/user.service"

export default class User extends Component {
	constructor(props) {
		super(props)
		this.onChangeName = this.onChangeName.bind(this)
		this.onChangeEmail = this.onChangeEmail.bind(this)
		this.getUser = this.getUser.bind(this)
		this.updateUser = this.updateUser.bind(this)
		this.deleteUser = this.deleteUser.bind(this)

		this.state = {
			currentUser: {
				id: -1,
				name: "",
				email: ""
			},
			message: ""
		}
	}

	componentDidMount() {
		this.getUser(this.props.match.params.id)
	}

	onChangeName(e) {
		const name = e.target.value

		this.setState(function (prevState) {
			return {
				currentUser: {
					...prevState.currentUser,
					name: name
				}
			}
		})
	}

	onChangeEmail(e) {
		const email = e.target.value

		this.setState((prevState) => ({
			currentUser: {
				...prevState.currentUser,
				email: email
			}
		}))
	}

	getUser(id) {
		UserDataService.get(id)
			.then((response) => {
				console.log(response.data)
				this.setState({
					currentUser: response.data[0]
				})
			})
			.catch((e) => {
				console.log(e)
			})
	}

	updateUser() {
		UserDataService.update(this.state.currentUser.id, this.state.currentUser)
			.then((response) => {
				console.log(response.data)
				this.setState({
					message: "The user was updated successfully!"
				})
			})
			.catch((e) => {
				console.log(e)
			})
	}

	deleteUser() {
		UserDataService.delete(this.state.currentUser.id)
			.then((response) => {
				console.log(response.data)
				this.props.history.push("/users")
			})
			.catch((e) => {
				console.log(e)
			})
	}

	render() {
		const {currentUser} = this.state
		return (
			<div>
				{currentUser ? (
					<div className="edit-form">
						<h4>User</h4>
						<form>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									className="form-control"
									id="name"
									value={currentUser.name}
									onChange={this.onChangeName}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="email">Email</label>
								<input
									type="text"
									className="form-control"
									id="email"
									value={currentUser.email}
									onChange={this.onChangeEmail}
								/>
							</div>
						</form>

						<button className="m-2 btn btn-danger" onClick={this.deleteUser}>
							Delete
						</button>

						<button
							type="submit"
							className="m-2 btn btn-secondary"
							onClick={this.updateUser}
						>
							Update
						</button>
						<p>{this.state.message}</p>
					</div>
				) : (
					<div>
						<br />
						<p>Please click on a User...</p>
					</div>
				)}
			</div>
		)
	}
}
