import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

// Create User
app.post('/users', async (req, res) => {
    try {
        const { email, name } = req.body;
        const user = await prisma.user.create({
            data: { email, name }
        })
        res.json(user)
    } catch {
        res.status(500).json({ error: 'Error ao cadastrar!' })
    }
})

// Update User { email or name }
app.put('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: Number(req.params.id),
            },
            data: req.body
        })
        res.json(user)
    } catch (error) {
        res.status(500).json('Error ao atualizar!')
    }
})

// List Users
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})

// Show user
app.get("/users/:id", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(req.params.id) },
        });

        if (!user)
            res.status(404).json({
                error: "Usuário não encontrado",
            });
        else
            res.json(user);

    } catch (error) {
        res.status(500).json({ error: "Error ao vizualizar usuário!" });
    }
});

// Delete User
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
            where: { id: Number(req.params.id) }
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({error: 'Error ao deletar o usuário!'})
    }
})


// Quotes 

// Create Quote
app.post('/quotes', async (req, res) => {
    const quote = await prisma.user.create({
        data: {
          email: 'elsa@prisma.io',
          name: 'Elsa Prisma',
        },
      })

    res.json(quote)
})


app.listen(3000, () => {
    console.log('server online...')
}) 