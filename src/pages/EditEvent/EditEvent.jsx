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

	render() {
		return (
			<div className="EditEvent">
				<form
					className="col s12"
					ref={this.formRef}
					onSubmit={this.handleSubmit}
				>
					<div className="row">
						<div className="input-field col s12">
							<input
								name="title"
								id="event_title"
								type="text"
								className="active"
								value={this.state.formData.title}
								onChange={this.handleChange}
								required
							/>
							<label htmlFor="event_title">Event Title:</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								name="location"
								id="location"
								type="text"
								className="active"
								value={this.state.formData.location} //? Do we need to save the location(park) that the user selected in state and then pass that to this form? we may want to save the park/location ID, the name of the park, and the address, city, state, zip
								onChange={this.handleChange}
							/>
							<label htmlFor="location">Location:</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								name="court"
								id="court"
								type="text"
								className="active"
								// value={this.state.formData.location.name} //? Add the name of the court here, if it is a new court name for the location, add the new court name to the database
								onChange={this.handleChange}
							/>
							<label htmlFor="court">Court Name:</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								name="createdBy"
								id="createdBy"
								type="text"
								className="active"
								value={this.state.formData.createdBy.name} //? Need to import this from the user data - - this may be a hidden field that we pass through the form OR this might be captured via the controller
								onChange={this.handleChange}
							/>
							<label htmlFor="createdBy">Created By:</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								name="participant"
								id="participant"
								type="text"
								className="active"
								value={this.state.formData.participant.name} //? This will initially be just the user who created the event, other users will be added to this array when they sign-up to participate in an event - - this might be captured in the controller
								onChange={this.handleChange}
							/>
							<label htmlFor="participant">Participants:</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								name="date"
								id="date"
								type="text" //? We will need to use a date/time picker, probably from a React library
								className="active"
								value={this.state.formData.date}
								onChange={this.handleChange}
							/>
							<label htmlFor="date">Date/Time:</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								name="time"
								id="time"
								type="text"
								className="active"
								value={this.state.formData.time}
								onChange={this.handleChange}
							/>
							<label htmlFor="time">Time:</label>
						</div>
					</div>

					<div className="up-del">
						<Button
							variant="success"
							type="submit"
							disabled={this.state.invalidForm}
						>Save</Button>
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