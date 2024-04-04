import User from "../model/users.model";

export async function updateUser(req, res, next) {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updateUser) {
      const { username, email } = updateUser;
      res.status(200).json({ username, email });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(`user has been deleted`);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    const { username, email, id } = user ?? {};
    res.status(200).json({ username, email, id });
  } catch (error) {
    next(error);
  }
}

export async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    const newUsers = users.map(({ username, email, id }) => ({
      username,
      email,
      id,
    }));
    res.status(200).json(newUsers);
  } catch (error) {
    next(error);
  }
}

// user is owner of the hotel
