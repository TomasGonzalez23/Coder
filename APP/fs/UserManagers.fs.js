const fs = require("fs").promises;
const crypto = require("crypto");

class UserManager {
  constructor() {
    this.path = "./fs/files/Users.json";
    this.init();
  }

  async init() {
    try {
      await fs.readFile(this.path);
      console.log("Not Exist");
    } catch (error) {
      if (error.code === "Fail") {
        const stringData = JSON.stringify([], null, 2);
        await fs.writeFile(this.path, stringData);
        console.log("File Created");
      } else {
        throw error;
      }
    }
  }

  async create(data) {
    try {
      const users = await this.read();
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        password: data.password,
        photo: data.photo,
        email: data.email,
        role: data.role,
      };
      if (!data.email || !data.role || !data.photo || !data.password) {
        throw new Error("User Error. Enter all the data");
      } else {
        users.push(user);
        await fs.writeFile(this.path, JSON.stringify(users, null, 2));
        console.log("User Created");
      }
    } catch (error) {
      console.log("Error creating user:");
    }
  }

  async read() {
    try {
      const usersData = await fs.readFile(this.path, "utf-8");
      return JSON.parse(usersData);
    } catch (error) {
      if (error.code === "Fail") {
        return [];
      } else {
        throw error;
      }
    }
  }

async readOne(id) {
  try {
    const users = await this.read();
    return users.find((each) => each.id === id);
  } catch (error) {
    console.error('Error read Users:', error);
    throw error;
  }
}

  async destroy(id) {
    try {
      let users = await this.read();
      const filtered = users.filter((each) => each.id !== id);
      await fs.writeFile(this.path, 
      JSON.stringify(filtered, null, 2));
      console.log(id + " Deleted");
    } catch (error) {
      console.log("Error deleting user:");
    }
  }
}

async function test() {
  const usuarios = new UserManager();
  await usuarios.create({
    photo:
      "avatar1.jpg" ||
      "https://i.pinimg.com/474x/55/1f/ff/551fff636303fb8a696c213736ddc09e.jpg",
    password: "House",
    email: "Coderhouse@hotmail.com",
    role: "0",
  });
  await usuarios.create({
    photo:
      "coderjpg" ||
      "https://www.facebook.com/photo/?fbid=663134405852519&set=a.663134395852520",
    password: "housecoder",
    email: "House@hotmail.com",
    role: "0",
  });
  await usuarios.create({
    photo:
      "Mouse.jpg" ||
      "https://tienda.starware.com.ar/wp-content/uploads/2021/07/mouse-gamer-profesional-g5-6d-usb-pro-gamer-3200dpi-led-7-colores-2324-3906.jpg",
    password: "Coder10",
    email: "Citra@hotmail.com",
    role: "0",
  });
  await usuarios.create({
    photo:
      "avatar2.jpg" ||
      "https://i.pinimg.com/736x/28/0c/7d/280c7df0706c689019cd9e670024313e.jpg",
    password: "houser",
    email: "Coder@hotmail.com",
    role: "0",
  });
  console.log(await usuarios.read());
  console.log(await usuarios.readOne());
}

test();

const iUsers = new UserManager();

export default iUsers;
