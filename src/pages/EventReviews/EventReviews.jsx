import React, { Component } from 'react';


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