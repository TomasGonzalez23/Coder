import express from "express";
import iUsers from "./APP/fs/UserManagers.fs";

const server = express();

const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);

server.listen(PORT, ready);

/* middlewares */
server.use(express.urlencoded({ extended: true }));

/* routes */

server.get("/", (req, res) => {
  try {
    return res.status(200).json({ response: "HOME", success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

/* RUTA QUE LEE TODOS LOS USUARIOS */
server.get("/api/Users", async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json({ response: users, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* RUTA QUE FILTRA USUARIOS POR ROL */
server.get("/api/Users", async (req, res) => {
  try {
    const { role } = req.query;
    const filteredUsers = await getUsersByRole(role);
    return res.status(200).json({ response: filteredUsers, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

/* RUTA QUE BUSCA UN USUARIO POR ID */
server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await getUserById(uid);
    if (user) {
      return res.status(200).json({ response: user, success: true });
    } else {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({ success: false, message: error.message || "Internal Server Error" });
  }
});