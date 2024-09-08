const Reg = require('../models/reg');
const bcrypt = require('bcrypt');

// User Registration
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const cpass = await bcrypt.hash(password, 10);
        const usercheck = await Reg.findOne({ username: username });
        if (usercheck == null) {
            const record = new Reg({ username: username, password: cpass });
         record.save();
            res.status(201).json({
                status: 201,
                message: 'Successfully Username has been registered'
            });
        } else {
            res.status(400).json({
                message: `${username} is already registered`
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 500,
            message: error.message
        });
    }
};

// User Login
exports.logincheck = async (req, res) => {
    try {
        const { username, password } = req.body;
        const record = await Reg.findOne({ username: username });
        if (record !== null) {
            let compare = await bcrypt.compare(password, record.password);
            if (compare) {
                res.json({
                    status: 200,
                    username: record.username
                });
            } else {
                res.status(400).json({
                    status: 400,
                    message: 'Wrong credentials'
                });
            }
        } else {
            res.status(400).json({
                status: 400,
                message: 'Wrong credentials'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};
