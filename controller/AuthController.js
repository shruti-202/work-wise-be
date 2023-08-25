const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const usernameFormat = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
const passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;

const registerUser = async (req, res) => {
  const { name, phone, email, username, password } = req.body;

  if (name.length < 2 || name.length > 50) {
    res.status(400).json({ error: "Invalid Name" });
    return;
  }
  if (phone < 1000000000) {
    res.status(400).json({ error: "Invalid Phone Number" });
    return;
  }
  if (!emailFormat.test(email)) {
    res.status(400).json({ error: "Invalid Email Address" });
    return;
  }
  if (!usernameFormat.test(username)) {
    res.status(400).json({ error: "Invalid User-Name: 8-30 chars, start with letter, use A-Z, 0-9, _." });
    return;
  }
  if (!passwordFormat.test(password)) {
    res
      .status(400)
      .json({
        error:
          "Password requires: 1 number, 1 uppercase, 1 lowercase, 1 special, 6+ characters",
      });
    return;
  }
  try {
    const userByusername = await UserModel.findOne({ username: username });
    if (userByusername) {
      res.status(400).json({ error: "UserName Already Exists" });
      return;
    }
    const userByUserEmail = await UserModel.findOne({ email: email });
    if (userByUserEmail) {
      res.status(400).json({ error: "Email Already Exists" });
      return;
    }
    const userByUserphone = await UserModel.findOne({ phone: phone});
    if (userByUserphone) {
      res.status(400).json({ error: "Phone No Already Exists" });
      return;
    }
    const userDoc = await UserModel.create({
      name,
      phone,
      email,
      username,
      password: bcrypt.hashSync(password, salt)
    });
    res.status(201).json(userDoc);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }

};

module.exports = { registerUser };
