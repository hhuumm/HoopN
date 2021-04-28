import React, { Component, useState } from 'react';
import './CreateEvent.css'

class CreateEvent extends Component {
    state = {
        invalidForm: true,
        formData: {
            title: '',
            placeId: this.props.location.props.location.state.park.place_id,
            locName: this.props.location.props.location.state.park.name,
            address: this.props.location.props.location.state.park.vicinity,
            court: '', 
            createdBy: this.props.user._id,
            participant: [this.props.user._id],
            date: '',
            time: '',
            places: this.props.places
        }
    }


    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.formData, "\n^^ this is formData")
        this.props.handleAddEvent(this.state.formData)
    }

    todaysDate() {
        return new Date().toJSON().split('T')[0]
    }

    handleChange = e => {
        const formData = { ...this.state.formData, [e.target.name]: e.target.value };
        this.setState({
            formData,
            invalidForm: !this.formRef.current.checkValidity()
        });
    }

    

    render() {
        
        const {park} = this.props.location.props.location.state
        console.log(park,"\n^^This is the park")
        console.log(this.props, "\n^^This is props Create Event")
        
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
                                name="placeId"
                                placeholder={park.place_id}
                                id="placeId"
                                type="text"
                                className="inactive"
                                value={park.place_id}
                                hidden
                                required
                            />
                        </div>
                    </div>
                    <div className="rowrow">
                        <div className="in">
                            <input
                                name="location_name"
                                placeholder={park.name}
                                id="location_name"
                                type="text"
                                className="inactive"
                                value={park.name}
                                required
                                disabled
                            />
                        </div>
                    </div>
                    <div className="rowrow">
                        <div className="in">
                            <input
                                name="location_vicinity"
                                placeholder={park.vicinity}
                                id="location_vicinity"
                                type="text"
                                className="inactive"
                                value={park.vicinity}
                                required
                                disabled
                            />
                        </div>
                    </div>
                    <div className="rowrow">
                        <div className="in">
                            <input
                                name="title"
                                placeholder="Enter Game Title"
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
                                placeholder="Enter Court Name"
                                id="court"
                                type="text"
                                className="active"
                                value={this.state.formData.court.name}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                name="date"
                                id="date"
                                min={this.todaysDate()}
                                type="date"
                                className="active"
                                value={this.state.formData.court.name}
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
                                type="time"
                                className="active"
                                value={this.state.formData.court.time}
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
                        <i className="material-icons left">Add New Game</i>
                    </button>
                </form>
            </div>
        );
    }
}

export default CreateEvent;

