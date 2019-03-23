const express = require('express');
const router = express.Router();
// Users will be able to make posts, comment on them and more

// @route GET api/posts/test
// @desc  Tests posts route
// @access public
router.get('/test', (req, res) => res.json({msg: "Posts works"}));

module.exports = router;