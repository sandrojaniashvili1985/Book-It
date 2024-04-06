import User from "../model/users.model";
import * as bcrypt from "bcrypt";
import { accessToken, verifyToken } from "../middleware/verify.token";

export const register = async (req, res, next) => {
  const { password, username, email } = req.body;
  try {
    if (
      !password ||
      password === "" ||
      !username ||
      username === "" ||
      !email ||
      email === ""
    ) {
      return res.status(403).json("username, email and password are required");
    }

    const bcryptSalt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      massage: `User ${username} has been registered`,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || email === "" || !password || password === "") {
      return res.status(403).json("email and password are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("Wrong email or password");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(404).json("Wrong email or password");
    }
    const token = accessToken(user);
    user.token = { r: token.r, createdAt: token.createdAt };
    req.user = user;
    await user.save();

    res
      .cookie("token", token.token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 90,
      })
      .status(200)
      .json({ id: user._id, username: user.username, email: user.email });
  } catch (error) {
    next(error);
  }
};
