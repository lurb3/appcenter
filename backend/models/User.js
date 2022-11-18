const Joi = require('joi');
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
}, { timestamps: true });

const validateUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().trim().min(5).max(255).required()
    });
    return schema.validate(user);
}

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

exports.User = mongoose.model('User', UserSchema);
exports.validate = validateUser;