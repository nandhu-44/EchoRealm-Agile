const router = require('express').Router();
const UserModel = require('../../database/models/userModel');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { userId, profilePicture, username, bio, email, password } = req.body;
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.json({ status: 404, message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ status: 401, message: 'Invalid password' });
        }

        const userWithSameEmail = await UserModel.findOne({ email });
        if (userWithSameEmail && userWithSameEmail._id.toString() !== userId) {
            return res.json({ status: 400, message: 'Email already in use' });
        }

        user.profilePicture = profilePicture;
        user.username = username;
        user.bio = bio;
        user.email = email;

        await user.save();

        let userObj = user.toObject();
        delete userObj.password;

        return res.json({ status: 200, message: 'Profile updated successfully', user: userObj });
    } catch (error) {
        return res.json({ status: 500, message: 'Internal server error' });
    }
});

module.exports = router;