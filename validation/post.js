const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
    let errors = {};

    data.text = !isEmpty(data.text) ? data.text : "";

    if (!Validator.isLength(data.text, { min: 5, max: 300 })) {
        errors.text = "Post has a min length of 5 and a max length of 300"
    }

    if (Validator.isEmpty(data.text)) {
        errors.text = "Post field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}