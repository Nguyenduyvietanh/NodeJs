const expressJwt = require("express-jwt");
// const { errorHandler } = require("");
import jwt from "jsonwebtoken";
import User from "../models/user";
// import dotenv from "dotenv";
// dotenv.config();

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
                error: 'Tài khoản không tồn tại !!!'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Sai mật khẩu !'
            })
        }
        const token = jwt.sign({ _id: user._id }, 'vietanhdeptrai');
        res.cookie('t', token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = user;
        return res.json({
            token, user: { _id, email, name, role }
        })
    })
};

exports.checkLogin = (req, res) => {
    try {
        const { token } = req.body;
        const ketqua = jwt.verify(token, 'vietanhdeptrai');
        if (ketqua) {
            User.findById(ketqua._id).exec((error, user) => {
                if (error || !user) {
                    return res.status(400).json({
                        error: 'User not found'
                    })
                }
                console.log(user);
                if (user.role === 1) {
                    return res.json({
                        userId: ketqua._id,
                        role: 1
                    })
                }
                if (user.role === 0) {
                    return res.json({
                        userId: ketqua._id,
                        role: 0
                    })
                } else {
                    return res.json(403)
                }
            })
        }
    } catch (error) {
        return res.json(403)
    }

};
export const signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: 'Signout Success'
    })
}
export const requireSignin = expressJwt({
    secret: 'vietanhdeptrai',
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});
export const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    console.log(user)
    if (!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role == 0) {
        return res.status(403).json({
            error: "Bạn không phải Admin !"
        })
    }
    next();
}