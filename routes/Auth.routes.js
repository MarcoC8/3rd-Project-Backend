const router = require("express").Router();
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const { isAuthenticated } = require("./../middlewares/Auth.middlewares");

router.post("/signup", (req, res, next) => {
    // input name,pw,email
    const { name, email, password} = req.body;
    // Check if email or password or name are provided as empty string
    if (email === "" || password === "" || name === "") {
      res.status(400).json({ message: "Provide email, password and name" });
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
    }
  
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
    }
  
    User.findOne({ email })
      .then((foundUser) => {
        if (foundUser) {
          res.status(400).json({ message: "User already exists" });
          return;
        }
        const salt = bcrypt.genSaltSync(saltRounds);
  
        const hashedPassword = bcrypt.hashSync(password, salt);
  
        return User.create({
          email,
          password: hashedPassword,
          name
          
  
          // emailToken: crypto.randomBytes(64).toString('hex'),
          // isVerified: false,
        });
      })
  
      .then((createdUser) => {
        // Deconstruct the newly created user object to omit the password
        // We should never expose passwords publicly
        console.log(createdUser);
        const { email, name, _id } = createdUser;
        // console.log(req.headers.host);
        // send verification mail to user
        // let mailOptions = {
        //   from: ' "Verify your email"<process.env.EMAIL> ',
        //   to: createdUser.email,
        //   subject: 'julian - verify your email',
        //   html: `<h2>${createdUser.name}! Thanks for registering on our site </h3>
        //   <h4> Please verify your mail to continue... </h4>
        //   <a href="http://${req.headers.host}/auth/verifyemail?token=${createdUser.emailToken}"> Verify your Email </a>`,
        // };
  
        // send email
  
        // transporter.sendMail(mailOptions, function (err, info) {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log('Verification email is sent to your gmail account');
        //   }
        // });
  
        // Create a new object that doesn't expose the password
        const user = { email, name, _id};
  
        // Send a json response containing the user object
        res.status(201).json({ user: user });
        console.log(user);
      })
      .catch((err) => console.log(err));
  });


router.post("/login", (req, res, next) => {
    // parsing the body from front end
    console.log(req.session);
  
    const { email, password } = req.body;
    // Check if email or password are provided as empty string
    if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email and password." });
      return;
    }
    User.findOne({ email })
      .then((foundUser) => {
        if (!foundUser) {
          // If the user is not found, send an error response
          res.status(401).json({ message: "User not found." });
          return;
        }
        // Compare the provided password with the one saved in the database
        const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
  
        if (passwordCorrect) {
          // parsing  id email and name // parsing out of founduser
          const { _id, email, name, role, places } = foundUser;
  
          // Create an object that will be set as the token payload
          const payload = { _id, email, name, role, places };
          // const payload = foundUser.toObject();
  
          // token has the whole payload encrypted inside of it
          const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: "6h",
          });
          // Send the token as the response
          res.status(200).json({ authToken: authToken });
        } else {
          res.status(401).json({ message: "Unable to authenticate the user" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  });

router.get('/verify', isAuthenticated, (req, res, next) => {
    console.log(req.payload);
    res.status(200).json(req.payload);
  });


module.exports = router;