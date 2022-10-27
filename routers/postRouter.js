const express = require('express');
const {
  addPosts
} = require('../controllers/postController');

const router = express.Router();

router.post('/', addPosts);

module.exports = router;