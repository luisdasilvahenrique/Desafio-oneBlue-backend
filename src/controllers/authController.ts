import { PrismaClient, Prisma } from "@prisma/client";

import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

async function register(req, res) {
  try {
    const { email, name, password } = req.body;

    if (!(email && password && name)) {
      res.status(400).json({ error: "Todos os campos requiridos!" });
    }

    const encryptedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: encryptedPassword },
    });

    const token = sign({ id: user.id, email }, "123456789", {
      expiresIn: "2h",
    });

    res.status(201).json({ user, token });
  } catch (error) {
    // console.log('app error: ',typeof error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2002") {
        res.status(400).json({ error: "Error: email já existe!" });
      } else res.status(500).json({ error: "Error no servidor" });
    } else res.status(500).json({ error: "Error no servidor" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({ error: "Todos os campos requiridos!" });
    }
    const user = await prisma.user.findFirstOrThrow({
      where: {
        email,
      },
    });
    if (user && (await compare(password, user.password))) {
      const token = sign({ id: user.id, email }, "123456789", {
        expiresIn: "2h",
      });
      res.json({ token });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateUser(req, res) {
  const auth = req.user;
  console.log(auth);
  if (!auth) {
    return res.status(401).json({ error: "Não autorizado!" });
  }
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(auth.id),
      },
      data: req.body,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json("Error ao atualizar!");
  }
}

// // List user
async function listUser(req, res) {
    const auth = req.user;
    if(!auth){
        return res.status(401).json({ error: "Não autorizado!" });
    }
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(auth.id) },
    });

    if (!user)
      res.status(404).json({
        error: "Usuário não encontrado",
      });
    else res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error ao vizualizar usuário!" });
  }
}

// // Delete User
// app.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await prisma.user.delete({
//             where: { id: Number(req.params.id) }
//         })
//         res.json(user)
//     } catch (error) {
//         res.status(500).json({error: 'Error ao deletar o usuário!'})
//     }
// })

export default { 
    register, 
    login, 
    updateUser, 
    listUser };
