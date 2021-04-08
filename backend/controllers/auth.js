// const expressJwt = require("express-jwt");
// const { errorHandler } = require("");
import jwt from "jsonwebtoken";
import User from "../models/user";

export const signup = (req, res) => {
    console.log("Request body", req.body);
    const user = new User(req.body);
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                // error: errorHandler(error),
                error: "Loi",
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({ user });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'Use with that email does not exist. Plesase signup'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password not match'
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('t', token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = user;
        return res.json({
            token, user: { _id, email, name, role }
        })
    })
};