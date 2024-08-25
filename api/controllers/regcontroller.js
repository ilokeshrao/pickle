const Reg = require('../models/reg');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const cpass = await bcrypt.hash(password, 10);
        const usercheck = await Reg.findOne({ username: username });
        if (!usercheck) {
            const record = new Reg({ username: username, password: cpass });
            await record.save();
            res.status(201).json({
                status: 201,
                message: 'Successfully registered'
            });
        } else {
            res.status(400).json({
                message: `${username} is already registered`
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'An error occurred. Please try again later.',
            error: error.message
        });
    }
};

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
}
// exports.updatePassword = async (req, res) => {
//     try {
//         const { username, oldPassword, newPassword, confirmPassword } = req.body;

//         if (!oldPassword || !newPassword || !confirmPassword) {
//             return res.status(400).json({
//                 status: 400,
//                 message: 'Missing parameters'
//             });
//         }

//         if (newPassword !== confirmPassword) {
//             return res.status(400).json({
//                 status: 400,
//                 message: 'New password and confirm password do not match'
//             });
//         }

//         const record = await Reg.findOne({ username: username });
//         if (!record) {
//             return res.status(400).json({
//                 status: 400,
//                 message: 'User not found'
//             });
//         }

//         const isMatch = await bcrypt.compare(oldPassword, record.password);
//         if (!isMatch) {
//             return res.status(400).json({
//                 status: 400,
//                 message: 'Old password is incorrect'
//             });
//         }

//         const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//         record.password = hashedNewPassword;
//         await record.save();

//         res.status(200).json({
//             status: 200,
//             message: 'Password updated successfully'
//         });
//     } catch (error) {
//         res.status(400).json({
//             status: 400,
//             message: error.message
//         });
//     }
// };