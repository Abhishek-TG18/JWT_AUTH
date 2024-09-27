const JWT = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
    const token = req.cookies?.token || null;
    console.log("Token from cookies:", token);

    if (!token) {
        return res.status(404).send({ msg: "user authentication failed", token: req.cookies });
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);
        req.user = { id: payload._id, username: payload.username };
        console.log(req.user);
        next();
    }catch(err) {
        return res.status(400).json({
            success: false,
            msg: err.message
        });
    }
};
