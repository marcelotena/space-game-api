const express = require('express');
const router = express.Router();

// @route   GET api/planets
// @desc    Planets route
// @access  Public
router.route('/')
    .get((req, res) => res.send('Planets route'));

module.exports = router;