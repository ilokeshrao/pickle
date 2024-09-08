const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    Name: String,
    UnforcedError: Number,
    PerformanceWin: Number,
    VollyRate: Number,
    Gameplayed: Number,
    Gamewon: Number,
    GameName: String // Add gameName field
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);
module.exports = Dashboard;
