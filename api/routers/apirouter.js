const express = require('express');
const router = express.Router();
const regc = require('../controllers/regcontroller');

router.post('/reg', regc.register);
router.post('/logincheck', regc.logincheck);

module.exports = router;
