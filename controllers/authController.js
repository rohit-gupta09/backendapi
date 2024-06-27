const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const authController = (req, res) => {
    const { username, password } = req.body;

    if (username === 'saltman' && password === 'oai1122') {
        const payload = {
            user: {
                id: 'dummyUserId',
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } else {
        res.status(400).json({ msg: 'Invalid credentials' });
    }
};

module.exports = authController;
