const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load user model
const User = require('../../models/Users');

// Users route, anything that has to do with authentication
// @route GET api/users/test
// @desc  Tests users route
// @access public
router.get('/test', (req, res) => res.json({msg: "Users works"}));

// @route POST api/users/register
// @desc  Register the user 
// @access public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(400).json({ msg: "User email already registered "});
            } else {
                const avatar = gravatar.url(req.body.email, 
                    {
                        s: '200', // Size
                        r: 'pg', // Rating
                        d: 'mm' // Default 
                    }
                );

                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })

            }
        })
});

module.exports = router;