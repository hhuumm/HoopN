const router = require('express').Router();
const locationsCtrl = require('../controllers/locations');

// Public Routes
// router.get('/', locationsCtrl.index)
// Protected Routes
router.use(require('../config/auth'));
// router.post('/', checkAuth, locationsCtrl.create);
router.delete('/:id&:rid', checkAuth, locationsCtrl.delete)


function checkAuth(req, res, next) {
	return req.user ? next() : res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;