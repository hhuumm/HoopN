import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import './EventReviews.css'


class EventReviews extends Component {
    state = {
        invalidForm: true,
        formData: {
            reviewer: this.props.user.name,
            rating: '',
            content: ''
        },
        event: this.props.history.location.state.event
    }

    formRef = React.createRef();


    handleSubmitReview = e => {
        e.preventDefault();
        console.log(this.state.formData, '\n^^ formDate review')
        this.props.handleAddReview(this.state.formData);

    }

    handleChange = e => {
        const formData = { ...this.state.formData, [e.target.name]: e.target.value };
        this.setState({
            formData,
            invalidForm: !this.formRef.current.checkValidity()
        });
    }

    render() {

        // if(!location.reviews.some(u => {return u.reviewer === user._id}))

        return (
            <div className="EventReviews">
                <h2>Review Form:</h2>
                <form
                    className="col-s12"
                    ref={this.formRef}
                    onSubmit={this.handleSubmitReview}
                >
                    {/* <div className="rowrow">
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
                    </div> */}
                    <span className="active-span" >Rate(1-5): </span>
                    <select
                        name="rating"
                        placeholder="Rating 1-5"
                        id="location_review_rating"
                        type="text"
                        className="active"
                        value={this.state.formData.rating}
                        onChange={this.handleChange}
                        required
                    >
                        <option></option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    {/* ------------- using bootstrap below --------- */}
                    {/* <DropdownButton
                        id="dropdown-item-button"
                        title="Rating 1-5"
                        name="rating"
                        // id="location_review_rating"
                        type="number"
                        className="active"
                        value={this.state.formData.rating}
                        onChange={this.handleChange}
                        required
                    >
                        <Dropdown.Item as="button">1</Dropdown.Item>
                        <Dropdown.Item as="button">2</Dropdown.Item>
                        <Dropdown.Item as="button">3</Dropdown.Item>
                        <Dropdown.Item as="button">4</Dropdown.Item>
                        <Dropdown.Item as="button">5</Dropdown.Item>
                    </DropdownButton> */}
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                name="content"
                                placeholder="Write Review Here"
                                id="location_review_content"
                                type="text"
                                className="active"
                                value={this.state.formData.content}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="button"
                        disabled={this.state.invalidForm}
                    >
                        <i className="material-icons left">Add Review</i>
                    </button>
                </form>
            </div>
        );
    }
}


export default EventReviews;