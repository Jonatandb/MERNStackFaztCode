const usersController = {};

usersController.getUsers = (req, res) =>
  res.json([
    { id: -1, usernName: "Jonatandb" },
    { id: -2, usernName: "Jonatandb -2" },
  ]);

usersController.createUser = (req, res) =>
  res.json({ message: "Usuario creado" });

usersController.deleteUser = (req, res) =>
  res.json({ message: "Usuario eliminado" });

module.exports = usersController;
