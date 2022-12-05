require('dotenv').config();
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const { User, validate } = require('../models/User');
const saltRounds = 10;

const UserSignup = async (req, res) => {
    const { error } = validate(req.body);
    const { name, email, password } = req.body

    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    let user = await User.findOne({ email: email });
    if (user) {
        return res.status(400).send({ message: 'That user already exists!' });
    }

    const hashedPwd = await bcrypt.hash(password, saltRounds);
    user = new User({
        name: name,
        email: email,
        password: hashedPwd
    });
    await user.save();
    user.password = null;
    res.send(user);
}

const UserSignin = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({
        email: email
    });

    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }

    const data = {name: user.name, email: user.email, _id: user._id};

    return res.json({
        token: jwt.sign(data, process.env.APP_SECRET, {expiresIn: 86400 }),
        user: data,
    });
}

const GetUserId = async (req, res) => {
    return res.send(req.userId);
}

const GetUser = async (req, res) => {
    const user = await User.findOne({_id: req.userId});

    if (!user) return res.status(404).json({ message: 'No user found.' });

    const data = {name: user.name, email: user.email, _id: user._id};
    return res.json({ user: data });
}

const GetUsers = async (req, res) => {
    const perPage = req.body.per_page || 3;
    const currentPage = req.body.current_page || 0;
    console.log(req.body)
    const users = await User
        .find({}, {name: 1, email: 1})
        .limit(perPage)
        .skip(perPage * currentPage)
        .sort({
            name: 'asc'
        });

    const total = await User.countDocuments();

    if (!users) return res.status(404).json({ message: 'No users found.' });

    return res.json({ users: users, total: total, current_page: currentPage, per_page: perPage });
}

module.exports = { UserSignup, UserSignin, GetUserId, GetUser, GetUsers };