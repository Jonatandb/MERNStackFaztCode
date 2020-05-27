const usersController = {};

const UserModel = require("../models/User");

usersController.getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).end();
    console.log("-----------------------------------\n", error);
  }
};

usersController.createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = new UserModel({ username });
    await newUser.save();
    res.json({ message: "Usuario creado" });
  } catch (error) {
    res.status(500).end();
    console.log("-----------------------------------\n", error);
  }
};

usersController.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).end();
    console.log("-----------------------------------\n", error);
  }
};

usersController.updateUser = async (req, res) => {
  try {
    const { username } = req.body;
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        username,
      }
    );
    res.json({ message: "Usuario actualizado" });
  } catch (error) {
    console.log("-----------------------------------\n", error);
    res.status(500).end();
  }
};

usersController.deleteUser = async (req, res) => {
  try {
    const User = await UserModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).end();
    console.log("-----------------------------------\n", error);
  }
};

module.exports = usersController;
