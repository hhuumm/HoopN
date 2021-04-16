const router = require('express').Router();
const reviewsCtrl = require('../controllers/reviews');

// Public Routes
router.get('/', reviewsCtrl.index)
// Protected Routes
router.use(require('../config/auth'));
router.post('/', checkAuth, reviewsCtrl.create);
router.delete('/:id', checkAuth, reviewsCtrl.delete)


function checkAuth(req, res, next) {
	return req.user ? next() : res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;