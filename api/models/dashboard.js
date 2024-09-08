const mongoose = require('mongoose');

// const dashboardSchema = new mongoose.Schema({
//     Name: String,
//     UnforcedError: Number,
//     PerformanceWin: Number,
//     VollyRate: Number,
//     Gameplayed: Number,
//     Gamewon: Number,
//     GameName: String // Add gameName field
// });

// const Dashboard = mongoose.model('Dashboard', dashboardSchema);
// module.exports = Dashboard;const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    Name: { type: String, required: true },  // Player Name or ID
    UnforcedError: { type: Number, default: 0 },
    PerformanceWin: { type: Number, default: 0 },
    VollyRate: { type: Number, default: 0 },
    // TotalDinks: { type: Number, default: 0 },
    // UnforcedDinkError: { type: Number, default: 0 },
    // UnforcedDinkErrorRate: { type: Number, default: 0 },
    // TotalDrives: { type: Number, default: 0 },
    // UnforcedDriveError: { type: Number, default: 0 },
    // UnforcedDriveErrorRate: { type: Number, default: 0 },
    // TotalOverheads: { type: Number, default: 0 },
    // UnforcedOverheads: { type: Number, default: 0 },
    // ErrorOverheadsRate: { type: Number, default: 0 },
    // TotalVolleys: { type: Number, default: 0 },
    // UnforcedVolleys: { type: Number, default: 0 },
    // VolleyErrorRate: { type: Number, default: 0 },
    GameName: { type: String, required: true }, // Game name
    createdAt: { type: Date, default: Date.now } // Store when the game was added
});

module.exports = mongoose.model('Dashboard', DashboardSchema);

