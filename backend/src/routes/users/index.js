const login = require('./login');
const register = require('./register');
const router = require('express').Router();

router.use('/login', login);
router.use('/register', register);

module.exports = router;