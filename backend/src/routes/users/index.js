const login = require('./login');
const register = require('./register');
const forgotPassword = require('./forgotPassword');
const auth = require('./auth/index');
const router = require('express').Router();

router.use('/login', login);
router.use('/register', register);
router.use('/auth', auth);
router.use('/forgotPassword', forgotPassword);

router.get('/', (_req, res) => {
    res.send('Users route');
});

module.exports = router;