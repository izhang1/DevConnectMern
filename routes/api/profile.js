const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


// Load user/profile modesl
const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// Profile information for the user and more, location, bio, experiences and more. 
// @route GET api/profile/test
// @desc  Tests profile route
// @access public
router.get('/test', (req, res) => res.json({ msg: "Profile works" }));

// @route GET api/profile
// @desc  Get the current users profile (Uses the JWT token)
// @access private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route GET api/profile/handle/:handle
// @desc  Get the profile by handle 
// @access public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc  Get the profile by user ID
// @access public
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => res.status(404).json({ profile: "No profile available for this user" }));
});

// @route GET api/profile/all
// @desc  Get all of the profiles  
// @access public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofiles = "No profiles available";
                return res.status(404).json(errors);
            }

            res.json(profiles);
        })
        .catch(err => res.status(404).json({ profile: "No profiles available" }));
});

// @route   POST api/profile
// @desc    Create user profile 
// @access  private
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        // Check validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        // Get fields inside of request body 
        const profileFields = {};
        profileFields.user = req.user.id; // Get user from the logged in user
        // If it's sent in, let's set it 
        profileFields.handle = req.body.handle ? req.body.handle : null;
        profileFields.company = req.body.company ? req.body.company : null;
        profileFields.website = req.body.website ? req.body.website : null;
        profileFields.location = req.body.location ? req.body.location : null;
        profileFields.status = req.body.status ? req.body.status : null;
        profileFields.bio = req.body.bio ? req.body.bio : null;
        profileFields.githubusername = req.body.githubusername ? req.body.githubusername : null;

        // Skills - Split into an array 
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

        // Social 
        profileFields.social = {}; // Inner object, needs to initialize
        profileFields.social.youtube = req.body.youtube ? req.body.youtube : null;
        profileFields.social.twitter = req.body.twitter ? req.body.twitter : null;
        profileFields.social.linkiedin = req.body.linkiedin ? req.body.linkiedin : null;
        profileFields.social.facebook = req.body.facebook ? req.body.facebook : null;
        profileFields.social.instagram = req.body.instagram ? req.body.instagram : null;

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if (profile) {
                    // Update the profile 
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    )
                        .then(profile => res.json(profile));
                } else {
                    // Create the profile 
                    // Check and validate the handle exists 
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile => {
                            if (profile) {
                                errors.handle = "Handle already exists";
                                res.status(400).json(errors);
                            }

                            new Profile(profileFields).save().then(profile => res.json(profile));
                        })
                }
            })

    }
);

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // Add to experience array
            // Using unshift, it'll add to beginning of the array
            profile.experience.unshift(newExp);

            // Saves the experience and then saves it 
            profile.save().then(profile => res.json(profile));
        })
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            // Add to experience array
            // Using unshift, it'll add to beginning of the array
            profile.education.unshift(newEdu);

            // Saves the experience and then saves it 
            profile.save().then(profile => res.json(profile));
        })
});

module.exports = router;