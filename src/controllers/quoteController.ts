import { PrismaClient, Prisma } from '@prisma/client';
import { app } from "../server";

const prisma = new PrismaClient();

//Create Quote
app.post("/quotes", async (req, res) => {
    try {
        const { phrase } = req.body;
        const quotes = await prisma.quote.create({
            data: {
                phrase: phrase,
                user: {
                    connect: {
                        id: 4,
                    },
                },
            },
            include: {
                user: true
            }
        });
        res.status(201).json(quotes);
    } catch (error) {
        res.status(500).json({ error: "Erro na criação da citação!" });
    }
});

// // Excluir uma citação
// app.delete("/quotes/:id", async (req, res) => {
//   try {
//     const quote = await prisma.quote.delete({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//     res.status(204).end()
//   } catch (error) {
//     res.json({ error: "Error ao deletar citação!" });
//   }
// });

// // Visualizar listagem de todas as citações de todos usuários, ordenadas por data
// app.get("/quotes", async (req, res) => {
//   try {
//     const quote = await prisma.quote.findMany({
//       orderBy: {
//         created_at: "desc",
//       },
//       include: {
//         user: true,
//       },
//     });
//     res.status(200).json(quote);
//   } catch (error) {
//     res.status(500).json({ error: "Error ao listar todas citações!" });
//   }
// });

// //  Visualizar listagem das citações do usuário
// app.get('/quotes/:id', (req, res) => {

// })
