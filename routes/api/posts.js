const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post Model
const Post = require("../../models/Post");
// Profile Model
const Profile = require("../../models/Profile");

// Validation
const validatePostInput = require('../../validation/post');

// Users will be able to make posts, comment on them and more

// @route GET api/posts/test
// @desc  Tests posts route
// @access public
router.get('/test', (req, res) => res.json({ msg: "Posts works" }));

// @route POST api/posts
// @desc  Creates a new posts
// @access private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        // If any errors, send a 400 with errors object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post))
        .catch(err => res.status(404).json(err));
});

// @route GET api/posts
// @desc  Get posts
// @access public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ msg: "error" }));
});

// @route GET api/posts/:id
// @desc  Get post by ID
// @access public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ msg: "error, post not found" }));
});

// @route DELETE api/posts/:id
// @desc  Delete posts by ID
// @access private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ notAuthorized: "User is not authorized to delete this" })
                    }

                    post.remove().then(() => res.json({ success: true }))
                        .catch(err => res.status(404).json({ postNotFound: `No posts found` }));
                })
        })
});

// @route POST api/posts/like/:id
// @desc  Liked posts by ID
// @access private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {

                    // Checks to see if the user already liked this 
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyliked: 'User already liked this post' });
                    }

                    // Add user ID to the likes array
                    post.likes.unshift({ user: req.user.id });

                    post.save().then(post => res.json(post));
                })
        })
});

// @route POST api/posts/unlike/:id
// @desc  Unlike posts by ID
// @access private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {

                    // Check to see if the user is not there
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notliked: 'User has not liked this post' });
                    }

                    // Get the remove index (Know which like to remove)
                    const removeIndex = post.likes
                        .map(item => item.user.toString()).indexOf(req.user.id);

                    // Splice out fo the array
                    post.likes.splice(removeIndex, 1);

                    // Save
                    post.save().then(post => res.json(post));
                })
        })
});

// @route POST api/posts/comment/:id
// @desc  Add comment to post
// @access private
router.post('/comment/:id', passport.authenticate('jwt', { session: false}), (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        // If any errors, send a 400 with errors object
        return res.status(400).json(errors);
    }
    
    Post.findById(req.params.id)
        .then(post => {

            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            // Add user ID to the likes array
            post.comments.unshift(newComment);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found'}));

})

// @route DELETE api/posts/comment/:id/:comment_id
// @desc  Remove comment to post
// @access private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            // Check to see if the comment exists
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length > 0){
                return res.status(404).json({ commentnotexists: "Comment does not exist" });
            }

            // Get remove index
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);
            
            // Splice the comment out of the array
            post.comment.splice(removeIndex, 1);

            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found'}));

})

module.exports = router;