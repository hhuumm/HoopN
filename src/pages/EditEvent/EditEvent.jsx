import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button"
import './EditEvent.css';

class EditEvent extends Component {

	state = {
		invalidForm: false,
		formData: this.props.location.state.event,
		Name: "Edit Event",
	};

	formRef = React.createRef();
	handleSubmit = e => {
		e.preventDefault();
		this.props.handleUpdateEvent(this.state.formData);
	};

	handleChange = e => {
		const formData = { ...this.state.formData, [e.target.name]: e.target.value };
		this.setState({
			formData,
			invalidForm: !this.formRef.current.checkValidity()
		});
	};

	todaysDate() {
		return new Date().toJSON().split('T')[0]
}

	render() {
		return (
			<div className="EditEvent">
				<h4>Edit My Game</h4><br />
				<form
					className="col s12"
					ref={this.formRef}
					onSubmit={this.handleSubmit}
				>
					<div className="row">
						<div className="input-field col s12">
							<label htmlFor="event_title">Game Name:</label>
							<input

								name="location"
								id="location"
								type="text"
								disabled
								className="active"

								value={this.props.location.thisPlace.name} 

								onChange={this.handleChange}
							/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label htmlFor="createdBy">Created By:</label>
							<input
								name="title"
								id="event_title"
								type="text"
								className="active"
								value={this.state.formData.title}
								onChange={this.handleChange}
								required
							/>


						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								name="court"
								id="court"
								type="text"
								className="active"
								value={this.state.formData.court} 
								onChange={this.handleChange}
								required
							/>

						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label htmlFor="date">Date:</label>
							<input
								name="date"
								id="date"

								min={this.todaysDate()}
								type="date"

								className="active"
								value={this.state.formData.date}
								onChange={this.handleChange}
								required
							/>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<label htmlFor="time">
								Time:
							</label>
							<input
								name="time"
								id="time"
								type="time"
								className="active"
								value={this.state.formData.time}
								onChange={this.handleChange}
								required
							/>
						</div>
					</div>
					<div className="up-del">
						<Button
							variant="success"
							type="submit"
							disabled={this.state.invalidForm}
						>Save Changes</Button>
						<Link
							to={{
								pathname: '/events'
							}}
						><Button
							variant="warning"
						>Cancel</Button></Link>
					</div>
				</form>
			</div>
		);
	}
}

export default EditEvent;