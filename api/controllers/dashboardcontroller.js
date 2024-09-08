// Import the Dashboard model
const Dashboard = require('../models/dashboard');

// Create Dashboard Data
exports.createDashboardData = async (req, res) => {
    try {
        const { selectedTeam, totalUnforcedErrorRate, performanceWin, totalVolleyRate, gameName } = req.body; // Add gameName

        const newDashboard = new Dashboard({
            Name: selectedTeam,
            UnforcedError: totalUnforcedErrorRate,
            PerformanceWin: performanceWin,
            VollyRate: totalVolleyRate,
            GameName: gameName // Save gameName
        });

        await newDashboard.save();
        res.status(201).json({
            message: 'Dashboard data created successfully',
            data: newDashboard
        });
    } catch (error) {
        console.error('Error creating dashboard data:', error);
        res.status(500).json({
            message: 'Error creating dashboard data',
            error: error.message
        });
    }
};

// Get All Dashboard Data
exports.getAllDashboardData = async (req, res) => {
    try {
        const dashboardData = await Dashboard.find();

        res.status(200).json({
            message: 'All dashboard data fetched successfully',
            data: dashboardData
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching dashboard data',
            error: error.message
        });
    }
};

// Update Dashboard Data
exports.updateDashboardData = async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, UnforcedError, PerformanceWin, VollyRate, Gameplayed, Gamewon, gameName } = req.body; // Add gameName

        // Convert string values to numbers
        const updatedDashboard = await Dashboard.findByIdAndUpdate(
            id,
            {
                Name,
                UnforcedError: Number(UnforcedError),
                PerformanceWin: Number(PerformanceWin),
                VollyRate: Number(VollyRate),
                Gameplayed: Number(Gameplayed),
                Gamewon: Number(Gamewon),
                GameName: gameName // Save gameName
            },
            { new: true } // Returns the updated document
        );

        if (!updatedDashboard) {
            return res.status(404).json({
                message: 'Dashboard data not found'
            });
        }

        res.status(200).json({
            message: `Dashboard data for ${updatedDashboard.Name} updated successfully`,
            data: updatedDashboard
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating dashboard data',
            error: error.message
        });
    }
};

// Delete Dashboard Data
exports.deleteDashboardData = async (req, res) => {
    try {
        const dashboardData = await Dashboard.findByIdAndDelete(req.params.id);

        if (!dashboardData) {
            return res.status(404).json({
                message: 'Dashboard data not found'
            });
        }

        res.status(200).json({
            message: `Dashboard data for ${dashboardData.Name} deleted successfully`,
            data: dashboardData
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting dashboard data',
            error: error.message
        });
    }
};
// Get Dashboard Data for a Specific Player
exports.getDashboardDataByPlayerId = async (req, res) => {
    try {
        const { id } = req.params; // Player ID from the request

        const dashboardData = await Dashboard.findOne({ Name: id }); // Assuming the Name field is the player's name or ID

        if (!dashboardData) {
            return res.status(404).json({ message: 'No game data found for this player' });
        }

        res.status(200).json(dashboardData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
    }
};
