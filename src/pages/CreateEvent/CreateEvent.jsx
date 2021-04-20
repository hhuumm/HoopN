import React, { Component, useState } from 'react';
import './CreateEvent.css'

class CreateEvent extends Component {
    state = {
        invalidForm: true,
        formData: {
            title: '',
            placeId: this.props.location.props.location.state.park.place_id,
            court: '', 
            createdBy: this.props.user._id,
            participant: [this.props.user._id],
            date: '',
            time: '',
        }
    }


    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.formData, "\n^^ this is formData")
        this.props.handleAddEvent(this.state.formData);
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
        
       const {park}= this.props.location.props.location.state
       console.log(park,"\n^^This is the park")

    //    const photoUrl = (park.photos[0].html_attributions[0]).replace('</a>', '').replace('<a href="', '').replace('"', '').split('>').slice(0,1)
    //     console.log('photoURL: ', photoUrl)
        
        return (
            <div className="CreateEvent">
                <form
                    className="col-s12"
                    ref={this.formRef}
                    onSubmit={this.handleSubmit}
                >
                    {/* <div className="rowrow">
                        <div className="in">
                            <img src={(park.photos[0].html_attributions[0]).replace('</a>', '').replace('<a href="', '').replace('"', '').split('>').slice(0,1)}></img>
                        </div>
                    </div> */}
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
                            />
                        </div>
                    </div>
                    <div className="rowrow">
                        <div className="in">
                            <input
                                name="title"
                                placeholder="Event Name"
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
                                value={this.state.formData.location}
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
                                // step="900"
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
                        <i className="material-icons left">Add Event</i>
                    </button>
                </form>
            </div>
        );
    }
}


export default CreateEvent;

