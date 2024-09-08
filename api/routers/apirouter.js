const express = require('express');
const router = express.Router();
const Regc = require('../controllers/regcontroller');
const dashboardController = require('../controllers/dashboardcontroller');
const userController = require('../controllers/usercontroller');


// Registration and Login Routes
router.post('/register', Regc.register);
router.post('/logincheck', Regc.logincheck);
router.get('/dashboard/:id', dashboardController.getDashboardDataByPlayerId);


// Dashboard Routes
router.post('/saveData', dashboardController.createDashboardData); // POST request to create dashboard data including gameName
router.get('/fetch', dashboardController.getAllDashboardData); // GET request to fetch all dashboard data
router.put('/update/:id', dashboardController.updateDashboardData); // PUT request to update dashboard data including gameName
router.delete('/delete/:id', dashboardController.deleteDashboardData); // DELETE request to delete dashboard data

// User Routes
router.post('/user', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

module.exports = router;
