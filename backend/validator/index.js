exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Tên không được để trống').notEmpty();
    req.check('email', 'Email phải từ 4-32 kí tự')
        .matches(/.+\@.+\..+/)
        .withMessage('Email không hợp lệ')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Mật khẩu không được để trống').notEmpty()
    req.check('password')
        .isLength(
            { min: 6 }
        )
        .withMessage('Mật khẩu ít nhất 6 kí tự')
        .matches(/\d/)
        .withMessage('Mật khẩu phải có chữ số');

    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error: firstError })
    }
    next();
}