const router = require('express').Router();
const eventsCtrl = require('../controllers/events');

// Public Routes

// Protected Routes
router.use(require('../config/auth'));
router.get('/', checkAuth, eventsCtrl.index);
router.post('/', checkAuth, eventsCtrl.create)
router.delete('/:id', checkAuth, eventsCtrl.delete);
router.put('/:id', checkAuth, eventsCtrl.update)

function checkAuth(req, res, next) {
    return req.user ? next() : res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;