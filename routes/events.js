const router = require('express').Router();
const eventsCtrl = require('../controllers/events');

router.get('/', eventsCtrl.index);
router.get('/location/:id', eventsCtrl.locationGames);

router.use(require('../config/auth'));
router.get('/mine', checkAuth, eventsCtrl.myGames);
router.post('/', checkAuth, eventsCtrl.create);
router.post('/:id/participants', checkAuth, eventsCtrl.addParticipant);
router.delete('/:id/participants/me', checkAuth, eventsCtrl.removeParticipant);
router.post('/:id/reviews', checkAuth, eventsCtrl.createReview);
router.delete('/:id', checkAuth, eventsCtrl.delete);
router.put('/:id', checkAuth, eventsCtrl.update);

function checkAuth(req, res, next) {
    return req.user ? next() : res.status(401).json({ error: 'Authentication required' });
}

module.exports = router;
