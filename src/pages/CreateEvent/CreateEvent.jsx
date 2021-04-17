import React, { Component, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import './CreateEvent.css'

class CreateEvent extends Component {
    state = {
        invalidForm: true,
        formData: {
            title: '',
            // location: '', //? This will be selected by the user from the search screen and then that data will be passed in here - - the user will not be able to change the location at this point
            court: '', //? Add the name of the court here, if it is a new court name for the location, add the new court name to the database
            createdBy: '', //? We want to capture this based on the user id, but this may be a hidden field in the form
            participant: [], //? This will initially be just the user who created the event, other users will be added to this array when they sign-up to participate in an event
            date: '', //? Need to use date/time picker, probably from a React library
            time: '',
        }
    }

    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleAddEvent(this.state.formData);
    }

    handleChange = e => {
        const formData = { ...this.state.formData, [e.target.name]: e.target.value };
        this.setState({
            formData,
            invalidForm: !this.formRef.current.checkValidity()
        });
    }

    render() { // NEED TO REDO THIS WITH BOOTSTRAP - CURRENTLY INCLUDES A LOT OF MATERIALIZE MARKUPS
        return (
            <div className="CreateEvent">
                <form
                    className="col-s12"
                    ref={this.formRef}
                    onSubmit={this.handleSubmit}
                >
                    <div className="rowrow">
                        <div className="in">
                            <input
                                name="title"
                                placeholder="Event Title"
                                id="event_title"
                                type="text"
                                className="active"
                                value={this.state.formData.title}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="input-field col s12">
                            <input
                                name="location"
                                placeholder="Location"
                                id="location"
                                type="text"
                                className="active"
                                value={this.state.formData.location} //? Do we need to save the location(park) that the user selected in state and then pass that to this form? we may want to save the park/location ID, the name of the park, and the address, city, state, zip
                                onChange={this.handleChange}
                            />
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                name="court"
                                placeholder="Court Name"
                                id="court"
                                type="text"
                                className="active"
                                value={this.state.formData.court.name} //? Add the name of the court here, if it is a new court name for the location, add the new court name to the database
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                name="date"
                                // placeholder="Court Name"
                                id="date"
                                max="2031-04-17"
                                type="date"
                                className="active"
                                value={this.state.formData.court.name} //? Add the name of the court here, if it is a new court name for the location, add the new court name to the database
                                onChange={this.handleChange}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                name="time"
                                id="time"
                                step="900"
                                type="time"
                                className="active"
                                value={this.state.formData.court.name} //? Add the name of the court here, if it is a new court name for the location, add the new court name to the database
                                onChange={this.handleChange}
                            >
                            </input>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="button"
                        disabled={this.state.invalidForm}
                    >
                        <i className="material-icons left">Add Event</i>
                    </button>
                </form>
            </div>
        );
    }
}


export default CreateEvent;