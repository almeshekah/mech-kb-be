const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const jwt = require("jsonwebtoken");



exports.signup = async (req, res, next) => {
    const { password } = req.body;
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("exports.signup -> hashedPassword", hashedPassword);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};


exports.signin = (req, res) => {
    console.log("exports.signin -> req", req);
    const { user } = req;
    const payload = {
      id: user.id,
      username: user.username,
      exp: Date.now() + 900000,
    };
    const token = jwt.sign(JSON.stringify(payload), "asupersecretkey");
    res.json({ token });

    
    
  };