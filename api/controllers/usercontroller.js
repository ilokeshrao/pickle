const User = require('../models/user');

// Controller for creating a new user (POST)
exports.createUser = async (req, res) => {
    try {
        const { username, img } = req.body;

        const newUser = new User({
            username,
            img
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Controller for fetching all users (GET)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Controller for fetching a user by ID (GET)
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};


// Controller for updating a user by ID (PUT)
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, img } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, img },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Controller for deleting a user by ID (DELETE)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: `User '${deletedUser.username}' deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};
exports.getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find(); // or with populate if gameName is from another model
        res.status(200).json({
            message: 'Players fetched successfully',
            data: players
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching players',
            error: error.message
        });
    }
};