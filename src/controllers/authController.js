// /src/controllers/authController.js
const authService = require('../services/authService');

exports.register = async (req, res, next) => {
    try {
        const { rollNumber, department, fullName, email, password } = req.body;

        // Validate IIT Kharagpur email domain
        if (!email.endsWith('@kgpian.iitkgp.ac.in')) {
            return res.status(400).send('Please use your IIT Kharagpur email.');
        }

        const { token, user } = await authService.registerUser(rollNumber, department, fullName, email, password);
        res.status(201).json({ token, user });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await authService.loginUser(email, password);
        res.status(200).json({ token, user });
    } catch (error) {
        next(error);
    }
};
