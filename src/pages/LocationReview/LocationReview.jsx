import React, { Component } from 'react';
import './LocationReview.css'

class LocationReview extends Component {
    state = {
        invalidForm: true,
        formData: {
            reivewer: '',
            rating: '',
            content: ''
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

    render() {
        return (
            <div className="LocationReview">

                <h1>Location Name</h1>
                <h2>Location Address</h2>
                <h2>Review Form:</h2> 
                {/* Only show form if the user has not reviewed this location before. */}
                if (!location.reviews.some(u =))
                <form
                    className="col-s12"
                    ref={this.formRef}
                    onSubmit={this.handleSubmit}
                >
                    <div className="rowrow">
                        <div className="in">
                            <input
                                name="rating"
                                placeholder="Rating 1-5"
                                id="location_review_rating"
                                type="text"
                                className="active"
                                value={this.state.formData.rating}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>
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
                                // step="900"
                                type="time"
                                className="active"
                                value={this.state.formData.court.time} //? Add the name of the court here, if it is a new court name for the location, add the new court name to the database
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