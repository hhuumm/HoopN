import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './EventDetailsCard.css';

const stars = (rating) => '⭐'.repeat(Number(rating) || 0) || 'Not rated';
const identity = (value) => String(value?._id || value || '');

function EventDetailsCard({ events = [], places = [], user, deleteEvent, history, setParticipation, addReview }) {
  const { id } = useParams();
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const event = events.find(candidate => candidate._id === id);
  const imageNumber = useMemo(() => (id ? [...id].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 20 + 1 : 1), [id]);

  if (!event) {
    return <div className="event-status" role="status">Loading game details…</div>;
  }

  const participants = event.participant || [];
  const reviews = event.reviews || [];
  const isParticipating = participants.some(person => identity(person) === identity(user));
  const isOwner = identity(event.createdBy) === identity(user);
  const thisPlace = places.find(place => place.place_id === event.placeId);

  async function run(action) {
    setBusy(true);
    setError('');
    try {
      await action();
    } catch (requestError) {
      setError(requestError.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  function removeEvent() {
    run(async () => {
      await deleteEvent(event._id);
      history.push('/events');
    });
  }

  function toggleParticipation() {
    run(() => setParticipation(event._id, isParticipating));
  }

  function submitReview(submitEvent) {
    submitEvent.preventDefault();
    run(async () => {
      await addReview(event._id, { rating: Number(rating), content: review });
      setRating('');
      setReview('');
    });
  }

  return (
    <div className="EventList-detail">
      <Card className="event-detail-card">
        <Card.Img variant="top" src={`/images/${imageNumber}.jpg`} alt="Outdoor basketball court" />
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <p className="event-location"><strong>{event.locName}</strong><br />{event.address}</p>
          <p>{event.date} at {event.time}</p>
          <p>Created by {event.createdBy?.name || 'a HoopN player'}</p>

          <section aria-labelledby="participants-heading">
            <h5 id="participants-heading">Players ({participants.length})</h5>
            <p>{participants.map(person => person.name || 'Player').join(', ') || 'No players yet'}</p>
            {!isOwner && (
              <Button variant={isParticipating ? 'outline-danger' : 'success'} disabled={busy} onClick={toggleParticipation}>
                {isParticipating ? 'Leave game' : 'Join game'}
              </Button>
            )}
          </section>
        </Card.Body>

        {isOwner && (
          <div className="up-del">
            <Button variant="danger" disabled={busy} onClick={removeEvent}>Delete</Button>
            <Link to={{ pathname: '/edit', state: { event, thisPlace } }}><Button variant="primary">Edit</Button></Link>
          </div>
        )}

        <form className="review-card" onSubmit={submitReview}>
          <h5>Leave a review</h5>
          <label htmlFor="location_review_content">Comment</label>
          <textarea id="location_review_content" value={review} onChange={changeEvent => setReview(changeEvent.target.value)} required />
          <label htmlFor="location_review_rating">Rating</label>
          <select id="location_review_rating" value={rating} onChange={changeEvent => setRating(changeEvent.target.value)} required>
            <option value="">Choose 1–5</option>
            {[1, 2, 3, 4, 5].map(value => <option key={value} value={value}>{value}</option>)}
          </select>
          <Button type="submit" disabled={busy}>Submit review</Button>
          {error && <p className="event-error" role="alert">{error}</p>}
        </form>

        <section className="reviews-div" aria-labelledby="reviews-heading">
          <h5 id="reviews-heading">Reviews</h5>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map(item => (
            <p className="reviews-span" key={item._id || `${item.name}-${item.createdAt}`}>
              <strong>{item.name || item.reviewer?.name || 'Player'}</strong>: <span className="allstars" aria-label={`${item.rating} out of 5 stars`}>{stars(item.rating)}</span> {item.content}
            </p>
          ))}
        </section>
      </Card>
    </div>
  );
}

export default EventDetailsCard;
