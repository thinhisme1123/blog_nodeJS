const express = require('express');
const router = express.Router();

const meControllers = require('../app/controllers/MeControllers');

router.get('/stored/course', meControllers.storedCourse);
router.get('/trash/course', meControllers.trashCourse);

module.exports = router;
